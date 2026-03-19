using ClientPortal.API.Configuration;
using ClientPortal.API.Models;
using MongoDB.Driver;

namespace ClientPortal.API.Services;

public class ClientService
{
    private readonly IMongoCollection<Client> _clients;

    public ClientService (MongoDbContext context)
    {
        _clients = context.Clients;
    }

 public async Task<List<Client>> GetAllAsync() =>
        await _clients.Find(_ => true).SortByDescending(i => i.Name).ToListAsync();

    public async Task<Client?> GetByIdAsync(string id) =>
        await _clients.Find(i => i.Id == id).FirstOrDefaultAsync();
    public async Task<Client> CreateAsync(Client client)
    {
        await _clients.InsertOneAsync(client);
        return client;
    }
    public async Task UpdateAsync(string id, Client client) =>
        await _clients.ReplaceOneAsync(i => i.Id == id, client);
    public async Task DeleteAsync(string id) =>
        await _clients.DeleteOneAsync(i => i.Id == id);

}
