import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { calcularNivelRisco } from "@/lib/risk-calculator";
import { randomUUID } from "crypto";
import { RiskLevel } from "@prisma/client";
import { rateLimit, readRateLimitConfig, writeRateLimitConfig, addRateLimitHeaders } from "@/lib/rate-limit";
import { createRiskSchema, formatZodError } from "@/lib/validations";
import { ZodError } from "zod";

// GET - Listar todos os riscos
export async function GET(req: NextRequest) {
  // Rate limiting para leitura
  const rateLimitResponse = await rateLimit(req, readRateLimitConfig);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const categoria = searchParams.get("categoria");
    const status = searchParams.get("status");
    const nivelMin = searchParams.get("nivelMin");

    const where: any = {};
    if (categoria) where.categoria = categoria;
    if (status) where.status = status;

    const risks = await prisma.risk.findMany({
      where,
      include: {
        createdBy: {
          select: { name: true, email: true }
        },
        evidencias: {
          select: { id: true, filename: true, originalName: true, size: true }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json(risks);
  } catch (error) {
    console.error("Erro ao buscar riscos:", error);
    return NextResponse.json(
      { error: "Erro ao buscar riscos" },
      { status: 500 }
    );
  }
}

// POST - Criar novo risco
export async function POST(req: NextRequest) {
  // Rate limiting para escrita
  const rateLimitResponse = await rateLimit(req, writeRateLimitConfig);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const body = await req.json();

    // ✅ VALIDAÇÃO COM ZOD - Robusta e com mensagens de erro detalhadas
    const validatedData = createRiskSchema.parse(body);

    // Calcular nível de risco inerente
    const nivelRisco = calcularNivelRisco(
      validatedData.probabilidade,
      validatedData.impacto
    ) as RiskLevel;

    // Calcular nível de risco residual se fornecido
    const nivelResidual = (validatedData.probResidual && validatedData.impactoResidual) 
      ? (calcularNivelRisco(validatedData.probResidual, validatedData.impactoResidual) as RiskLevel)
      : null;

    const risk = await prisma.risk.create({
      data: {
        id: randomUUID(),
        titulo: validatedData.titulo,
        descricao: validatedData.descricao,
        categoria: validatedData.categoria,
        probabilidade: validatedData.probabilidade,
        impacto: validatedData.impacto,
        nivelRisco,
        status: validatedData.status || "identificado",
        estrategia: validatedData.estrategia,
        planoAcao: validatedData.planoAcao,
        responsavel: validatedData.responsavel,
        prazo: validatedData.prazo ? new Date(validatedData.prazo as string) : null,
        probResidual: validatedData.probResidual,
        impactoResidual: validatedData.impactoResidual,
        nivelResidual,
        createdById: userId,
        updatedAt: new Date()
      },
      include: {
        createdBy: {
          select: { name: true, email: true }
        }
      }
    });

    return NextResponse.json(risk, { status: 201 });
  } catch (error) {
    // ✅ Tratamento específico de erros de validação Zod
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: "Dados inválidos",
          details: formatZodError(error)
        },
        { status: 400 }
      );
    }

    console.error("Erro ao criar risco:", error);
    return NextResponse.json(
      { error: "Erro ao criar risco" },
      { status: 500 }
    );
  }
}
