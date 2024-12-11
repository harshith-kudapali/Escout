// components/ChatToggle.js
import { useState } from "react";
import { BsChat } from "react-icons/bs"; // Import icon for chat toggle

const ChatToggle = () => {
  const [isChatOpen, setIsChatOpen] = useState(false); // State for chatroom visibility

  const toggleChatRoom = () => {
    setIsChatOpen(!isChatOpen); // Toggle chatroom visibility
  };

  return (
    <div>
      {/* Chat Toggle Button */}
      <button
        onClick={toggleChatRoom}
        className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 z-50"
      >
        <BsChat size={24} />
      </button>

      {/* Chat Room */}
      {isChatOpen && (
        <div className="fixed bottom-20 right-6 z-40 bg-white p-2 rounded-lg shadow-lg max-w-[350px] w-[100%] h-[400px]">
          <iframe
            src="https://chitchatter.im/public/0da93a4e-0c2c-483c-9b63-c7567f6c0eb2?embed=1"
            allow="camera;microphone;display-capture;fullscreen"
            width="100%"
            height="100%"
            className="rounded-lg shadow-lg border-2 border-blue-500"
          />
        </div>
      )}
    </div>
  );
};

export default ChatToggle;
