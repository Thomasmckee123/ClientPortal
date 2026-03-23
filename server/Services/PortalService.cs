using ClientPortal.API.Configuration;
using ClientPortal.API.Models;
using MongoDB.Driver;

namespace ClientPortal.API.Services;

public class PortalService
{
    private readonly IMongoCollection<Portal> _portals;

    public PortalService(MongoDbContext context)
    {
        _portals = context.Portals;
    }

    public async Task<List<Portal>> GetAllAsync() =>
        await _portals.Find(_ => true).SortByDescending(p => p.CreatedAt).ToListAsync();

    public async Task<Portal?> GetByIdAsync(string id) =>
        await _portals.Find(p => p.Id == id).FirstOrDefaultAsync();

    public async Task<Portal?> GetBySlugAsync(string slug) =>
        await _portals.Find(p => p.Slug == slug).FirstOrDefaultAsync();

    public async Task<List<Portal>> GetByOwnerIdAsync(string ownerId) =>
        await _portals.Find(p => p.OwnerId == ownerId).SortByDescending(p => p.CreatedAt).ToListAsync();

    public async Task<Portal> CreateAsync(Portal portal)
    {
        await _portals.InsertOneAsync(portal);
        return portal;
    }

    public async Task UpdateAsync(string id, Portal portal) =>
        await _portals.ReplaceOneAsync(p => p.Id == id, portal);

    public async Task DeleteAsync(string id) =>
        await _portals.DeleteOneAsync(p => p.Id == id);
}
