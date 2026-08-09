namespace FeedbackService.Eureka
{
    public class EurekaOptions
    {
        public string ServerUrl { get; set; } = string.Empty;

        public string AppName { get; set; } = string.Empty;

        public string HostName { get; set; } = string.Empty;

        public int Port { get; set; }
    }
}