
"use client";

import { useState } from "react";
import {
  EditorContent,
  useEditor,
  type JSONContent,
} from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link2,
  Link2Off,
  Undo2,
  Redo2,
  Minus,
} from "lucide-react";

type ArticleEditorProps = {
  initialContent: JSONContent;
  onChange: (content: JSONContent) => void;
};

export default function ArticleEditor({
  initialContent,
  onChange,
}: ArticleEditorProps) {
  // Trigger toolbar updates when selection changes.
  const [, refreshToolbar] = useState(0);

  const editor = useEditor({
    immediatelyRender: false,

    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
        link: {
          openOnClick: false,
          autolink: true,
          HTMLAttributes: {
            rel: "noopener noreferrer",
            target: "_blank",
          },
        },
      }),

      Placeholder.configure({
        placeholder:
          "Write your school news, announcement or article here...",
      }),
    ],

    content: initialContent,

    editorProps: {
      attributes: {
        class:
          "min-h-[360px] px-6 py-6 outline-none focus:outline-none",
        "aria-label": "Article content editor",
      },
    },

    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
      refreshToolbar((value) => value + 1);
    },

    onSelectionUpdate: () => {
      refreshToolbar((value) => value + 1);
    },
  });

  if (!editor) {
    return (
      <div className="flex min-h-96 items-center justify-center rounded-xl border border-slate-200 bg-white text-sm text-slate-400">
        Loading editor...
      </div>
    );
  }

  function insertLink() {
    if (!editor) return;

    const existingUrl =
      editor.getAttributes("link").href || "https://";

    const url = window.prompt(
      "Enter a link URL:",
      existingUrl
    );

    if (url === null) return;

    if (!url.trim()) {
      editor.chain().focus().unsetLink().run();
      return;
    }

    try {
      const parsedUrl = new URL(url);

      if (!["http:", "https:"].includes(parsedUrl.protocol)) {
        window.alert("Only HTTP and HTTPS links are allowed.");
        return;
      }

      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: parsedUrl.href })
        .run();
    } catch {
      window.alert("Please enter a valid URL.");
    }
  }

  const buttonClass = (active = false) =>
    `flex h-9 w-9 items-center justify-center rounded-lg transition ${
      active
        ? "bg-[#EAF5EE] text-[#176B49]"
        : "text-slate-600 hover:bg-slate-100"
    }`;

  return (
    <div className="doribabs-editor overflow-hidden rounded-xl border border-slate-200 bg-white">
      {/* Formatting Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 bg-slate-50 p-3">
        <button
          type="button"
          title="Bold"
          aria-label="Bold"
          aria-pressed={editor.isActive("bold")}
          onClick={() =>
            editor.chain().focus().toggleBold().run()
          }
          className={buttonClass(editor.isActive("bold"))}
        >
          <Bold size={18} />
        </button>

        <button
          type="button"
          title="Italic"
          aria-label="Italic"
          aria-pressed={editor.isActive("italic")}
          onClick={() =>
            editor.chain().focus().toggleItalic().run()
          }
          className={buttonClass(editor.isActive("italic"))}
        >
          <Italic size={18} />
        </button>

        <button
          type="button"
          title="Underline"
          aria-label="Underline"
          aria-pressed={editor.isActive("underline")}
          onClick={() =>
            editor.chain().focus().toggleUnderline().run()
          }
          className={buttonClass(editor.isActive("underline"))}
        >
          <Underline size={18} />
        </button>

        <button
          type="button"
          title="Strikethrough"
          aria-label="Strikethrough"
          aria-pressed={editor.isActive("strike")}
          onClick={() =>
            editor.chain().focus().toggleStrike().run()
          }
          className={buttonClass(editor.isActive("strike"))}
        >
          <Strikethrough size={18} />
        </button>

        <div className="mx-1 h-6 w-px bg-slate-200" />

        <button
          type="button"
          title="Heading 2"
          aria-label="Heading 2"
          aria-pressed={editor.isActive("heading", { level: 2 })}
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHeading({ level: 2 })
              .run()
          }
          className={buttonClass(
            editor.isActive("heading", { level: 2 })
          )}
        >
          <Heading2 size={19} />
        </button>

        <button
          type="button"
          title="Heading 3"
          aria-label="Heading 3"
          aria-pressed={editor.isActive("heading", { level: 3 })}
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHeading({ level: 3 })
              .run()
          }
          className={buttonClass(
            editor.isActive("heading", { level: 3 })
          )}
        >
          <Heading3 size={19} />
        </button>

        <div className="mx-1 h-6 w-px bg-slate-200" />

        <button
          type="button"
          title="Bullet List"
          aria-label="Bullet List"
          aria-pressed={editor.isActive("bulletList")}
          onClick={() =>
            editor.chain().focus().toggleBulletList().run()
          }
          className={buttonClass(editor.isActive("bulletList"))}
        >
          <List size={19} />
        </button>

        <button
          type="button"
          title="Numbered List"
          aria-label="Numbered List"
          aria-pressed={editor.isActive("orderedList")}
          onClick={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
          className={buttonClass(editor.isActive("orderedList"))}
        >
          <ListOrdered size={19} />
        </button>

        <button
          type="button"
          title="Blockquote"
          aria-label="Blockquote"
          aria-pressed={editor.isActive("blockquote")}
          onClick={() =>
            editor.chain().focus().toggleBlockquote().run()
          }
          className={buttonClass(editor.isActive("blockquote"))}
        >
          <Quote size={19} />
        </button>

        <button
          type="button"
          title="Horizontal Rule"
          aria-label="Horizontal Rule"
          onClick={() =>
            editor.chain().focus().setHorizontalRule().run()
          }
          className={buttonClass()}
        >
          <Minus size={19} />
        </button>

        <div className="mx-1 h-6 w-px bg-slate-200" />

        <button
          type="button"
          title="Insert or Edit Link"
          aria-label="Insert or Edit Link"
          onClick={insertLink}
          className={buttonClass(editor.isActive("link"))}
        >
          <Link2 size={18} />
        </button>

        <button
          type="button"
          title="Remove Link"
          aria-label="Remove Link"
          disabled={!editor.isActive("link")}
          onClick={() =>
            editor.chain().focus().unsetLink().run()
          }
          className={`${buttonClass()} disabled:opacity-30`}
        >
          <Link2Off size={18} />
        </button>

        <div className="mx-1 h-6 w-px bg-slate-200" />

        <button
          type="button"
          title="Undo"
          aria-label="Undo"
          disabled={!editor.can().chain().focus().undo().run()}
          onClick={() =>
            editor.chain().focus().undo().run()
          }
          className={`${buttonClass()} disabled:opacity-30`}
        >
          <Undo2 size={18} />
        </button>

        <button
          type="button"
          title="Redo"
          aria-label="Redo"
          disabled={!editor.can().chain().focus().redo().run()}
          onClick={() =>
            editor.chain().focus().redo().run()
          }
          className={`${buttonClass()} disabled:opacity-30`}
        >
          <Redo2 size={18} />
        </button>
      </div>

      {/* Editable Content */}
      <EditorContent editor={editor} />

      {/* Bottom bar */}
      <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-5 py-3 text-xs text-slate-400">
        <span>Rich-text article editor</span>
        <span>Supports formatted text and links</span>
      </div>
    </div>
  );
}
