import React from 'react'
import useConversation from "../../../zustand/useConversation";
import useGetConversations from "../../../hooks/useGetConversations";
import { useState } from 'react';
import toast from 'react-hot-toast';
import { MdClear } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";

const SearchInput = () => {
	const [search, setSearch] = useState("");
	const [searched, setSearched] = useState(false);
	const { setSelectedConversation, setInputselected } = useConversation();
	const { conversations } = useGetConversations();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!search) return;

		if (search.length < 3) {
			return toast.error("Search term must be at least 3 characters long");
		}

		const conversation = conversations.find((conversation) => conversation.fname.toLowerCase().includes(search.toLowerCase()));

		if (conversation) {
			setInputselected(conversation);
			setSearched(true);
		} else {
			toast.error("No such user found!");
			setSearched(false);
		}
	};

	const handleClear = () => {
		// Clear the search input and reset the selected conversation
		setSearch('');
		setInputselected(null);
		setSearched(false);
	};


	return (
		<form className='flex items-center gap-5' onSubmit={handleSubmit} >
			<div className='flex justify-around items-center w-full relative'>
				<input
					type='text'
					placeholder='       Search…'
					className='input input-bordered rounded-full bg-[#aa7049a1]'
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				 <IoSearchSharp className='absolute left-9 text-gray-400 top-4 w-6 h-5' />
				<button type='submit' className='btn btn-circle bg-[#E77327] text-white'>
					<IoSearchSharp className='w-6 h-6 outline-none' />
				</button>
			</div>

			{searched && search && (
				<button type='button' className='btn btn-circle bg-[#E77327] text-white' onClick={handleClear}>
					<MdClear className='w-6 h-6 outline-none' />
				</button>
			)}

		</form>
	)
}

export default SearchInput
