import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Função para calcular nível de risco
function calcularNivelRisco(probabilidade: string, impacto: string): string {
  const niveis: Record<string, number> = {
    muito_baixo: 1,
    baixo: 2,
    medio: 3,
    alto: 4,
    muito_alto: 5
  };

  const prob = niveis[probabilidade] || 3;
  const imp = niveis[impacto] || 3;
  const resultado = prob * imp;

  if (resultado <= 4) return "muito_baixo";
  if (resultado <= 8) return "baixo";
  if (resultado <= 12) return "medio";
  if (resultado <= 16) return "alto";
  return "muito_alto";
}

// GET - Buscar risco por ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const risk = await prisma.risk.findUnique({
      where: { id: params.id },
      include: {
        createdBy: {
          select: { name: true, email: true }
        },
        evidencias: true
      }
    });

    if (!risk) {
      return NextResponse.json({ error: "Risco não encontrado" }, { status: 404 });
    }

    return NextResponse.json(risk);
  } catch (error) {
    console.error("Erro ao buscar risco:", error);
    return NextResponse.json(
      { error: "Erro ao buscar risco" },
      { status: 500 }
    );
  }
}

// PUT - Atualizar risco
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
    if (body.probabilidade !== undefined) updateData.probabilidade = body.probabilidade;
    if (body.impacto !== undefined) updateData.impacto = body.impacto;
    if (body.status !== undefined) updateData.status = body.status;
    if (body.estrategia !== undefined) updateData.estrategia = body.estrategia;
    if (body.planoAcao !== undefined) updateData.planoAcao = body.planoAcao;
    if (body.responsavel !== undefined) updateData.responsavel = body.responsavel;
    if (body.prazo !== undefined) updateData.prazo = body.prazo ? new Date(body.prazo) : null;
    if (body.probResidual !== undefined) updateData.probResidual = body.probResidual;
    if (body.impactoResidual !== undefined) updateData.impactoResidual = body.impactoResidual;

    // Recalcular nível de risco se probabilidade ou impacto mudaram
    if (body.probabilidade || body.impacto) {
      const currentRisk = await prisma.risk.findUnique({
        where: { id: params.id }
      });
      
      if (currentRisk) {
        const prob = body.probabilidade || currentRisk.probabilidade;
        const imp = body.impacto || currentRisk.impacto;
        updateData.nivelRisco = calcularNivelRisco(prob, imp);
      }
    }

    // Recalcular nível residual se necessário
    if (body.probResidual || body.impactoResidual) {
      const currentRisk = await prisma.risk.findUnique({
        where: { id: params.id }
      });
      
      if (currentRisk) {
        const probRes = body.probResidual || currentRisk.probResidual;
        const impRes = body.impactoResidual || currentRisk.impactoResidual;
        if (probRes && impRes) {
          updateData.nivelResidual = calcularNivelRisco(probRes, impRes);
        }
      }
    }

    const risk = await prisma.risk.update({
      where: { id: params.id },
      data: updateData,
      include: {
        createdBy: {
          select: { name: true, email: true }
        }
      }
    });

    return NextResponse.json(risk);
  } catch (error) {
    console.error("Erro ao atualizar risco:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar risco" },
      { status: 500 }
    );
  }
}

// DELETE - Excluir risco
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
        { error: "Sem permissão para excluir riscos" },
        { status: 403 }
      );
    }

    await prisma.risk.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao excluir risco:", error);
    return NextResponse.json(
      { error: "Erro ao excluir risco" },
      { status: 500 }
    );
  }
}
