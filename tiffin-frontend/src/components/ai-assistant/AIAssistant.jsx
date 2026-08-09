import { useState } from "react";
import { Bot, MessageCircle, Send, X } from "lucide-react";

function AIAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");

    const handleSend = (event) => {
        event.preventDefault();

        if (!message.trim()) {
            return;
        }

        // API integration will be added in the next step.
        setMessage("");
    };

    return (
        <div className="fixed bottom-5 right-5 z-50">
            {isOpen && (
                <div className="mb-4 flex h-[520px] w-[360px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
                    <div className="flex items-center justify-between bg-orange-500 px-4 py-3 text-white">
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                                <Bot size={21} />
                            </div>
                            <div>
                                <h2 className="text-sm font-semibold text-white">Tiffin Assistant</h2>
                                <p className="text-xs text-orange-100">Ask me about your tiffin service</p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="rounded-full p-2 transition hover:bg-white/15"
                            aria-label="Close AI assistant"
                        >
                            <X size={19} />
                        </button>
                    </div>

                    <div className="flex flex-1 flex-col overflow-y-auto bg-gray-50 p-4">
                        <div className="flex items-start gap-2">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                                <Bot size={17} />
                            </div>
                            <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-white px-3 py-2 text-sm text-gray-700 shadow-sm">
                                Hi! I&apos;m your Tiffin Assistant. How can I help you today?
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSend} className="border-t border-gray-200 bg-white p-3">
                        <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100">
                            <input
                                type="text"
                                value={message}
                                onChange={(event) => setMessage(event.target.value)}
                                placeholder="Ask me something..."
                                className="min-w-0 flex-1 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
                                aria-label="Message the AI assistant"
                            />
                            <button
                                type="submit"
                                disabled={!message.trim()}
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-500 text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-40"
                                aria-label="Send message"
                            >
                                <Send size={17} />
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <button
                type="button"
                onClick={() => setIsOpen((open) => !open)}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg transition hover:scale-105 hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-200"
                aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={25} />}
            </button>
        </div>
    );
}

export default AIAssistant;
