using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ClientPortal.API.Models;

public class FileRecord
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    public string FileName { get; set; } = null!;
    public long FileSize { get; set; }
    public string ContentType { get; set; } = null!;
    public string StoragePath { get; set; } = null!;

    [BsonRepresentation(BsonType.ObjectId)]
    public string PortalId { get; set; } = null!;

    public DateTime UploadedAt { get; set; } = DateTime.UtcNow;
}
