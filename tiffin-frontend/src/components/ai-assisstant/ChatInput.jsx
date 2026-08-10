import { useState } from "react";
import { Send } from "lucide-react";
import { sendMessageToAI } from "../../api/aiApi";

function ChatInput({ onMessage }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || loading) {
      return;
    }

    // Show user message immediately
    onMessage("user", trimmedMessage);

    setMessage("");
    setLoading(true);

    try {
      const reply = await sendMessageToAI(trimmedMessage);

      onMessage("ai", reply);
    } catch (error) {
      console.error("AI Assistant Error:", error);

      onMessage(
        "ai",
        "Sorry, I couldn't process your request right now. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 border-t border-gray-200 bg-white p-3"
    >
      <input
        type="text"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder={loading ? "Thinking..." : "Ask something..."}
        disabled={loading}
        className="
          min-w-0 flex-1
          rounded-full
          border border-gray-300
          px-4 py-2.5
          text-sm
          text-gray-800
          outline-none
          transition
          focus:border-orange-500
          focus:ring-2
          focus:ring-orange-100
          disabled:bg-gray-100
        "
      />

      <button
        type="submit"
        disabled={!message.trim() || loading}
        className="
          flex h-10 w-10 shrink-0
          items-center justify-center
          rounded-full
          bg-orange-500
          text-white
          transition
          hover:bg-orange-600
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
        aria-label="Send message"
      >
        {loading ? (
          <div
            className="
              h-4 w-4
              animate-spin
              rounded-full
              border-2
              border-white
              border-t-transparent
            "
          />
        ) : (
          <Send size={17} />
        )}
      </button>
    </form>
  );
}

export default ChatInput;