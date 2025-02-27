'use client';

import { useState, useRef, useEffect } from 'react';

export default function SupportChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hi there! How can I help you with the Waste Management System today?", 
      sender: 'bot' 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to the bottom of the chat when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Focus the input field when the chat is opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle sending a new message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;
    
    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      text: inputValue.trim(),
      sender: 'user'
    };
    
    setMessages([...messages, newUserMessage]);
    setInputValue('');
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      let botResponse;
      const userInput = inputValue.toLowerCase();
      
      if (userInput.includes('login') || userInput.includes('sign in')) {
        botResponse = "To log in, click on the 'Sign In' button in the top right corner of the page. You'll need your email and password. If you're having trouble, try the 'Forgot Password' option.";
      } else if (userInput.includes('schedule') || userInput.includes('pickup')) {
        botResponse = "Businesses can schedule waste pickups from their dashboard. Once logged in, navigate to the 'Schedule Pickup' section and follow the prompts.";
      } else if (userInput.includes('track') || userInput.includes('status')) {
        botResponse = "You can track the status of your waste pickups from your dashboard. Look for the 'Tracking' or 'History' section to see details about past and upcoming pickups.";
      } else if (userInput.includes('report') || userInput.includes('compliance')) {
        botResponse = "Compliance reports can be generated and viewed in the 'Reports' section of your dashboard. Government users have access to all reports, while businesses and providers see their respective data.";
      } else if (userInput.includes('account') || userInput.includes('profile')) {
        botResponse = "You can manage your account settings by clicking on your profile icon in the top right corner after logging in. From there, you can update your personal information, change passwords, and manage notification preferences.";
      } else if (userInput.includes('goa') || userInput.includes('coverage') || userInput.includes('area')) {
        botResponse = "We currently provide waste management services throughout Goa, including both North and South Goa districts. Our network of providers ensures comprehensive coverage across the state.";
      } else {
        botResponse = "Thanks for your question. Our support team will get back to you shortly. For immediate assistance, please call us at +1 (555) 123-4567 or email support@wastems.com.";
      }
      
      const newBotMessage = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot'
      };
      
      setMessages(prev => [...prev, newBotMessage]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary-600 hover:bg-primary-700 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg transition-all duration-200"
        aria-label="Support Chat"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 sm:w-96 bg-white rounded-lg shadow-xl overflow-hidden flex flex-col max-h-[500px] border border-gray-200">
          {/* Header */}
          <div className="bg-primary-600 text-white p-4">
            <h3 className="text-lg font-semibold">Tech Support</h3>
            <p className="text-xs text-primary-100">We're here to help!</p>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-80">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] px-4 py-2 rounded-lg ${
                    message.sender === 'user' 
                      ? 'bg-primary-600 text-white rounded-tr-none' 
                      : 'bg-gray-100 text-gray-800 rounded-tl-none'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input form */}
          <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4">
            <div className="flex">
              <input
                type="text"
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your question here..."
                className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-r-lg transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}