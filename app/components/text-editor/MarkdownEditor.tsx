"use client";

import { useEffect, useRef } from "react";
import OverType from "overtype";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ value, onChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<any>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (containerRef.current && !initializedRef.current) {
      const [instance] = OverType.init(containerRef.current, {
        value,
        onChange,
        // toolbar 옵션 제거하여 툴바 없음
      });
      editorRef.current = instance;
      initializedRef.current = true;

      return () => {
        editorRef.current?.destroy();
        initializedRef.current = false;
      };
    }
  }, []);

  useEffect(() => {
    if (editorRef.current && editorRef.current.getValue() !== value) {
      editorRef.current.setValue(value);
    }
  }, [value]);

  return (
    <div
      ref={containerRef}
      style={{ height: "500px", border: "1px solid #ccc" }}
    />
  );
};

export default MarkdownEditor;
