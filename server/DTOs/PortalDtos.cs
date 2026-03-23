namespace ClientPortal.API.DTOs;

public class CreatePortalDto
{
    public string Name { get; set; } = null!;
    public string Slug { get; set; } = null!;
    public string ClientName { get; set; } = null!;
    public string ClientEmail { get; set; } = null!;
    public string OwnerId { get; set; } = null!;
    public string? BrandColor { get; set; }
    public string? LogoUrl { get; set; }
    public string Status { get; set; } = "Active";
}

public class UpdatePortalDto
{
    public string Name { get; set; } = null!;
    public string Slug { get; set; } = null!;
    public string ClientName { get; set; } = null!;
    public string ClientEmail { get; set; } = null!;
    public string OwnerId { get; set; } = null!;
    public string? BrandColor { get; set; }
    public string? LogoUrl { get; set; }
    public string Status { get; set; } = "Active";
}
