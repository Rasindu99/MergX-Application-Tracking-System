import React, { useState } from 'react';
import { LANGUAGE_VERSIONS } from './constants';

const languages = Object.entries(LANGUAGE_VERSIONS);

const LanguageSelector = ({language, onSelect}) => {
  
  const [menuVisible, setMenuVisible] = useState(false);

  const handleMenu = (lang) => {
    onSelect(lang);
    setMenuVisible(!menuVisible);
  }

  return (
    <div className="relative flex justify-end items-center z-10 bg-transparent">
      <div className='flex justify-end'>
        <h1 className='font-normal text-base mt-[2px] text-neutral-400'>Language :</h1>
        <button
          onClick={() => setMenuVisible(!menuVisible)}
          className="bg-orange-700 opacity-65 text-white py-[3px] w-[80px] my-[2px] rounded font-normal text-sm ml-3 mr-1"
        >
          {language}
        </button>
      </div>
      {menuVisible && (
        <div className="absolute top-[30px] right-1 w-40 bg-[#363636] rounded border-[2px] border-[#444444] shadow-xl" isLazy>
          {languages.map(([lang, version]) => (
            <div
              onClick={() => handleMenu(lang)}
              className={`cursor-pointer text-neutral-400 p-1 font-semibold text-sm hover:bg-[#575656] border-b-[1px] border-[#444444] ${lang == language ? 'bg-orange-800 bg-opacity-20 text-orange-600' : ''}`}
            >
              {lang}
              <div className={`text-sm font-bold ${lang == language ? 'text-orange-700' : 'text-orange-800'} `}>({version})</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
