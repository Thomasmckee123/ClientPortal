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
    public IMongoCollection<User> Users => _database.GetCollection<User>("Users");
    public IMongoCollection<Client> Clients => _database.GetCollection<Client>("Clients");
    public IMongoCollection<Account> Accounts => _database.GetCollection<Account>("Accounts");
    public IMongoCollection<Portal> Portals => _database.GetCollection<Portal>("Portals");
    public IMongoCollection<TaskItem> Tasks => _database.GetCollection<TaskItem>("Tasks");
    public IMongoCollection<Message> Messages => _database.GetCollection<Message>("Messages");
    public IMongoCollection<FileRecord> Files => _database.GetCollection<FileRecord>("Files");
}
