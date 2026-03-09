"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { useState } from "react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import CodeBlock from "@tiptap/extension-code-block";
import Youtube from "@tiptap/extension-youtube";
import Heading from "@tiptap/extension-heading";
import Placeholder from "@tiptap/extension-placeholder";
import InternalLinkModal from "./InternalLinkModal";

interface Props {
  value: string;
  onChange: (content: string) => void;
}



export default function RichEditor({ value, onChange }: Props) {

  const [linkModal, setLinkModal] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({ levels: [1, 2, 3] }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-lg"
        }
      }),
      Link.configure({
        openOnClick: false
      }),
      CodeBlock,
      Youtube.configure({
        controls: true
      }),
      Placeholder.configure({
        placeholder: "Write your blog content..."
      })
    ],

    content: value,

    immediatelyRender: false,

    onUpdate({ editor }) {
      onChange(editor.getHTML());
    }
  });

  function insertHTML() {

    if (!editor) return;

    const html = prompt("Paste HTML code");

    if (html) {
      editor.chain().focus().insertContent(html).run();
    }

  }

  /* ======================
    Internal Link Insert Function
  ====================== */

  function insertInternalLink(url: string) {

    if (!editor) return;

    editor.chain().focus().setLink({
      href: url
    }).run();

  }

  if (!editor) return null;

  /* ======================
     Add Image with ALT
  ====================== */

  function addImage() {

    if (!editor) return;

    const url = prompt("Image URL");
    const alt = prompt("Image ALT text");

    if (url) {
      editor.chain().focus().setImage({
        src: url,
        alt: alt || ""
      }).run();
    }

  }

  /* ======================
     Add YouTube
  ====================== */

  function addYoutube() {

    if (!editor) return;

    const url = prompt("YouTube URL");

    if (url) {
      editor.commands.setYoutubeVideo({
        src: url
      });
    }

  }

  /* ======================
    Internal Link
 ====================== */

  function addLink() {

    if (!editor) return;

    const url = prompt("Enter URL");

    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }

  }

  /* ======================
     FAQ Generator
  ====================== */
  function addFAQ() {

    if (!editor) return;

    const q = prompt("FAQ Question");
    const a = prompt("FAQ Answer");

    if (!q || !a) return;

    const faqHTML = `
<div class="faq-item">
<h3>${q}</h3>
<p>${a}</p>
</div>
`;

    editor.chain().focus().insertContent(faqHTML).run();
  }
  /* ======================
     Table of Contents
  ====================== */

  function insertTOC() {

    if (!editor) return;

    const tocHTML = `
<div class="table-of-contents">
<h2>Table of Contents</h2>
<ul>
<li><a href="#section1">Section 1</a></li>
<li><a href="#section2">Section 2</a></li>
<li><a href="#section3">Section 3</a></li>
</ul>
</div>
`;

    editor.chain().focus().insertContent(tocHTML).run();
  }

  return (

    <div className="border rounded-xl overflow-hidden">

      {/* Toolbar */}

      <div className="flex flex-wrap gap-2 border-b p-2 bg-gray-50">

        <button
          onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
          className="px-3 py-1 border rounded text-sm"
        >
          Bold
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="px-3 py-1 border rounded text-sm"
        >
          Italic
        </button>

        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className="px-3 py-1 border rounded text-sm"
        >
          H2
        </button>

        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className="px-3 py-1 border rounded text-sm"
        >
          H3
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="px-3 py-1 border rounded text-sm"
        >
          List
        </button>

        <button
          onClick={() => setLinkModal(true)}
          className="px-3 py-1 border rounded text-sm"
        >
          Internal Link
        </button>

        <button
          onClick={addImage}
          className="px-3 py-1 border rounded text-sm"
        >
          Image
        </button>

        <button
          onClick={addYoutube}
          className="px-3 py-1 border rounded text-sm"
        >
          YouTube
        </button>

        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className="px-3 py-1 border rounded text-sm"
        >
          Code
        </button>
        <button
          onClick={insertHTML}
          className="px-3 py-1 border rounded text-sm"
        >
          HTML
        </button>

        <button
          onClick={addFAQ}
          className="px-3 py-1 border rounded text-sm"
        >
          FAQ
        </button>

        <button
          onClick={insertTOC}
          className="px-3 py-1 border rounded text-sm"
        >
          TOC
        </button>

      </div>

      {/* Editor */}

      <EditorContent
        editor={editor}
        className="p-4 min-h-87.5 prose max-w-none"
      />
      <InternalLinkModal
        open={linkModal}
        onClose={() => setLinkModal(false)}
        onSelect={insertInternalLink}
      />

    </div>

  );

}