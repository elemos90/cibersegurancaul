import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET - Buscar política por ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const policy = await prisma.policy.findUnique({
      where: { id: params.id },
      include: {
        createdBy: {
          select: { name: true, email: true }
        },
        evidencias: true
      }
    });

    if (!policy) {
      return NextResponse.json({ error: "Política não encontrada" }, { status: 404 });
    }

    return NextResponse.json(policy);
  } catch (error) {
    console.error("Erro ao buscar política:", error);
    return NextResponse.json(
      { error: "Erro ao buscar política" },
      { status: 500 }
    );
  }
}

// PUT - Atualizar política
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

    const updateData: any = {};
    if (titulo !== undefined) updateData.titulo = titulo;
    if (descricao !== undefined) updateData.descricao = descricao;
    if (categoria !== undefined) updateData.categoria = categoria;
    if (status !== undefined) updateData.status = status;
    if (versao !== undefined) updateData.versao = versao;
    if (dataVigencia !== undefined) updateData.dataVigencia = dataVigencia ? new Date(dataVigencia) : null;
    if (dataRevisao !== undefined) updateData.dataRevisao = dataRevisao ? new Date(dataRevisao) : null;
    if (aprovadoPor !== undefined) updateData.aprovadoPor = aprovadoPor;
    if (conteudo !== undefined) updateData.conteudo = conteudo;
    if (tags !== undefined) updateData.tags = tags ? JSON.stringify(tags) : null;

    const policy = await prisma.policy.update({
      where: { id: params.id },
      data: updateData,
      include: {
        createdBy: {
          select: { name: true, email: true }
        }
      }
    });

    return NextResponse.json(policy);
  } catch (error) {
    console.error("Erro ao atualizar política:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar política" },
      { status: 500 }
    );
  }
}

// DELETE - Excluir política
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
        { error: "Sem permissão para excluir políticas" },
        { status: 403 }
      );
    }

    await prisma.policy.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao excluir política:", error);
    return NextResponse.json(
      { error: "Erro ao excluir política" },
      { status: 500 }
    );
  }
}
