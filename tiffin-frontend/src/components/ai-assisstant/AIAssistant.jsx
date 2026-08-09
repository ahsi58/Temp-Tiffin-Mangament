import { useState } from "react";
import { Bot, X } from "lucide-react";
import ChatWindow from "./ChatWindow";

function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="
          fixed bottom-6 right-6 z-50
          flex h-14 w-14 items-center justify-center
          rounded-full
          bg-orange-500
          text-white
          shadow-lg
          transition-all duration-200
          hover:scale-105 hover:bg-orange-600
          focus:outline-none focus:ring-2
          focus:ring-orange-400 focus:ring-offset-2
        "
        aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
      >
        {isOpen ? <X size={24} /> : <Bot size={26} />}
      </button>
    </>
  );
}

export default AIAssistant;