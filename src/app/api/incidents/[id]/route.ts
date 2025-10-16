import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET - Buscar incidente por ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const incident = await prisma.incident.findUnique({
      where: { id: params.id },
      include: {
        createdBy: {
          select: { name: true, email: true }
        },
        evidencias: true
      }
    });

    if (!incident) {
      return NextResponse.json({ error: "Incidente não encontrado" }, { status: 404 });
    }

    return NextResponse.json(incident);
  } catch (error) {
    console.error("Erro ao buscar incidente:", error);
    return NextResponse.json(
      { error: "Erro ao buscar incidente" },
      { status: 500 }
    );
  }
}

// PUT - Atualizar incidente
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await req.json();

    const updateData: any = {};
    
    if (body.titulo !== undefined) updateData.titulo = body.titulo;
    if (body.descricao !== undefined) updateData.descricao = body.descricao;
    if (body.categoria !== undefined) updateData.categoria = body.categoria;
    if (body.severidade !== undefined) updateData.severidade = body.severidade;
    if (body.status !== undefined) updateData.status = body.status;
    if (body.dataDeteccao !== undefined) updateData.dataDeteccao = body.dataDeteccao ? new Date(body.dataDeteccao) : null;
    if (body.fonteDeteccao !== undefined) updateData.fonteDeteccao = body.fonteDeteccao;
    if (body.dataResposta !== undefined) updateData.dataResposta = body.dataResposta ? new Date(body.dataResposta) : null;
    if (body.acaoImediata !== undefined) updateData.acaoImediata = body.acaoImediata;
    if (body.dataResolucao !== undefined) updateData.dataResolucao = body.dataResolucao ? new Date(body.dataResolucao) : null;
    if (body.resolucao !== undefined) updateData.resolucao = body.resolucao;
    if (body.causaRaiz !== undefined) updateData.causaRaiz = body.causaRaiz;
    if (body.sistemaAfetado !== undefined) updateData.sistemaAfetado = body.sistemaAfetado;
    if (body.dadosCompromissos !== undefined) updateData.dadosCompromissos = body.dadosCompromissos;
    if (body.tempoIndisponibilidade !== undefined) updateData.tempoIndisponibilidade = body.tempoIndisponibilidade;
    if (body.responsavel !== undefined) updateData.responsavel = body.responsavel;

    const incident = await prisma.incident.update({
      where: { id: params.id },
      data: updateData,
      include: {
        createdBy: {
          select: { name: true, email: true }
        }
      }
    });

    return NextResponse.json(incident);
  } catch (error) {
    console.error("Erro ao atualizar incidente:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar incidente" },
      { status: 500 }
    );
  }
}

// DELETE - Excluir incidente
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const userPapel = (session.user as any).papel;
    if (userPapel !== "admin" && userPapel !== "secops") {
      return NextResponse.json(
        { error: "Sem permissão para excluir incidentes" },
        { status: 403 }
      );
    }

    await prisma.incident.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao excluir incidente:", error);
    return NextResponse.json(
      { error: "Erro ao excluir incidente" },
      { status: 500 }
    );
  }
}
