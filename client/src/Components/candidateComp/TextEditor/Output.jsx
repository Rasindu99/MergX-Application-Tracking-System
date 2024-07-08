import { executeCode } from './api';
import { useState } from 'react';

const Output = ({editorRef, language}) => {
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {

    const sourceCode = editorRef.current?.getValue();
    if(!sourceCode) return;
    try {
      setLoading(true);
      setError(null);
      const {run:result} = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      setError(error.message || 'An error occurred while executing the code.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='w-full h-full flex flex-col'>

      <div className='flex justify-end'>
        <h1 className='font-normal text-base mt-[2px] text-neutral-400'>Output :</h1>
        <button className='bg-neutral-700 opacity-80 text-orange-600 border border-orange-600 py-[3px] w-[80px] my-[2px] rounded font-normal text-sm ml-3 mr-1 hover:bg-orange-600 hover:text-neutral-100 hover:border-neutral-100' onClick={runCode}>Run Code</button>
      </div>

     <div className={`w-full bg-[#2B2B2B] h-full border p-2 ${isError ? 'border-[#521d1d] text-[#ae3c3c] bg-[#2c0f0f]' : 'border-[#343434]' }`}>
     {loading ? (
          'Compiling ...'
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : output ? (
          output.map((line, index) => <div key={index}>{line}</div>)
        ) : (
          'Click "Run Code" to see the output here'
        )}
     </div>

    </div>
  )
}

export default Output
