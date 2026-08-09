import api from "../api/Axios";

const FEEDBACK_BASE_URL = "/feedback";

const feedbackService = {

    // Customer - Submit Feedback
    submitFeedback: async (feedbackData) => {
        const response = await api.post(FEEDBACK_BASE_URL, feedbackData);
        return response.data;
    },

    // Customer - View My Feedback
    getMyFeedback: async () => {
        const response = await api.get(`${FEEDBACK_BASE_URL}/my-feedback`);
        return response.data;
    },

    // Vendor - View All Feedback
    getAllFeedback: async () => {
        const response = await api.get(FEEDBACK_BASE_URL);
        return response.data;
    }

};

export default feedbackService;