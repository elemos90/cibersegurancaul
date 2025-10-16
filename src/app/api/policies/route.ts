import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";
import { rateLimit, readRateLimitConfig, writeRateLimitConfig } from "@/lib/rate-limit";

// GET - Listar todas as políticas
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

    const where: any = {};
    if (categoria) where.categoria = categoria;
    if (status) where.status = status;

    const policies = await prisma.policy.findMany({
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

    return NextResponse.json(policies);
  } catch (error) {
    console.error("Erro ao buscar políticas:", error);
    return NextResponse.json(
      { error: "Erro ao buscar políticas" },
      { status: 500 }
    );
  }
}

// POST - Criar nova política
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

    const {
      titulo,
      descricao,
      categoria,
      status,
      versao,
      dataVigencia,
      dataRevisao,
      aprovadoPor,
      conteudo,
      tags
    } = body;

    // Validações
    if (!titulo || !descricao || !categoria || !conteudo) {
      return NextResponse.json(
        { error: "Campos obrigatórios: titulo, descricao, categoria, conteudo" },
        { status: 400 }
      );
    }

    const policy = await prisma.policy.create({
      data: {
        id: randomUUID(),
        titulo,
        descricao,
        categoria,
        status: status || "rascunho",
        versao: versao || "1.0",
        dataVigencia: dataVigencia ? new Date(dataVigencia) : null,
        dataRevisao: dataRevisao ? new Date(dataRevisao) : null,
        aprovadoPor,
        conteudo,
        tags: tags ? JSON.stringify(tags) : null,
        createdById: userId,
        updatedAt: new Date()
      },
      include: {
        createdBy: {
          select: { name: true, email: true }
        }
      }
    });

    return NextResponse.json(policy, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar política:", error);
    return NextResponse.json(
      { error: "Erro ao criar política" },
      { status: 500 }
    );
  }
}
