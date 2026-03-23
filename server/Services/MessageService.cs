using ClientPortal.API.Configuration;
using ClientPortal.API.Models;
using MongoDB.Driver;

namespace ClientPortal.API.Services;

public class MessageService
{
    private readonly IMongoCollection<Message> _messages;

    public MessageService(MongoDbContext context)
    {
        _messages = context.Messages;
    }

    public async Task<List<Message>> GetByPortalIdAsync(string portalId) =>
        await _messages.Find(m => m.PortalId == portalId).SortBy(m => m.CreatedAt).ToListAsync();

    public async Task<Message> CreateAsync(Message message)
    {
        await _messages.InsertOneAsync(message);
        return message;
    }
}
