import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function Chatbot() {
  const [message, setMessage] = useState(""); // User's input message
  const [conversation, setConversation] = useState([]); // Conversation history
  const [isOpen, setIsOpen] = useState(false); // Whether chatbox is open or closed

  // Refs for the chat container and button
  const chatboxRef = useRef(null);

  // Toggle the chatbox visibility
  const toggleChatbox = () => {
    setIsOpen(!isOpen);
  };

  // Close chatbox if clicked outside
  const handleClickOutside = (event) => {
    if (chatboxRef.current && !chatboxRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // Add a message from the user
  const addUserMessage = (text) => {
    setConversation((prev) => [...prev, { sender: "user", text }]);
  };

  // Add a message from the bot
  const addBotMessage = (text) => {
    setConversation((prev) => [...prev, { sender: "bot", text }]);
  };

  // Scroll to the bottom of the chat container
  const scrollToBottom = () => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  };

  // Automatically scroll to the bottom when conversation changes
  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  // Add event listener for clicks outside
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Send the user's message to the backend and handle the response
  const sendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === "") return;

    addUserMessage(message);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:5000/api/chat", { userMessage: message });
      addBotMessage(response.data.reply);
      scrollToBottom();

    } catch (error) {
      console.error("Error:", error);
      addBotMessage("Sorry, I couldn't process your request.");
      scrollToBottom();

    }
  };

  return (
    <div>
      {/* Chatbot Button */}
      <button
        className="fixed bottom-4 right-4 inline-flex items-center justify-center text-sm font-medium disabled:pointer-events-none disabled:opacity-50 border rounded-full w-16 h-16 bg-black hover:bg-gray-700 m-0 cursor-pointer border-gray-200 p-0 normal-case leading-5 hover:text-gray-900"
        onClick={toggleChatbox}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white block align-middle"
        >
          <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"></path>
        </svg>
      </button>

      {/* Chatbox */}
      {isOpen && (
        <div
          style={{ boxShadow: "0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05)" }}
          className="fixed bottom-[calc(4rem+1.5rem)] right-0 mr-4 bg-white p-6 rounded-lg border border-[#e5e7eb] w-full max-w-[440px] h-[80%] md:h-[600px] z-[1200]"
          ref={chatboxRef} // Attach ref to the chat container
        >
          {/* Heading */}
          <div className="flex flex-col space-y-1.5 pb-6">
            <h2 className="font-semibold text-lg tracking-tight">Chatbot</h2>
          </div>

          {/* Chat Conversation */}
          <div className="pr-4 h-[calc(100%-120px)] overflow-y-auto">
            {conversation.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-3 my-4 text-gray-600 text-sm flex-1 ${
                  msg.sender === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                  <div className="rounded-full bg-gray-100 border p-1">
                    {msg.sender === "user" ? (
                      <svg
                        stroke="none"
                        fill="black"
                        strokeWidth="0"
                        viewBox="0 0 16 16"
                        height="20"
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"></path>
                      </svg>
                    ) : (
                      <svg
                        stroke="none"
                        fill="black"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        height="20"
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                        ></path>
                      </svg>
                    )}
                  </div>
                </span>
                <p className="leading-relaxed">
                  <span className="block font-bold text-gray-700">{msg.sender === "user" ? "You" : "AI"} </span>
                  {msg.text}
                </p>
              </div>
            ))}
          </div>

          {/* Input Field */}
          <div className="flex items-center pt-0">
            <form onSubmit={sendMessage} className="flex items-center justify-center w-full space-x-2">
              <input
                className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
                placeholder="Type your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-black hover:bg-[#111827E6] h-10 px-4 py-2"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
