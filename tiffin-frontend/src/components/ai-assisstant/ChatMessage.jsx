function ChatMessage({ sender, message }) {
  const isUser = sender === "user";

  return (
    <div
      className={`mb-3 flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`
          max-w-[80%]
          rounded-2xl
          px-4 py-2.5
          text-sm
          ${
            isUser
              ? "rounded-br-md bg-orange-500 text-white"
              : "rounded-bl-md bg-white text-gray-800 shadow-sm ring-1 ring-gray-100"
          }
        `}
      >
        {message}
      </div>
    </div>
  );
}

export default ChatMessage;