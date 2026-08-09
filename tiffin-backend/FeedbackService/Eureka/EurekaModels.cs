using System.Text.Json.Serialization;

namespace FeedbackService.Eureka
{
    public class EurekaRequest
    {
        [JsonPropertyName("instance")]
        public EurekaInstance Instance { get; set; } = new();
    }

    public class EurekaInstance
    {
        [JsonPropertyName("instanceId")]
        public string InstanceId { get; set; } = string.Empty;

        [JsonPropertyName("hostName")]
        public string HostName { get; set; } = string.Empty;

        [JsonPropertyName("app")]
        public string App { get; set; } = string.Empty;

        [JsonPropertyName("ipAddr")]
        public string IpAddr { get; set; } = string.Empty;

        [JsonPropertyName("status")]
        public string Status { get; set; } = "UP";

        [JsonPropertyName("port")]
        public EurekaPort Port { get; set; } = new();

        [JsonPropertyName("vipAddress")]
        public string VipAddress { get; set; } = string.Empty;

        [JsonPropertyName("secureVipAddress")]
        public string SecureVipAddress { get; set; } = string.Empty;

        [JsonPropertyName("dataCenterInfo")]
        public DataCenterInfo DataCenterInfo { get; set; } = new();
    }

    public class EurekaPort
    {
        [JsonPropertyName("$")]
        public int Value { get; set; }

        [JsonPropertyName("@enabled")]
        public string Enabled { get; set; } = "true";
    }

    public class DataCenterInfo
    {
        [JsonPropertyName("@class")]
        public string ClassName { get; set; }
            = "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo";

        [JsonPropertyName("name")]
        public string Name { get; set; } = "MyOwn";
    }
}