using FeedbackService.DTOs;
using FeedbackService.Models;
using FeedbackService.Repositories;

namespace FeedbackService.Services
{
    public class FeedbackService : IFeedbackService
    {
        private readonly IFeedbackRepository _feedbackRepository;

        public FeedbackService(IFeedbackRepository feedbackRepository)
        {
            _feedbackRepository = feedbackRepository;
        }

        public async Task<ApiResponse> SubmitFeedbackAsync(
            string customerEmail,
            FeedbackRequestDto request)
        {
            Feedback feedback = new Feedback
            {
                CustomerEmail = customerEmail,
                Rating = request.Rating,
                Comment = request.Comment
            };

            Feedback savedFeedback =
                await _feedbackRepository.SaveAsync(feedback);

            FeedbackResponseDto response = new FeedbackResponseDto
            {
                Id = savedFeedback.Id,
                CustomerEmail = savedFeedback.CustomerEmail,
                Rating = savedFeedback.Rating,
                Comment = savedFeedback.Comment,
                CreatedAt = savedFeedback.CreatedAt
            };

            return new ApiResponse
            {
                Success = true,
                Message = "Feedback submitted successfully.",
                Data = response
            };
        }

        public async Task<ApiResponse> GetAllFeedbackAsync()
        {
            var feedbackList = await _feedbackRepository.GetAllAsync();

            var response = feedbackList.Select(f => new FeedbackResponseDto
            {
                Id = f.Id,
                CustomerEmail = f.CustomerEmail,
                Rating = f.Rating,
                Comment = f.Comment,
                CreatedAt = f.CreatedAt
            }).ToList();

            return new ApiResponse
            {
                Success = true,
                Message = "Feedback retrieved successfully.",
                Data = response
            };
        }


        public async Task<ApiResponse> GetFeedbackByCustomerAsync(string customerEmail)
        {
            var feedbackList =
                await _feedbackRepository.GetByCustomerEmailAsync(customerEmail);

            var response = feedbackList.Select(f => new FeedbackResponseDto
            {
                Id = f.Id,
                CustomerEmail = f.CustomerEmail,
                Rating = f.Rating,
                Comment = f.Comment,
                CreatedAt = f.CreatedAt
            }).ToList();

            return new ApiResponse
            {
                Success = true,
                Message = "Customer feedback retrieved successfully.",
                Data = response
            };
        }

      
    }
}