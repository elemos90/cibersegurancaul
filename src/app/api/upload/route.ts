import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import { randomUUID } from "crypto";
import { rateLimit, uploadRateLimitConfig } from "@/lib/rate-limit";

// POST - Upload de evidência
export async function POST(req: NextRequest) {
  // Rate limiting para uploads - muito restritivo
  const rateLimitResponse = await rateLimit(req, uploadRateLimitConfig);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const formData = await req.formData();
    
    const file = formData.get("file") as File;
    const descricao = formData.get("descricao") as string;
    const policyId = formData.get("policyId") as string;
    const riskId = formData.get("riskId") as string;
    const incidentId = formData.get("incidentId") as string;

    if (!file) {
      return NextResponse.json(
        { error: "Arquivo não fornecido" },
        { status: 400 }
      );
    }

    // Validar tipo de arquivo (apenas documentos e imagens)
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "image/jpeg",
      "image/png",
      "image/gif",
      "text/plain",
      "text/csv"
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Tipo de arquivo não permitido" },
        { status: 400 }
      );
    }

    // Limitar tamanho (10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "Arquivo muito grande (máximo 10MB)" },
        { status: 400 }
      );
    }

    // Criar diretório de uploads se não existir
    const uploadDir = join(process.cwd(), "uploads");
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Gerar nome único
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(7);
    const extension = file.name.split(".").pop();
    const filename = `${timestamp}-${randomStr}.${extension}`;
    const filepath = join(uploadDir, filename);

    // Salvar arquivo
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filepath, buffer);

    // Salvar no banco
    const evidence = await prisma.evidence.create({
      data: {
        id: randomUUID(),
        filename,
        originalName: file.name,
        mimeType: file.type,
        size: file.size,
        path: filepath,
        descricao: descricao || null,
        policyId: policyId || null,
        riskId: riskId || null,
        incidentId: incidentId || null,
        uploadedBy: userId
      }
    });

    return NextResponse.json(evidence, { status: 201 });
  } catch (error) {
    console.error("Erro ao fazer upload:", error);
    return NextResponse.json(
      { error: "Erro ao fazer upload" },
      { status: 500 }
    );
  }
}
