namespace ClientPortal.API.DTOs;

public class CreateFileRecordDto
{
    public string FileName { get; set; } = null!;
    public long FileSize { get; set; }
    public string ContentType { get; set; } = "application/octet-stream";
    public string StoragePath { get; set; } = null!;
    public string PortalId { get; set; } = null!;
}
