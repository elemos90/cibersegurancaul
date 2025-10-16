import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { readFile, unlink } from "fs/promises";
import { existsSync } from "fs";

// GET - Download de evidência
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const evidence = await prisma.evidence.findUnique({
      where: { id: params.id }
    });

    if (!evidence) {
      return NextResponse.json({ error: "Evidência não encontrada" }, { status: 404 });
    }

    if (!existsSync(evidence.path)) {
      return NextResponse.json({ error: "Arquivo não encontrado no servidor" }, { status: 404 });
    }

    const fileBuffer = await readFile(evidence.path);

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": evidence.mimeType,
        "Content-Disposition": `attachment; filename="${evidence.originalName}"`,
        "Content-Length": evidence.size.toString()
      }
    });
  } catch (error) {
    console.error("Erro ao baixar evidência:", error);
    return NextResponse.json(
      { error: "Erro ao baixar evidência" },
      { status: 500 }
    );
  }
}

// DELETE - Excluir evidência
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
    const userId = (session.user as any).id;

    const evidence = await prisma.evidence.findUnique({
      where: { id: params.id }
    });

    if (!evidence) {
      return NextResponse.json({ error: "Evidência não encontrada" }, { status: 404 });
    }

    // Apenas admin, secops ou quem fez upload pode excluir
    if (userPapel !== "admin" && userPapel !== "secops" && evidence.uploadedBy !== userId) {
      return NextResponse.json(
        { error: "Sem permissão para excluir esta evidência" },
        { status: 403 }
      );
    }

    // Excluir arquivo físico
    if (existsSync(evidence.path)) {
      await unlink(evidence.path);
    }

    // Excluir do banco
    await prisma.evidence.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao excluir evidência:", error);
    return NextResponse.json(
      { error: "Erro ao excluir evidência" },
      { status: 500 }
    );
  }
}
