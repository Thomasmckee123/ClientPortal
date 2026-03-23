namespace ClientPortal.API.DTOs;

public class CreateMessageDto
{
    public string Body { get; set; } = null!;
    public string SenderName { get; set; } = null!;
    public string SenderRole { get; set; } = "owner";
    public string PortalId { get; set; } = null!;
}
