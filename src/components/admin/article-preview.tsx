
"use client";

import {
  EditorContent,
  useEditor,
  type JSONContent,
} from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";

type ArticlePreviewProps = {
  content: JSONContent;
};

export default function ArticlePreview({
  content,
}: ArticlePreviewProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit],
    content,
    editable: false,
    editorProps: {
      attributes: {
        class: "outline-none",
      },
    },
  });

  return (
    <div className="doribabs-editor">
      <EditorContent editor={editor} />
    </div>
  );
}
