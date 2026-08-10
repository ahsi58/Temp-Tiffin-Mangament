import api from "./axios";

export const sendMessageToAI = async (message) => {
  const response = await api.post("/ai/chat", {
    message,
  });

  return response.data.reply;
};