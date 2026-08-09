using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using System.Net.Http.Json;

namespace FeedbackService.Eureka
{
    public class EurekaRegistrationService : BackgroundService
    {
        private readonly HttpClient _httpClient;
        private readonly EurekaOptions _options;

        private readonly string _instanceId;

        public EurekaRegistrationService(IOptions<EurekaOptions> options)
        {
            _httpClient = new HttpClient();
            _options = options.Value;

            _instanceId = $"{_options.AppName}:{_options.HostName}:{_options.Port}";
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            await Register();

            while (!stoppingToken.IsCancellationRequested)
            {
                await Task.Delay(TimeSpan.FromSeconds(30), stoppingToken);

                await Heartbeat();
            }
        }

        public override async Task StopAsync(CancellationToken cancellationToken)
        {
            await Deregister();

            await base.StopAsync(cancellationToken);
        }

        private async Task Register()
        {
            var request = new EurekaRequest
            {
                Instance = new EurekaInstance
                {
                    InstanceId = _instanceId,
                    HostName = _options.HostName,
                    App = _options.AppName,
                    IpAddr = "127.0.0.1",
                    VipAddress = _options.AppName,
                    SecureVipAddress = _options.AppName,
                    Port = new EurekaPort
                    {
                        Value = _options.Port
                    }
                }
            };

            var response = await _httpClient.PostAsJsonAsync(
                $"{_options.ServerUrl}/apps/{_options.AppName}",
                request);

            Console.WriteLine($"Eureka Register: {response.StatusCode}");
        }

        private async Task Heartbeat()
        {
            var response = await _httpClient.PutAsync(
                $"{_options.ServerUrl}/apps/{_options.AppName}/{_instanceId}",
                null);

            Console.WriteLine($"Heartbeat: {response.StatusCode}");
        }

        private async Task Deregister()
        {
            var response = await _httpClient.DeleteAsync(
                $"{_options.ServerUrl}/apps/{_options.AppName}/{_instanceId}");

            Console.WriteLine($"Deregister: {response.StatusCode}");
        }
    }
}