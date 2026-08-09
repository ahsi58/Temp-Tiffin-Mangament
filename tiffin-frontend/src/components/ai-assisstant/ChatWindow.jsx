import { useState } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

function ChatWindow({ onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      message:
        "Hi! 👋 I'm your Tiffin Assistant. How can I help you today?",
    },
  ]);

  const addMessage = (sender, message) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        sender,
        message,
      },
    ]);
  };

  return (
    <div
      className="
        fixed bottom-24 right-6 z-50
        flex h-[500px] w-[360px]
        max-w-[calc(100vw-2rem)]
        flex-col
        overflow-hidden
        rounded-2xl
        bg-white
        shadow-2xl
        ring-1 ring-gray-200
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between bg-orange-500 px-4 py-3 text-white">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
            <span className="text-lg">🤖</span>
          </div>

          <div>
            <h2 className="text-sm font-semibold">Tiffin Assistant</h2>

            <p className="text-xs text-orange-100">
              Ask me anything about your tiffin
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="rounded-full p-1 transition hover:bg-white/20"
          aria-label="Close chat"
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-gray-50 px-4 py-4">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            sender={message.sender}
            message={message.message}
          />
        ))}
      </div>

      {/* Input */}
      <ChatInput onMessage={addMessage} />
    </div>
  );
}

export default ChatWindow;