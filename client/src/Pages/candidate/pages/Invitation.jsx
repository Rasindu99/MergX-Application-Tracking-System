import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { useInterviewContext } from '../../../Context/InterviewContext';
import Interview from '../../../Components/candidateComp/Interview_Invitation/Interview.jsx';
import SearchBar from '../../../Components/candidateComp/Interview_Invitation/SearchBar.jsx';




const Invitation = () => {

  const {
    interviews,
    setInterviews,
    deletedInterviews,
    setDeletedInterviews,
    isMounted,
    searchedInterview,
    search,
    readInterviews,
    setReadInterviews,
    allInterviews,
    setAllInterviews,
    updateFlag,
    wishListedInterviews,
    setWishListedInterviews,
  } = useInterviewContext();

  const [filter, setFilter] = useState("all");


  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await axios.get('/invitation/getnonexpiredinvitations');
        const data = response.data;
        setInterviews(data);
        setAllInterviews(data);
        console.log(data);

      } catch (error) {
        console.log('Error fetching Interviews :', error);
      }
    }
    fetchInterviews();

    // Load deleted interviews from localStorage
    const storedDeletedInterviews = window.localStorage.getItem('deletedInterviews')
    if (storedDeletedInterviews !== null) setDeletedInterviews(JSON.parse(storedDeletedInterviews));
    console.log('initial deletedArray', deletedInterviews);

    const storedReadInterviews = window.localStorage.getItem('readInterviews')
    if (storedReadInterviews !== null) setReadInterviews(JSON.parse(storedReadInterviews));

    const storedwishListedInterviews = window.localStorage.getItem('wishListedInterviews')
    if (storedwishListedInterviews !== null) setWishListedInterviews(JSON.parse(storedwishListedInterviews));

    console.log(updateFlag);

  }, [updateFlag]);

  useEffect(() => {
    if (isMounted.current) {
      window.localStorage.setItem('deletedInterviews', JSON.stringify(deletedInterviews));
      window.localStorage.setItem('readInterviews', JSON.stringify(readInterviews));
      window.localStorage.setItem('wishListedInterviews', JSON.stringify(wishListedInterviews));
    } else {
      isMounted.current = true;
    }
    console.log('localStorage updated with new delete item', deletedInterviews);
  }, [deletedInterviews, readInterviews, wishListedInterviews]);

  const filteredInterviews = interviews.filter((interview) => !deletedInterviews.includes(interview._id));
  console.log('fileteredInterviews', filteredInterviews);

  const sortItems = (items, readItems) => {
    return items.slice().sort((a, b) => {
      if (readItems.includes(a._id) && !readItems.includes(b._id)) {
        return -1;
      }
      if (!readItems.includes(a._id) && readItems.includes(b._id)) {
        return 1;
      }
      return 0;
    });
  };

  const sortedInterviews = sortItems(filteredInterviews, readInterviews);

  const getFilteredInterviews = () => {
    switch (filter) {
      case 'viewed':
        return filteredInterviews.filter((interview) => readInterviews.includes(interview._id));
      case 'deleted':
        return allInterviews.filter((interview) => deletedInterviews.includes(interview._id));
      case 'new':
        return filteredInterviews.filter((interview) => !readInterviews.includes(interview._id));
      case 'all':
      default:
        return sortedInterviews;
    }
  };


  return (
    <div className='flex flex-col items-center justify-around w-full h-full bg-neutral-800'>
  
      <div className='flex items-center justify-center w-11/12 bg-neutral-800 height-10'>
        <SearchBar filteredInterviews={filteredInterviews} />
      </div>
  
      <div className='flex flex-col w-full h-5/6 items-center justify-center overflow-y-auto rounded-xl mb-5'>
        <div className='bg-neutral-800 w-11/12 h-[60px] divide-x divide-neutral-400 border border-neutral-600 rounded-t-2xl '>
          <button
            onClick={() => setFilter('new')}
            className={`hover:bg-neutral-700 h-full font-bold text-lg w-1/4 px-4 py-2 rounded-tl-2xl ${filter === 'new' ? 'bg-neutral-500 text-white' : 'bg-neutral-800'}`}
          >New</button>
          
          <button
            onClick={() => setFilter('all')}
            className={`hover:bg-neutral-700 h-full font-bold text-lg w-1/4 px-4 py-2 ${filter === 'all' ? 'bg-neutral-500  backdrop-opacity-10 text-white' : 'bg-neutral-800'}`}
          >All</button>
  
          <button
            onClick={() => setFilter('viewed')}
            className={`hover:bg-neutral-700 h-full font-bold text-lg w-1/4 px-4 py-2 ${filter === 'viewed' ? 'bg-neutral-500 text-white' : 'bg-neutral-800'}`}
          >Viewed</button>
  
          <button
            onClick={() => setFilter('deleted')}
            className={`hover:bg-neutral-700 h-full font-bold text-lg w-1/4 px-4 py-2 rounded-tr-2xl ${filter === 'deleted' ? 'bg-neutral-500 text-white' : 'bg-neutral-800'}`}
          >Deleted</button>
        </div>
  
        <div className='items-center w-11/12 overflow-auto overflow-x-hidden divide-y listContainer h-5/6 border border-neutral-600 divide-neutral-800 rounded-b-2xl'>
          {(search ? searchedInterview : getFilteredInterviews()).map((interview) => {
            const isRead = readInterviews.includes(interview._id);
            const isWishListed = wishListedInterviews.includes(interview._id);
            return (
              <Interview key={interview._id} isRead={isRead} interview={interview} isWishListed={isWishListed}/>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Invitation
