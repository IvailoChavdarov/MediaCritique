import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';
import Blockquote from '@tiptap/extension-blockquote';
import {QuoteParagraph, QuoteAuthor, CustomLink, CustomListItem, TruthsList, LiesList, Comparison} from '../../utils/editorExtensions'
import EditorMenu from '../EditorMenu/EditorMenu';

export default function Editor({ content, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [3],
        },
        bold: true,
        italic: true,
        underline:true,
        strike: true,
        paragraph: {
          HTMLAttributes:{
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
      Image.configure({
        inline: true,
      }),
      Youtube.configure({
        inline: false,
        width: 640,
        height: 360,
        controls: true,
        HTMLAttributes: {
          class: 'youtube-embed',
        },
      }),
      Blockquote,
      CustomListItem,
      TruthsList,
      LiesList,
      Comparison,
      CustomLink,
      QuoteParagraph,
      QuoteParagraph,
      QuoteAuthor
    ],
    content: content || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="editor">
      <EditorMenu editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
