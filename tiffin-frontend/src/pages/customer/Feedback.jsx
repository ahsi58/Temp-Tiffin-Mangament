import { useState } from "react";
import { toast } from "react-hot-toast";
import feedbackService from "../../services/feedbackService";
import DashboardLayout from "../../components/layout/DashboardLayout";
import "./Feedback.css";

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please select a rating.");
      return;
    }

    if (comment.trim() === "") {
      toast.error("Please enter your feedback.");
      return;
    }

    try {
      setLoading(true);

      await feedbackService.submitFeedback({
        rating,
        comment,
      });

      toast.success("🎉 Feedback submitted successfully!");

      setRating(0);
      setHover(0);
      setComment("");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Failed to submit feedback.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
    <div className="feedback-container">
      <div className="feedback-card">
        <h2>Give Your Feedback</h2>

        <form onSubmit={handleSubmit}>
          <div className="rating-section">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className="star"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
              >
                {star <= (hover || rating) ? "★" : "☆"}
              </span>
            ))}
          </div>

          <textarea
            id="feedbackComment"
            name="feedbackComment"
            rows="5"
            placeholder="Write your feedback..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>
      </div>
    </div>
    </DashboardLayout>
  );
};

export default Feedback;
