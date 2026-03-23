using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ClientPortal.API.Models;

public class Portal
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    public string Name { get; set; } = null!;
    public string Slug { get; set; } = null!;
    public string ClientName { get; set; } = null!;
    public string ClientEmail { get; set; } = null!;

    [BsonRepresentation(BsonType.ObjectId)]
    public string OwnerId { get; set; } = null!;

    public string? BrandColor { get; set; }
    public string? LogoUrl { get; set; }
    public string Status { get; set; } = "Active";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
