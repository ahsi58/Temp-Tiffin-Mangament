import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import feedbackService from "../../services/feedbackService";
import DashboardLayout from "../../components/layout/DashboardLayout";
import "./FeedbackList.css";

const FeedbackList = () => {
  console.count("FeedbackList Render");

  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeedbacks();
  }, []);

  const loadFeedbacks = async () => {
    console.count("Loading API");
    try {
      const response = await feedbackService.getAllFeedback();

      setFeedbacks(response.data);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load feedback.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="feedback-page">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <DashboardLayout>
    <div className="feedback-page">
      <h1>Customer Feedback</h1>

      {feedbacks.length === 0 ? (
        <p>No feedback available.</p>
      ) : (
        <div className="feedback-grid">
          {feedbacks.map((feedback) => (
            <div className="feedback-card" key={feedback.id}>
              <div className="feedback-rating">
                {"★".repeat(feedback.rating)}
                {"☆".repeat(5 - feedback.rating)}
              </div>

              <p className="feedback-comment">{feedback.comment}</p>

              <div className="feedback-footer">
                <span>{feedback.customerEmail}</span>

                <span>{new Date(feedback.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </DashboardLayout>
  );
};

export default FeedbackList;
