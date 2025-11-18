import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_DIR =
  process.env.NODE_ENV === "production"
    ? "/data" // 프로덕션 컨테이너 경로
    : path.join(process.cwd(), "test"); // 개발 환경 내 프로젝트 data 폴더

export async function POST(request: NextRequest) {
  try {
    const { filename, content } = await request.json();

    if (typeof filename !== "string" || typeof content !== "string") {
      return NextResponse.json({ error: "잘못된 요청" }, { status: 400 });
    }

    const filePath = path.join(DATA_DIR, filename);
    await fs.writeFile(filePath, content, "utf8");

    return NextResponse.json({ message: "파일 저장 완료" });
  } catch {
    return NextResponse.json({ error: "파일 저장 실패" }, { status: 500 });
  }
}
