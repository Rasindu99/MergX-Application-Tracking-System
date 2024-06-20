import React from 'react';
import ChatSidebar from '../sidebar/ChatSidebar';
import MessageContainer from '../messages/MessageContainer';

const Home = () => {
  return (
    <div className='flex h-full w-full rounded-3xl bg-cover bg-center bg-opacity-50 overflow-hidden '>
      <ChatSidebar />
      <MessageContainer />
    </div>
  )
}

export default Home
