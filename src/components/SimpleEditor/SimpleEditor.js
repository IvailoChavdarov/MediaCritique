import { useEditor, EditorContent } from '@tiptap/react';
import { useEffect } from 'react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import EditorMenu from '../EditorMenu/EditorMenu';
import { CustomLink } from '../../utils/editorExtensions';

export default function SimpleEditor({ content, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [3],
        },
        bold: true,
        italic: true,
        underline: true,
        strike: true,
        paragraph: {
          HTMLAttributes: {
            class: null,
          }
        }
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      }),
      CustomLink
    ],
    content: content || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content, false);
    }
  }, [content, editor]);

  if (!editor) return null;

  return (
    <div className="editor">
      <EditorMenu editor={editor} isSimple={true} />
      <EditorContent editor={editor} />
    </div>
  );
}
