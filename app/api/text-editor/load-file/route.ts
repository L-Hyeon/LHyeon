import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_DIR =
  process.env.NODE_ENV === "production"
    ? "/data" // 프로덕션 컨테이너 경로
    : "/codeserver/Private"; // 개발 시 경로

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");

  if (!filename) {
    return NextResponse.json({ error: "파일명 누락" }, { status: 400 });
  }

  const filePath = path.join(DATA_DIR, filename);
  try {
    const content = await fs.readFile(filePath, "utf8");
    return NextResponse.json({ content });
  } catch {
    return NextResponse.json({ error: "파일 읽기 실패" }, { status: 404 });
  }
}
