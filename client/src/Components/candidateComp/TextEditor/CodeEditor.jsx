import {useState, useRef} from 'react'
import Editor from '@monaco-editor/react';
import LanguageSelector from './LanguageSelector';
import { CODE_SNIPPETS } from './constants';
import Output from './Output';

const CodeEditor = () => {
  const [value, setValue] = useState();
  const editorRef = useRef();
  const [language, setLanguage] = useState('javascript');

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  }

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  }

  console.log('setlangugae', language);

  return (
    <div className='flex h-full'>

      <div className='w-1/2 h-full flex flex-col justify-around '>
        <div className='bg-neutral-800'>
          <LanguageSelector language={language} onSelect={onSelect} />
        </div>
        <div className=''>
          <Editor
            height="58vh"
            theme="vs-dark"
            language={language}
            defaultValue={CODE_SNIPPETS[language]}
            onMount={onMount}
            value={value}
            onChange={(value) => setValue(value)}

          />
        </div>
      </div>

      <div className='w-1/2 h-full flex flex-col justify-between'>
        <Output editorRef={editorRef} language={language} />
      </div>

    </div>
  )
}

export default CodeEditor
