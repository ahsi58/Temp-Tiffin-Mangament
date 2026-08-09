namespace FeedbackService.DTOs
{
    public class FeedbackResponseDto
    {
        public long Id { get; set; }

        public string CustomerEmail { get; set; } = string.Empty;

        public int Rating { get; set; }

        public string Comment { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; }
    }
}