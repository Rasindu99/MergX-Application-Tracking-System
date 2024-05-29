import React, { useContext, useState } from 'react';
import ChatBotImage from '../../Images/ChatBot.png';
import { UserContext } from '../../Context/UserContext';

export default function AssistanceMode() {
  const [messages, setMessages] = useState([]);
  const { user } = useContext(UserContext);

  const handleButtonClick = (userInput) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'user', text: userInput },
      { sender: 'assistant', text: getAssistantResponse(userInput) },
    ]);
  };

  const getAssistantResponse = (userInput) => {
    switch (userInput) {
      case 'How are you?':
        return 'I am fine';
      case 'What is your name?':
        return 'Chatty';
      case 'Are you an AI language model?':
        return 'Yes, I am an AI language model';
      default:
        return 'I do not understand the query.';
    }
  };

  return (
    <div className="max-w-lg p-5 mx-auto ">
      
        <div className="flex items-center mb-2">
          <div>
            <img src={ChatBotImage} alt="chatbot" className="w-10 h-10" />
          </div>
          <div className="flex px-4 my-auto ml-2 bg-gray-700 rounded-sm">
            <h1>I am your assistant. How can I assist you?</h1>
          </div>
        </div>
        <div className="text-left">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              } mb-2`}
            >
              {message.sender === 'user' ? (
                <div className='flex'>
                  <div className="px-4 py-2 ml-2 bg-blue-500 rounded-sm">
                    <h1 className="text-white">{message.text}</h1>
                  </div> 
                  <div className='ml-2'>
                    <img src={user.image} alt='user' className="w-10 h-10 rounded-full"></img>  
                  </div>
                </div>
                
              ) : (
                <div className="flex items-center">
                  <img
                    src={ChatBotImage}
                    alt="chatbot"
                    className="w-10 h-10"
                  />
                  <div className="px-4 py-2 ml-2 bg-gray-700 rounded-sm">
                    <h1 className="text-white">{message.text}</h1>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 ml-6 text-left">
          <div className='pt-2'>
          <button
            onClick={() => handleButtonClick('How are you?')}
            className="px-4 py-2 mr-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            How are you?
          </button>
          </div>
          
          <div className='pt-2'>
          <button
            onClick={() => handleButtonClick('What is your name?')}
            className="px-4 py-2 mr-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            What is your name?
          </button>
          </div>
          
          <div className='pt-2'>
          <button
            onClick={() => handleButtonClick('Are you an AI language model?')}
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            Are you an AI language model?
          </button>
          </div>

        </div>
      
    </div>
  );
}