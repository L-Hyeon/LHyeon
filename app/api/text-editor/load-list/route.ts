import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_DIR =
  process.env.NODE_ENV === "production"
    ? "/data" // 프로덕션 컨테이너 경로
    : "/codeserver/Private"; // 개발 시 경로

export async function GET() {
  try {
    const files = await fs.readdir(DATA_DIR);
    return NextResponse.json({ files });
  } catch {
    return NextResponse.json(
      { error: "파일 리스트 조회 실패" },
      { status: 500 }
    );
  }
}
