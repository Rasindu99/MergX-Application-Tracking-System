import { createContext, useState, useContext, useRef } from 'react';

export const InterviewContext = createContext();

export const useInterviewContext = () => {
  return useContext(InterviewContext);
}

export const InterviewContextProvider = ({ children }) => {

  const [interviews, setInterviews] = useState([]);
  const [deletedInterviews, setDeletedInterviews] = useState([]);
  const isMounted = useRef(false);
  const [searchedInterview, setSearchedInterview] = useState([]);
  const [searchInput, setSearchInput] = useState([]);
  const [search, setSearch] = useState(false);
  const[readInterviews, setReadInterviews] = useState([]);
  const [updateFlag, setUpdateFlag] = useState(false); // Flag for triggering updates
  const [allInterviews, setAllInterviews] = useState([]);
  const [wishListedInterviews, setWishListedInterviews] = useState([]);

  const [localStatusData, setLocalStatusData] = useState([]);
  const [localAnouncementData, setLocalAnouncementData] = useState([]);
  const [localReadAnnouncementData, setLocalReadAnnouncementData] = useState([]);

  const triggerUpdate = () => {
    setUpdateFlag(prev => !prev); // Toggle the flag to trigger an update
  };

  return (
    <InterviewContext.Provider value=
      {{
        interviews,
        setInterviews,
        deletedInterviews,
        setDeletedInterviews,
        isMounted,
        searchedInterview,
        setSearchedInterview,
        searchInput,
        setSearchInput,
        search,
        setSearch,
        updateFlag,
        readInterviews,
        setReadInterviews,
        allInterviews,
        setAllInterviews,
        triggerUpdate,
        localStatusData, 
        setLocalStatusData,
        localAnouncementData, 
        setLocalAnouncementData,
        localReadAnnouncementData,
        setLocalReadAnnouncementData,
        wishListedInterviews, 
        setWishListedInterviews
      }}
    >
      {children}
    </InterviewContext.Provider>
  )
}