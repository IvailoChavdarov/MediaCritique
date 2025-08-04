import { useState } from 'react'
import Editor from '../Editor/Editor'
// import './EditorWrapper.scss'
export default function EditorWrapper({content, setContent}){
  // const [content, setContent] = useState('<p>Start writing here...</p>')

  return (
    <div className="editor-wrapper">
        <div className='article-details'>
          <div className='article-content'>
        <Editor content={content} onChange={setContent} />
          </div>
        <div className="content-preview">
          <h3>Output HTML:</h3>
          <p>{content}</p>
        </div>
      </div>
    </div>
  )
}

