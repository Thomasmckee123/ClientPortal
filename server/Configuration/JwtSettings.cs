namespace ClientPortal.API.Configuration;

public class JwtSettings
{
    public string Secret { get; set; } = null!;
    public string Issuer { get; set; } = null!;
    public int ExpiryMinutes { get; set; } = 1440;
}
