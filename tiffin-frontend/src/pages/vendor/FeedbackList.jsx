import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MessageSquare, Star, Users, TrendingUp } from "lucide-react";
import feedbackService from "../../services/feedbackService";
import DashboardLayout from "../../components/layout/DashboardLayout";
import "./FeedbackList.css";

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeedbacks();
  }, []);

  const loadFeedbacks = async () => {
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

  const averageRating =
    feedbacks.length > 0
      ? (
          feedbacks.reduce(
            (total, feedback) => total + feedback.rating,
            0,
          ) / feedbacks.length
        ).toFixed(1)
      : "0.0";

  const fiveStarCount = feedbacks.filter(
    (feedback) => feedback.rating === 5,
  ).length;

  const fourAndFiveStarCount = feedbacks.filter(
    (feedback) => feedback.rating >= 4,
  ).length;

  return (
    <DashboardLayout>
      <div className="feedback-page">
        <div className="feedback-page-header">
          <div>
            <p className="feedback-eyebrow">CUSTOMER EXPERIENCE</p>

            <h1>Customer Feedback</h1>

            <p>
              See what your customers are saying and understand their
              experience.
            </p>
          </div>

          <div className="feedback-header-icon">
            <MessageSquare size={28} />
          </div>
        </div>

        {loading ? (
          <div className="feedback-loading">
            <div className="feedback-loading-spinner"></div>
            <p>Loading customer feedback...</p>
          </div>
        ) : (
          <>
            <div className="feedback-stats">
              <div className="feedback-stat-card">
                <div className="feedback-stat-icon orange">
                  <Star size={21} fill="currentColor" />
                </div>

                <div>
                  <span>Average Rating</span>
                  <strong>{averageRating}/5</strong>
                </div>
              </div>

              <div className="feedback-stat-card">
                <div className="feedback-stat-icon blue">
                  <Users size={21} />
                </div>

                <div>
                  <span>Total Reviews</span>
                  <strong>{feedbacks.length}</strong>
                </div>
              </div>

              <div className="feedback-stat-card">
                <div className="feedback-stat-icon green">
                  <TrendingUp size={21} />
                </div>

                <div>
                  <span>4 & 5 Star Reviews</span>
                  <strong>{fourAndFiveStarCount}</strong>
                </div>
              </div>

              <div className="feedback-stat-card">
                <div className="feedback-stat-icon yellow">
                  <Star size={21} fill="currentColor" />
                </div>

                <div>
                  <span>5 Star Reviews</span>
                  <strong>{fiveStarCount}</strong>
                </div>
              </div>
            </div>

            <div className="feedback-section-header">
              <div>
                <h2>Recent Feedback</h2>
                <p>Customer reviews and comments</p>
              </div>
            </div>

            {feedbacks.length === 0 ? (
              <div className="feedback-empty">
                <div className="feedback-empty-icon">
                  <MessageSquare size={28} />
                </div>

                <h3>No feedback yet</h3>

                <p>
                  Customer feedback will appear here once customers start
                  sharing their experience.
                </p>
              </div>
            ) : (
              <div className="feedback-grid">
                {feedbacks.map((feedback) => (
                  <div className="feedback-card" key={feedback.id}>
                    <div className="feedback-card-top">
                      <div className="feedback-rating">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={18}
                            fill={
                              star <= feedback.rating
                                ? "currentColor"
                                : "none"
                            }
                          />
                        ))}
                      </div>

                      <span className="feedback-date">
                        {new Date(
                          feedback.createdAt,
                        ).toLocaleDateString()}
                      </span>
                    </div>

                    <p className="feedback-comment">
                      {feedback.comment}
                    </p>

                    <div className="feedback-footer">
                      <div className="customer-avatar">
                        {feedback.customerEmail
                          ?.charAt(0)
                          .toUpperCase() || "C"}
                      </div>

                      <span>{feedback.customerEmail}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default FeedbackList;