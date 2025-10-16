import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";
import { rateLimit, readRateLimitConfig, writeRateLimitConfig } from "@/lib/rate-limit";

// GET - Listar todos os incidentes
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
    const severidade = searchParams.get("severidade");

    const where: any = {};
    if (categoria) where.categoria = categoria;
    if (status) where.status = status;
    if (severidade) where.severidade = severidade;

    const incidents = await prisma.incident.findMany({
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

    return NextResponse.json(incidents);
  } catch (error) {
    console.error("Erro ao buscar incidentes:", error);
    return NextResponse.json(
      { error: "Erro ao buscar incidentes" },
      { status: 500 }
    );
  }
}

// POST - Criar novo incidente
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
      severidade,
      status,
      dataDeteccao,
      fonteDeteccao,
      dataResposta,
      acaoImediata,
      dataResolucao,
      resolucao,
      causaRaiz,
      sistemaAfetado,
      dadosCompromissos,
      tempoIndisponibilidade,
      responsavel
    } = body;

    // Validações
    if (!titulo || !descricao || !categoria || !severidade) {
      return NextResponse.json(
        { error: "Campos obrigatórios: titulo, descricao, categoria, severidade" },
        { status: 400 }
      );
    }

    const incident = await prisma.incident.create({
      data: {
        id: randomUUID(),
        titulo,
        descricao,
        categoria,
        severidade,
        status: status || "aberto",
        dataDeteccao: dataDeteccao ? new Date(dataDeteccao) : new Date(),
        fonteDeteccao,
        dataResposta: dataResposta ? new Date(dataResposta) : null,
        acaoImediata,
        dataResolucao: dataResolucao ? new Date(dataResolucao) : null,
        resolucao,
        causaRaiz,
        sistemaAfetado,
        dadosCompromissos: dadosCompromissos || false,
        tempoIndisponibilidade,
        responsavel,
        createdById: userId,
        updatedAt: new Date()
      },
      include: {
        createdBy: {
          select: { name: true, email: true }
        }
      }
    });

    return NextResponse.json(incident, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar incidente:", error);
    return NextResponse.json(
      { error: "Erro ao criar incidente" },
      { status: 500 }
    );
  }
}
