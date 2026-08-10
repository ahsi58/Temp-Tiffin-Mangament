import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
    MessageSquare,
    Star,
    Users,
    TrendingUp
} from "lucide-react";

import feedbackService from "../../services/feedbackService";

import DashboardLayout from "../../components/layout/DashboardLayout";

import "./FeedbackList.css";


const FeedbackList = () => {

    const [feedbacks, setFeedbacks] = useState([]);

    const [loading, setLoading] = useState(true);


    // ============================================================
    // Load Feedback
    // ============================================================

    useEffect(() => {

        loadFeedbacks();

    }, []);


    const loadFeedbacks = async () => {

        try {

            const response =
                await feedbackService.getAllFeedback();

            setFeedbacks(
                response.data
            );

        } catch (error) {

            console.error(error);

            toast.error(
                "Failed to load feedback."
            );

        } finally {

            setLoading(false);

        }

    };


    // ============================================================
    // Statistics
    // ============================================================

    const averageRating =
        feedbacks.length > 0
            ? (
                feedbacks.reduce(
                    (total, feedback) =>
                        total + feedback.rating,
                    0
                ) / feedbacks.length
            ).toFixed(1)
            : "0.0";


    const fiveStarCount =
        feedbacks.filter(
            (feedback) =>
                feedback.rating === 5
        ).length;


    const fourAndFiveStarCount =
        feedbacks.filter(
            (feedback) =>
                feedback.rating >= 4
        ).length;


    return (

        <DashboardLayout>

            <div className="feedback-page">


                {/* ==================================================
                    Header
                   ================================================== */}

                <div className="feedback-header">

                    <div>

                        <span className="feedback-eyebrow">
                            CUSTOMER EXPERIENCE
                        </span>

                        <h1>
                            Customer Feedback
                        </h1>

                        <p>
                            See what your customers are saying and
                            understand their experience.
                        </p>

                    </div>


                    <div className="feedback-header-icon">

                        <MessageSquare
                            size={26}
                        />

                    </div>

                </div>


                {/* ==================================================
                    Loading
                   ================================================== */}

                {loading ? (

                    <div className="feedback-loading">

                        <div className="feedback-loading-spinner"></div>

                        <p>
                            Loading customer feedback...
                        </p>

                    </div>

                ) : (

                    <>


                        {/* ==================================================
                            Statistics
                           ================================================== */}

                        <div className="feedback-stats">


                            {/* Average Rating */}

                            <div className="feedback-stat-card">

                                <div className="feedback-stat-icon orange">

                                    <Star
                                        size={19}
                                        fill="currentColor"
                                    />

                                </div>

                                <div>

                                    <span>
                                        Average Rating
                                    </span>

                                    <strong>
                                        {averageRating}/5
                                    </strong>

                                </div>

                            </div>


                            {/* Total Reviews */}

                            <div className="feedback-stat-card">

                                <div className="feedback-stat-icon blue">

                                    <Users
                                        size={19}
                                    />

                                </div>

                                <div>

                                    <span>
                                        Total Reviews
                                    </span>

                                    <strong>
                                        {feedbacks.length}
                                    </strong>

                                </div>

                            </div>


                            {/* 4 & 5 Star */}

                            <div className="feedback-stat-card">

                                <div className="feedback-stat-icon green">

                                    <TrendingUp
                                        size={19}
                                    />

                                </div>

                                <div>

                                    <span>
                                        4 & 5 Star Reviews
                                    </span>

                                    <strong>
                                        {fourAndFiveStarCount}
                                    </strong>

                                </div>

                            </div>


                            {/* 5 Star */}

                            <div className="feedback-stat-card">

                                <div className="feedback-stat-icon yellow">

                                    <Star
                                        size={19}
                                        fill="currentColor"
                                    />

                                </div>

                                <div>

                                    <span>
                                        5 Star Reviews
                                    </span>

                                    <strong>
                                        {fiveStarCount}
                                    </strong>

                                </div>

                            </div>

                        </div>


                        {/* ==================================================
                            Section Header
                           ================================================== */}

                        <div className="feedback-section-header">

                            <div>

                                <h2>
                                    Recent Feedback
                                </h2>

                                <p>
                                    Customer reviews and comments
                                </p>

                            </div>

                            <span className="feedback-count">

                                {feedbacks.length}{" "}

                                {feedbacks.length === 1
                                    ? "Review"
                                    : "Reviews"}

                            </span>

                        </div>


                        {/* ==================================================
                            Empty State
                           ================================================== */}

                        {feedbacks.length === 0 ? (

                            <div className="feedback-empty">

                                <div className="feedback-empty-icon">

                                    <MessageSquare
                                        size={26}
                                    />

                                </div>

                                <h3>
                                    No feedback yet
                                </h3>

                                <p>
                                    Customer feedback will appear here
                                    once customers start sharing their
                                    experience.
                                </p>

                            </div>

                        ) : (


                            /* ==================================================
                               Feedback Cards
                               ================================================== */

                            <div className="feedback-grid">

                                {feedbacks.map(
                                    (feedback) => (

                                        <div
                                            className="feedback-card"
                                            key={feedback.id}
                                        >


                                            {/* Rating + Date */}

                                            <div className="feedback-card-top">

                                                <div className="feedback-rating">

                                                    {[1, 2, 3, 4, 5].map(
                                                        (star) => (

                                                            <Star
                                                                key={star}
                                                                size={16}
                                                                fill={
                                                                    star <=
                                                                    feedback.rating
                                                                        ? "currentColor"
                                                                        : "none"
                                                                }
                                                            />

                                                        )
                                                    )}

                                                </div>


                                                <span className="feedback-date">

                                                    {new Date(
                                                        feedback.createdAt
                                                    ).toLocaleDateString(
                                                        "en-IN",
                                                        {
                                                            day: "2-digit",
                                                            month: "short",
                                                            year: "numeric"
                                                        }
                                                    )}

                                                </span>

                                            </div>


                                            {/* Comment */}

                                            <p className="feedback-comment">

                                                {feedback.comment}

                                            </p>


                                            {/* Customer */}

                                            <div className="feedback-footer">

                                                <div className="customer-avatar">

                                                    {
                                                        feedback.customerEmail
                                                            ?.charAt(0)
                                                            .toUpperCase() ||
                                                        "C"
                                                    }

                                                </div>

                                                <div className="customer-info">

                                                    <span>
                                                        {feedback.customerEmail}
                                                    </span>

                                                    <small>
                                                        Customer
                                                    </small>

                                                </div>

                                            </div>

                                        </div>

                                    )
                                )}

                            </div>

                        )}

                    </>

                )}

            </div>

        </DashboardLayout>

    );

};


export default FeedbackList;

