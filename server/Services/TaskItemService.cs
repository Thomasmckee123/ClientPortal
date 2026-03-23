using ClientPortal.API.Configuration;
using ClientPortal.API.Models;
using MongoDB.Driver;

namespace ClientPortal.API.Services;

public class TaskItemService
{
    private readonly IMongoCollection<TaskItem> _tasks;

    public TaskItemService(MongoDbContext context)
    {
        _tasks = context.Tasks;
    }

    public async Task<List<TaskItem>> GetByPortalIdAsync(string portalId) =>
        await _tasks.Find(t => t.PortalId == portalId).SortBy(t => t.CreatedAt).ToListAsync();

    public async Task<TaskItem?> GetByIdAsync(string id) =>
        await _tasks.Find(t => t.Id == id).FirstOrDefaultAsync();

    public async Task<TaskItem> CreateAsync(TaskItem task)
    {
        await _tasks.InsertOneAsync(task);
        return task;
    }

    public async Task UpdateAsync(string id, TaskItem task) =>
        await _tasks.ReplaceOneAsync(t => t.Id == id, task);

    public async Task DeleteAsync(string id) =>
        await _tasks.DeleteOneAsync(t => t.Id == id);
}
