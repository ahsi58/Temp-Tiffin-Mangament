using FeedbackService.DTOs;
using FeedbackService.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FeedbackService.Controllers
{
    [ApiController]
    [Route("feedback")]
    [Authorize]
    public class FeedbackController : ControllerBase
    {
        private readonly IFeedbackService _feedbackService;

        public FeedbackController(IFeedbackService feedbackService)
        {
            _feedbackService = feedbackService;
        }


        // CUSTOMER - Submit Feedback
        [Authorize(Roles = "CUSTOMER")]
        [HttpPost]
        public async Task<IActionResult> SubmitFeedback([FromBody] FeedbackRequestDto request)
        {
            var customerEmail = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(customerEmail))
                return Unauthorized("Invalid JWT");

            var response = await _feedbackService.SubmitFeedbackAsync(customerEmail, request);

            return Ok(response);
        }

        // VENDOR - View All Feedback
         [Authorize(Roles = "VENDOR")]
        [HttpGet]
        public async Task<IActionResult> GetAllFeedback()
        {
            var response = await _feedbackService.GetAllFeedbackAsync();

            return Ok(response);
        }

        // CUSTOMER - View My Feedback
        [Authorize(Roles = "CUSTOMER")]
        [HttpGet("my-feedback")]
        public async Task<IActionResult> GetCustomerFeedback()
        {
            var customerEmail = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(customerEmail))
                return Unauthorized("Invalid JWT");

            var response = await _feedbackService.GetFeedbackByCustomerAsync(customerEmail);

            return Ok(response);
        }
    }
}