import React, { useState } from 'react';
import { IoSearch } from "react-icons/io5";
import { MdClear } from "react-icons/md";
import { useInterviewContext } from '../../../Context/InterviewContext';


const SearchBar = ({ filteredInterviews }) => {

  const {
    setSearchedInterview,
    searchInput,
    setSearchInput,
    search,
    setSearch
  } = useInterviewContext();

  const [icon, setIcon] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if ((!searchInput)) return;

    if (searchInput.length < 3) {
      console.log("Search term must be at least 3 characters long");
      return;
    }

    const searchResult = filteredInterviews.filter((interview) =>
      interview.subject && interview.subject.toLowerCase().includes(searchInput.toLowerCase())
    );

    setIcon(true);
    if (searchResult.length > 0) {
      setSearchedInterview(searchResult);
      setSearch(true);
    } else {
      console.log('No such Interview');
      setSearch(false);
      setSearchedInterview([]);
    }
  }

  const handleClear = (e) => {
    setIcon(false);
    setSearch(false);
    setSearchInput('');
    setSearchedInterview([]);
  }

  return (
    <div className='button-container flex items-center rounded-2xl px-1 py-1 text-xl text-neutral-200  w-2/3 bg-neutral-500 opacity-60 justify-center backdrop-opacity-10'>
      <input
        type='text'
        placeholder='search here...'
        className='flex-1  border-0 outline-0 px-5 py-2 bg-transparent text-xl text-neutral-50   placeholder:text-white placeholder:text-start placeholder:px-4'
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      
        <button
          className={`w-10 h-10 rounded-full border-0 bg-neutral-800 mr-4 hover:bg-neutral-400 search-button ${icon ? 'translated' : ''}`}
          onClick={handleSearch}
        >
          <IoSearch className='h-7 w-8 mr-5 rounded-full text-white pl ml-1 hover:text-neutral-800' />
        </button>

        <button
          className={`w-10 h-10 rounded-full border-0 bg-neutral-800 mr-4 hover:bg-neutral-400 clear-button ${icon ? 'visible' : ''}`}
          onClick={handleClear}
        >
          <MdClear className='h-7 w-8 mr-5 rounded-full text-white pl ml-1 hover:text-neutral-800' />
        </button>
      

    </div>
  )
}

export default SearchBar;
