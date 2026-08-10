import { useState } from "react";
import { toast } from "react-hot-toast";
import { MessageSquare, Send, Star } from "lucide-react";
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
        <div className="feedback-header">
          <div>
            <p className="feedback-eyebrow">YOUR VOICE MATTERS</p>

            <h1>Share Your Experience</h1>

            <p>
              Tell us how your tiffin experience was. Your feedback helps us
              serve you better.
            </p>
          </div>

          <div className="feedback-header-icon">
            <MessageSquare size={28} />
          </div>
        </div>

        <div className="feedback-form-card">
          <div className="feedback-form-intro">
            <div className="feedback-icon-circle">
              <Star size={22} fill="currentColor" />
            </div>

            <div>
              <h2>How was your experience?</h2>

              <p>Rate your experience from 1 to 5 stars.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="rating-section" aria-label="Rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  className={`rating-star ${
                    star <= (hover || rating) ? "selected" : ""
                  }`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  aria-label={`${star} star${star > 1 ? "s" : ""}`}
                >
                  <Star
                    size={38}
                    fill={
                      star <= (hover || rating) ? "currentColor" : "none"
                    }
                  />
                </button>
              ))}
            </div>

            <div className="rating-label">
              {rating === 0
                ? "Select a rating"
                : `${rating} out of 5 stars selected`}
            </div>

            <div className="feedback-field">
              <label htmlFor="feedbackComment">
                Your Feedback
              </label>

              <textarea
                id="feedbackComment"
                name="feedbackComment"
                rows="6"
                maxLength="1000"
                placeholder="What did you like? What could we improve?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />

              <span className="character-count">
                {comment.length}/1000
              </span>
            </div>

            <button
              className="submit-feedback-button"
              type="submit"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Feedback"}

              {!loading && <Send size={18} />}
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Feedback;