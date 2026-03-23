using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ClientPortal.API.Models;

public class Message
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    public string Body { get; set; } = null!;
    public string SenderName { get; set; } = null!;
    public string SenderRole { get; set; } = "owner";

    [BsonRepresentation(BsonType.ObjectId)]
    public string PortalId { get; set; } = null!;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
