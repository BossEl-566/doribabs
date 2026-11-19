
import {
  Fragment,
  type ReactNode,
} from "react";

import type { JSONContent } from "@tiptap/react";

type RichTextProps = {
  content: JSONContent | null;
};

function safeHref(value: unknown): string | null {
  if (typeof value !== "string") return null;

  try {
    const url = new URL(value);

    if (!["http:", "https:"].includes(url.protocol)) {
      return null;
    }

    return url.href;
  } catch {
    return null;
  }
}

function renderNode(
  node: JSONContent,
  key: string
): ReactNode {
  if (node.type === "text") {
    let result: ReactNode = node.text ?? "";

    for (const [i, mark] of (node.marks ?? []).entries()) {
      const markKey = `${key}-mark-${i}`;

      switch (mark.type) {
        case "bold":
          result = <strong key={markKey}>{result}</strong>;
          break;

        case "italic":
          result = <em key={markKey}>{result}</em>;
          break;

        case "underline":
          result = <u key={markKey}>{result}</u>;
          break;

        case "strike":
          result = <s key={markKey}>{result}</s>;
          break;

        case "code":
          result = <code key={markKey}>{result}</code>;
          break;

        case "link": {
          const href = safeHref(mark.attrs?.href);

          if (href) {
            result = (
              <a
                key={markKey}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {result}
              </a>
            );
          }
          break;
        }
      }
    }

    return <Fragment key={key}>{result}</Fragment>;
  }

  const children = node.content?.map((child, index) =>
    renderNode(child, `${key}-${index}`)
  );

  switch (node.type) {
    case "doc":
      return <Fragment key={key}>{children}</Fragment>;

    case "paragraph":
      return <p key={key}>{children}</p>;

    case "heading": {
      const level = Number(node.attrs?.level);

      return level === 3 ? (
        <h3 key={key}>{children}</h3>
      ) : (
        <h2 key={key}>{children}</h2>
      );
    }

    case "bulletList":
      return <ul key={key}>{children}</ul>;

    case "orderedList":
      return <ol key={key}>{children}</ol>;

    case "listItem":
      return <li key={key}>{children}</li>;

    case "blockquote":
      return <blockquote key={key}>{children}</blockquote>;

    case "horizontalRule":
      return <hr key={key} />;

    case "hardBreak":
      return <br key={key} />;

    case "codeBlock":
      return (
        <pre key={key}>
          <code>{node.content?.map((n) => n.text ?? "").join("")}</code>
        </pre>
      );

    default:
      // Render only explicitly supported Tiptap nodes.
      return null;
  }
}

export default function RichText({
  content,
}: RichTextProps) {
  if (!content || content.type !== "doc") {
    return null;
  }

  return (
    <div className="school-richtext">
      {renderNode(content, "root")}
    </div>
  );
}
