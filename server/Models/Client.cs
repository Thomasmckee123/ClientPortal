using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ClientPortal.API.Models;

public class Client
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
    public int UserId { get; set; }
    public string Name { get; set; } = null!;
    public double Balance { get; set; }
    public int UserTypeId { get; set; }
}
