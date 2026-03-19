using ClientPortal.API.Configuration;
using ClientPortal.API.Models;
using MongoDB.Driver;

namespace ClientPortal.API.Services;

public class UserService
{
    private readonly IMongoCollection<User> _users;

    public UserService(MongoDbContext context)
    {
        _users = context.Users;
    }

    public async Task<List<User>> GetAllAsync() =>
        await _users.Find(_ => true).SortByDescending(i => i.Email).ToListAsync();

    public async Task<User?> GetByIdAsync(string id) =>
        await _users.Find(i => i.Id == id).FirstOrDefaultAsync();

    public async Task<User> CreateAsync(User user)
    {
        await _users.InsertOneAsync(user);
        return user;
    }

    public async Task UpdateAsync(string id, User user) =>
        await _users.ReplaceOneAsync(i => i.Id == id, user);

    public async Task DeleteAsync(string id) =>
        await _users.DeleteOneAsync(i => i.Id == id);
}
