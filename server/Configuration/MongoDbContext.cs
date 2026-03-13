using Microsoft.Extensions.Options;
using MongoDB.Driver;
using ClientPortal.API.Models;

namespace ClientPortal.API.Configuration;

public class MongoDbContext
{
    private readonly IMongoDatabase _database;

    public MongoDbContext(IOptions<MongoDbSettings> settings)
    {
        var client = new MongoClient(settings.Value.ConnectionString);
        _database = client.GetDatabase(settings.Value.DatabaseName);
    }

    public IMongoCollection<Invoice> Invoices => _database.GetCollection<Invoice>("Invoices");
    public IMongoCollection<Receipt> Receipts => _database.GetCollection<Receipt>("Receipts");
}
