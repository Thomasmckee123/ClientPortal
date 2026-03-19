using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ClientPortal.API.Models;

public class Account
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
    public string AccountType { get; set; } = null!;
}
