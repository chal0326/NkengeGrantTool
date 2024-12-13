import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Button } from '../ui/Button';
import BoldIcon from 'lucide-react/dist/esm/icons/bold'
import ItalicIcon from 'lucide-react/dist/esm/icons/italic'
import ListIcon from 'lucide-react/dist/esm/icons/list'
import ListOrderedIcon from 'lucide-react/dist/esm/icons/list-ordered'

interface TemplateEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export function TemplateEditor({ content, onChange }: TemplateEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="border-b bg-gray-50 p-2 flex gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'bg-gray-200' : ''}
        >
          <BoldIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'bg-gray-200' : ''}
        >
          <ItalicIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'bg-gray-200' : ''}
        >
          <ListIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'bg-gray-200' : ''}
        >
          <ListOrderedIcon className="w-4 h-4" />
        </Button>
      </div>
      <EditorContent editor={editor} className="prose max-w-none p-4" />
    </div>
  );
}