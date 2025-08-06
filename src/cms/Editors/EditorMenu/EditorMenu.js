import { FaLink, FaBold, FaStrikethrough, FaUnderline, FaItalic, FaList, FaListOl, FaQuoteLeft, FaIndent, FaHeading, FaYoutube, FaImage, FaCheck, FaTimes} from "react-icons/fa";
import './EditorMenu.scss'
import { useEffect, useState } from "react";

export default function EditorMenu({ editor, isSimple, isFixed }){

  let addQuote = () => {}
  let addImage = () => {}
  let addYoutubeVideo = () => {}

  if (!editor) {
    return null;
  }
  if(!isSimple){
    addQuote = () => {
        editor.chain()
          .focus()
          .insertContent({
            type: 'blockquote',
            content: [
            {
              type: 'quoteText',
              attrs: { class: 'quote-text' },
              content: [{ type: 'text', text: 'Quote text' }],
            },
            {
              type: 'quoteAuthor', // Using our custom node
              content: [{ type: 'text', text: 'Quote Author' }],
            },
            ]
          })
        .run();
    }

    addImage = () => {
      const url = window.prompt('Enter the URL of the image:');
      if (url) editor.chain().focus().setImage({ src: url }).run();
    };

    addYoutubeVideo = () => {
      const url = prompt('Enter YouTube URL:') || '';
      
      // Fixed and robust regex pattern
      const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?=\b|\/|$)/;
      const match = url.match(regex);
      
      if (match && match[1]) {
        editor.commands.setYoutubeVideo({
          src: `https://www.youtube.com/embed/${match[1]}`,
          width: 640,
          height: 360,
          allowfullscreen: 'true'
        });
      } else {
        alert('Please enter a valid YouTube URL. Examples:\n' +
              '• https://youtu.be/dQw4w9WgXcQ\n' +
              '• https://www.youtube.com/watch?v=dQw4w9WgXcQ\n' +
              '• https://www.youtube.com/embed/dQw4w9WgXcQ');
      }
    };
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: url })
      .run();
  };
  const setTab = () =>{
    editor.commands.insertContent('\t');
  }
  return (
    <div className={`editor-menu-bar ${isFixed? "fixed ": ""}${isSimple? "simple": ""}`}>
      {!isSimple && 
        <>
          <button
            onClick={addQuote}
            className={editor.isActive('blockquote') ? 'is-active' : ''}
            type="button"
          >
            <FaQuoteLeft/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
            type='button'
          >
            <FaHeading/>
          </button>
        </>
      }
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
        type='button'
      >
        <FaBold/>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
        type='button'
      >
        <FaItalic/>
      </button>
            <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive('underline') ? 'is-active' : ''}
        type='button'
      >
        <FaUnderline/>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}
        type='button'
      >
        <FaStrikethrough/>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
        type='button'
      >
        <FaListOl/>
      </button>
          <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
        type='button'
      >
        <FaList/>
      </button>
      <button
        onClick={setLink}
        className={editor.isActive('link') ? 'is-active' : ''}
        type='button'
      >
        <FaLink/>
      </button>
      {!isSimple && 
        <>
          <button onClick={addImage} type='button'>
            <FaImage/>
          </button>
          <button onClick={addYoutubeVideo} type='button'>
            <FaYoutube/>
          </button>
          <button onClick={setTab} type='button'>
            <FaIndent/>
          </button>
          
          <button
            onClick={() => editor.commands.setComparison()}
            type='button'
            className="comparison-button"
          >
            <FaCheck className="checkmark"/> / <FaTimes className="xmark"/>
          </button>
        </>
      }
    </div>
  );
};