"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CodeBlock from "@tiptap/extension-code-block";
import Image from "@tiptap/extension-image";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import { useEffect } from "react";
import {
  Bold,
  Italic,
  List,
  Code,
  Table2,
  Image as ImageIcon,
} from "lucide-react"; // modern icons

export default function TiptapEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      CodeBlock,
      Image,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "min-h-[300px] focus:outline-none prose dark:prose-invert text-white max-w-full",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="bg-slate-800 border border-white/10 rounded-xl shadow-inner px-4 py-3 space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-2 sticky top-0 z-10 bg-slate-800">
        <EditorButton
          isActive={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
          icon={<Bold size={16} />}
        />
        <EditorButton
          isActive={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          icon={<Italic size={16} />}
        />
        <EditorButton
          isActive={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          icon={<List size={16} />}
        />
        <EditorButton
          isActive={editor.isActive("codeBlock")}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          icon={<Code size={16} />}
        />
        <EditorButton
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
          icon={<Table2 size={16} />}
        />
        <EditorButton
          onClick={() => {
            const url = prompt("Enter image URL");
            if (url) {
              editor.chain().focus().setImage({ src: url }).run();
            }
          }}
          icon={<ImageIcon size={16} />}
        />
      </div>

      {/* Editor */}
      <div className="h-48 custom-scrollbar overflow-auto prose dark:prose-invert max-w-full [&_img]:w-full [&_img]:max-h-48 [&_img]:rounded-md [&_img]:object-contain [&_table]:w-full [&_table]:border [&_td]:border [&_th]:border">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

// Custom button component
function EditorButton({ isActive, onClick, icon }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-1.5 rounded-md hover:bg-white/10 transition ${
        isActive ? "bg-white/10 text-cyan-400" : "text-slate-300"
      }`}
    >
      {icon}
    </button>
  );
}
