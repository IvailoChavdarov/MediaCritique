import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';
import Blockquote from '@tiptap/extension-blockquote';
import {QuoteParagraph, QuoteAuthor, CustomLink, CustomListItem, TruthsList, LiesList, Comparison} from '../../../utils/editorExtensions'
import EditorMenu from '../EditorMenu/EditorMenu';
import { useEffect, useRef, useState } from 'react';

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

  const editorRef = useRef(null);
  const [editorInfo, setEditorInfo] = useState({
    top: 0,
    height: 0
  });
  const [menuIsFixed, setMenuIsFixed] = useState(false)

  useEffect(() => {
    const handleResizeAndScroll = () => {
      if (editorRef.current) {
        const rect = editorRef.current.getBoundingClientRect();
        console.log(rect.top<=0 && (rect.top+rect.height-60)>0)
        if(rect.top<=0 && (rect.top+rect.height)>0){
          setMenuIsFixed(true)
        }
        else{
          setMenuIsFixed(false)
        }
      }
      // setFixedEditorMenu()
    };

    // Get initial measurements
    handleResizeAndScroll();

    // Update on resize and scroll
    window.addEventListener('resize', handleResizeAndScroll);
    window.addEventListener('scroll', handleResizeAndScroll);

    return () => {
      window.removeEventListener('resize', handleResizeAndScroll);
      window.removeEventListener('scroll', handleResizeAndScroll);
    };
  }, []);

  if (!editor) {
    return null;
  }

  return (
    <div className="editor">
      <EditorMenu editor={editor} isFixed={menuIsFixed}/>
      <EditorContent editor={editor} ref={editorRef}/>
    </div>
  );
}
