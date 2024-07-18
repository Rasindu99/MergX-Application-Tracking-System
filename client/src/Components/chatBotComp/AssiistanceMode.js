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
      case 'How I change my details?':
        return 'Move to Edit profile';
      case 'How I find job interview invitations?':
        return 'Move to interview invitation section.';
      case 'How I apply job interview invitation?':
        return 'Move to interview invitation section. After that choose job invitation and click add wishlist. Now move to Submit application section and upload your CV.';
      case 'I want contact Admin':
        return 'Send mail - dilshantharindu120@gmail.com';
      case 'How are you?':
        return "I'm functioning well, thank you for asking. How can I assist you today?";
      case 'What is your name?':
        return "I'm an AI assistant created to help users with their queries. I don't have a personal name.";
      case 'Are you an AI language model?':
        return "Yes, I am an AI language model designed to assist with various queries and tasks.";
      default:
        return 'I do not understand the query. Could you please rephrase or ask something else?';
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
                  <img src={user.image} alt='user' className="w-10 h-10 rounded-full" />
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
            onClick={() => handleButtonClick('How I change my details?')}
            className="px-4 py-2 mr-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            How I change my details?
          </button>
        </div>
        <div className='pt-2'>
          <button
            onClick={() => handleButtonClick('How I find job interview invitations?')}
            className="px-4 py-2 mr-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            How I find job interview invitations?
          </button>
        </div>
        <div className='pt-2'>
          <button
            onClick={() => handleButtonClick('How I apply job interview invitation?')}
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            How I apply job interview invitation?
          </button>
        </div>
        <div className='pt-2'>
          <button
            onClick={() => handleButtonClick('I want contact Admin')}
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            I want contact Admin
          </button>
        </div>
      </div>
    </div>
  );
}