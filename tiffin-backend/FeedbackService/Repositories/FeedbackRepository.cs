using FeedbackService.Data;
using FeedbackService.Models;
using Microsoft.EntityFrameworkCore;

namespace FeedbackService.Repositories
{
    public class FeedbackRepository : IFeedbackRepository
    {
        private readonly AppDbContext _context;

        public FeedbackRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Feedback> SaveAsync(Feedback feedback)
        {
            _context.Feedbacks.Add(feedback);

            await _context.SaveChangesAsync();

            return feedback;
        }

        public async Task<List<Feedback>> GetAllAsync()
        {
            return await _context.Feedbacks
                                 .OrderByDescending(f => f.CreatedAt)
                                 .ToListAsync();
        }

       

        public async Task<List<Feedback>> GetByCustomerEmailAsync(string email)
        {
            return await _context.Feedbacks
                                 .Where(f => f.CustomerEmail == email)
                                 .OrderByDescending(f => f.CreatedAt)
                                 .ToListAsync();
        }
        
    }
}