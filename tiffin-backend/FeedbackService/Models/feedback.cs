using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FeedbackService.Models
{
    [Table("feedback")]
    public class Feedback
    {
        [Key]
        public long Id { get; set; }

        [Required]
        [EmailAddress]
        [MaxLength(100)]
        public string CustomerEmail { get; set; } = string.Empty;

        [Required]
        [Range(1, 5)]
        public int Rating { get; set; }

        [Required]
        [MaxLength(500)]
        public string Comment { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}