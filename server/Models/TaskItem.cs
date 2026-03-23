using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ClientPortal.API.Models;

public class TaskItem
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    public string Title { get; set; } = null!;
    public string Status { get; set; } = "todo";

    [BsonRepresentation(BsonType.ObjectId)]
    public string PortalId { get; set; } = null!;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
