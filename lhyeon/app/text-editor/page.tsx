"use client";

import { useState } from "react";
import MarkdownEditor from "../components/text-editor/MarkdownEditor";

export default function TextEditorPage() {
  const [fileList, setFileList] = useState<string[] | null>(null);
  const [currentFile, setCurrentFile] = useState<string | null>(null);
  const [content, setContent] = useState<string>("");

  // 파일 리스트 불러오기
  const loadFileList = async () => {
    const res = await fetch("/api/text-editor/load-list");
    const data = await res.json();
    if (data.files) {
      setFileList(data.files);
    } else {
      alert(data.error || "파일 목록을 불러올 수 없습니다.");
    }
  };

  // 선택한 파일 내용 읽기
  const loadFileContent = async (filename: string) => {
    const res = await fetch(
      `/api/text-editor/load-file?filename=${encodeURIComponent(filename)}`
    );
    const data = await res.json();
    if ("content" in data) {
      setCurrentFile(filename);
      setContent(data.content);
    } else {
      alert(data.error || "파일 내용을 불러올 수 없습니다.");
    }
  };

  // 파일 저장
  const saveFile = async () => {
    if (!currentFile) return alert("파일을 선택하세요");
    const res = await fetch("/api/text-editor/save-file", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename: currentFile, content }),
    });
    const data = await res.json();
    if (data.message) alert("저장 성공");
    else alert(data.error || "저장 실패");
  };

  return (
    <div style={{ padding: 20, maxWidth: "800px", margin: "0 auto" }}>
      {!fileList && <button onClick={loadFileList}>Load File</button>}
      {fileList && !currentFile && (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {fileList.map((file) => (
            <li key={file} style={{ margin: "10px 0" }}>
              <button onClick={() => loadFileContent(file)}>{file}</button>
            </li>
          ))}
        </ul>
      )}
      {currentFile && (
        <>
          <h3>Editing: {currentFile}</h3>
          <MarkdownEditor value={content} onChange={setContent} />
          <button onClick={saveFile} style={{ marginTop: 10 }}>
            Save
          </button>
          <button
            onClick={() => {
              setCurrentFile(null);
              setFileList(null);
              setContent("");
            }}
            style={{ marginLeft: 10 }}>
            Back
          </button>
        </>
      )}
    </div>
  );
}
