import { EditorContent, Editor } from "@tiptap/react"
import "./tiptap.scss"
import { FaBold, FaItalic, FaListUl, FaListOl, FaQuoteRight, FaUndo, FaRedo } from "react-icons/fa"
import { MdLooksOne, MdLooksTwo, MdLooks3 } from "react-icons/md"

interface RichTextEditorProps {
  editor: Editor | null
}

export function RichTextEditor({ editor }: RichTextEditorProps) {
  if (!editor) return null

  return (
    <div className="richtext-editor">
      <div className="toolbar">
        <button
          type="button"
          className={`toolbar-button ${editor.isActive("bold") ? "active" : ""}`}
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
        >
          <FaBold />
        </button>
        <button
          type="button"
          className={`toolbar-button ${editor.isActive("italic") ? "active" : ""}`}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
        >
          <FaItalic />
        </button>

        <div className="divider" />

        <button
          type="button"
          className={`toolbar-button ${editor.isActive("heading", { level: 1 }) ? "active" : ""}`}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        >
          <MdLooksOne />
        </button>
        <button
          type="button"
          className={`toolbar-button ${editor.isActive("heading", { level: 2 }) ? "active" : ""}`}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <MdLooksTwo />
        </button>
        <button
          type="button"
          className={`toolbar-button ${editor.isActive("heading", { level: 3 }) ? "active" : ""}`}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          <MdLooks3 />
        </button>

        <div className="divider" />

        <button
          type="button"
          className={`toolbar-button ${editor.isActive("bulletList") ? "active" : ""}`}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <FaListUl />
        </button>
        <button
          type="button"
          className={`toolbar-button ${editor.isActive("orderedList") ? "active" : ""}`}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <FaListOl />
        </button>
        <button
          type="button"
          className={`toolbar-button ${editor.isActive("blockquote") ? "active" : ""}`}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <FaQuoteRight />
        </button>

        <div className="divider" />

        <button
          type="button"
          className="toolbar-button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <FaUndo />
        </button>
        <button
          type="button"
          className="toolbar-button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <FaRedo />
        </button>
      </div>

      <EditorContent editor={editor} className="editor-content"  />
    </div>
  )
}