using FeedbackService.Models;

namespace FeedbackService.Repositories
{
    public interface IFeedbackRepository
    {
        Task<Feedback> SaveAsync(Feedback feedback);

        Task<List<Feedback>> GetAllAsync();

        Task<List<Feedback>> GetByCustomerEmailAsync(string email);

    }
}