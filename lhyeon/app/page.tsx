"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
      }}>
      <button
        onClick={() => router.push("/plan-it")}
        style={{
          padding: "12px 24px",
          fontSize: "18px",
          cursor: "pointer",
          borderRadius: "6px",
          border: "1px solid #444",
          backgroundColor: "#f0f0f0",
          transition: "background-color 0.3s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ddd")}
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#f0f0f0")
        }>
        Plan-It
      </button>
      <button
        onClick={() => router.push("/text-editor")}
        style={{
          padding: "12px 24px",
          fontSize: "18px",
          cursor: "pointer",
          borderRadius: "6px",
          border: "1px solid #444",
          backgroundColor: "#f0f0f0",
          transition: "background-color 0.3s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ddd")}
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#f0f0f0")
        }>
        Text-Editor
      </button>
    </div>
  );
}
