namespace ClientPortal.API.DTOs;

public class CreateTaskItemDto
{
    public string Title { get; set; } = null!;
    public string Status { get; set; } = "todo";
    public string PortalId { get; set; } = null!;
}

public class UpdateTaskItemDto
{
    public string Title { get; set; } = null!;
    public string Status { get; set; } = null!;
    public string PortalId { get; set; } = null!;
}
