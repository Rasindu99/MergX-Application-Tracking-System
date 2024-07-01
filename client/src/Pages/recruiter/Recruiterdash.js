import React, { useState, useEffect } from 'react';
import CardL from '../../Components/recruitercomp/CardL';
import CardS from '../../Components/recruitercomp/CardS';
import { FaSearch } from 'react-icons/fa';

export default function Recruiterdash() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCandidates, setFilteredCandidates] = useState([]);

  const candidates = [
    { name: "Tharindu Dilshan", email: "dilshantharindu8@gmail.com", date: "07/12/2023" },
    { name: "Nimasha Buddhini", email: "nimasha123456@gmail.com", date: "06/12/2023" },
    { name: "Pawan Chamara", email: "Pawan2345@gmail.com", date: "04/12/2023" },
    { name: "Pawan Chamara", email: "Pawan2345@gmail.com", date: "04/12/2023" },
    { name: "Pawan Chamara", email: "Pawan2345@gmail.com", date: "04/12/2023" },
    { name: "Pawan Chamara", email: "Pawan2345@gmail.com", date: "04/12/2023" },
    { name: "Pawan Chamara", email: "Pawan2345@gmail.com", date: "04/12/2023" },
    { name: "Pawan Chamara", email: "Pawan2345@gmail.com", date: "04/12/2023" },

    // Add more candidates as needed
  ];

  useEffect(() => {
    setFilteredCandidates(
      candidates.filter(candidate =>
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  return (
    <div className="flex items-center justify-center">
      <div className="rounded-3xl w-[95%] h-full mt-2" style={{ background: 'linear-gradient(to bottom, #2B2B2B 0%, rgba(43, 43, 43, 0) 35%)' }}>
        <div className="flex items-center justify-around mt-5">
          <CardL title="Candidates" value="10" />
          <CardL title="Applications" value="10" />
          <CardL title="Feedbacks" value="10" />
          <CardL title="Unread" value="02" />
        </div>
        <div className="flex items-center justify-around mt-8">
          <CardS title="Jobs" value="10" />
          <CardS title="Job Invitaions" value="10" />
          <CardS title="Status Updates" value="10" />
          <CardS title="New Applications" value="02" />
          <CardS title="New Feedbacks" value="02" />
          <CardS title="New Candidates" value="02" />
        </div>

        <style>
      {`
        .scrollbar-hidden::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hidden {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE and Edge */
        }
      `}
    </style>

        <div className="flex flex-col items-center mt-20">
        <div className="w-[60%] flex items-center justify-center mb-4 p-4 rounded-2xl border-2 border-[#2B2B2B]" style={{ background: 'linear-gradient(to bottom, #2B2B2B 0%, rgba(43, 43, 43, 0) 80%)' }} >  
          <input
            type="text"
            placeholder="Search Candidate's Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent focus:outline-none text-white opacity-25 w-full"
          />
          <FaSearch className="text-gray-500 ml-2" />
        </div>
        <div className="w-[75%] max-h-[250px] overflow-y-auto scrollbar-hidden">
          {filteredCandidates.map((candidate, index) => (
            <div key={index} className="flex items-center justify-between p-4 mb-2 rounded border-x-2 border-[#2B2B2B]" style={{ background: 'linear-gradient(to bottom, #2B2B2B 0%, rgba(43, 43, 43, 0) 60%)' }}>
              <div className='items-center block '>
                <img src={candidate.image} alt='' className='rounded-full border-[2px] w-[50px] h-[50px]' />
              </div>
              <div>
                <p className="text-lg font-bold">{candidate.name}</p>
                <p className="text-sm text-white opacity-25">CANDIDATE</p>
              </div>
              <div>
                <p className="text-sm">{candidate.email}</p>
              </div>
              <div>
                <p className="text-sm text-white opacity-25">{candidate.date}</p>
              </div>
            </div>
          ))}
          {filteredCandidates.length === 0 && (
            <p className="text-gray-500 text-center mt-4">No candidates found</p>
          )}
        </div>

        </div>
        </div>

    </div>
  );
}
