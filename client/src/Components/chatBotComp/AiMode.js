import React, { useContext, useState } from 'react';
import { IoSend } from 'react-icons/io5';
import axios from 'axios';
import ChatBotImage from '../../Images/ChatBot.png';
import { UserContext } from '../../Context/UserContext';

export default function AiMode() {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);

  async function generateAnswer() {
    // Add user's message to the messages list
    const newMessage = { sender: 'user', text: inputText };
    setMessages([...messages, newMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('/chatbot/chatbot', { inputText });
      const aiResponse = response.data.aiResponse;
      const newAiMessage = { sender: 'assistant', text: aiResponse };

      // Append the assistant's reply to the messages array
      setMessages([...messages, newMessage, newAiMessage]);
    } catch (error) {
      setError('Error generating answer. Please try again later.');
      console.error('Error generating answer:', error);
    } finally {
      setIsLoading(false);
      setInputText(''); // Clear input after sending
    }
  }

  return (
    <div>
      <div className="max-w-lg p-5 overflow-y-scroll h-[510px] resize-y">
        
        <div className="pt-2   max-h-[510px] ">
          <div className="text-left">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                } mb-2`}
              >
                {message.sender === 'user' ? (
                  <div className="flex ">
                    <div className="px-4 py-2 ml-2 bg-blue-500 rounded-sm">
                      <h1 className="text-white">{message.text}</h1>
                    </div>
                    <div className="ml-2">
                      <img
                        src={user.image}
                        alt="user"
                        className="w-10 h-10 rounded-full"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex ">
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
            <div>
            {isLoading && 
            <div className='flex '> 
                <div>
                    <img
                     src={ChatBotImage}
                     alt="chatbot"
                     className="w-10 h-10"
                    /> 
                </div> 
                <div className='my-auto ml-2'>
                  <p>Thinking...</p>
                </div>  
              </div> }
            </div>
            
            
            {error && <p>{error}</p>}
          </div>
        </div>
        
        <form>
        <div className=''>
          <div className="fixed bottom-2 right-2 left-2">
            <div className="flex justify-center">
              <input type='text'
                placeholder="Enter your text"
                className="w-[450px] h-12 mx-1 bg-white rounded-lg bg-opacity-10"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <button
                type='submit'
                className="h-10 bg-orange-600 w-[60px] rounded-xl mx-2 flex items-center justify-center my-auto"
                onClick={generateAnswer}
                disabled={isLoading}
              >
                <IoSend className="size-6" />
              </button>
            </div>
          </div>
        </div>
        </form>
        
        
      </div>
    </div>
  );
}