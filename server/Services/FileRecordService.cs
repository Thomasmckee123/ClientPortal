using ClientPortal.API.Configuration;
using ClientPortal.API.Models;
using MongoDB.Driver;

namespace ClientPortal.API.Services;

public class FileRecordService
{
    private readonly IMongoCollection<FileRecord> _files;

    public FileRecordService(MongoDbContext context)
    {
        _files = context.Files;
    }

    public async Task<List<FileRecord>> GetByPortalIdAsync(string portalId) =>
        await _files.Find(f => f.PortalId == portalId).SortByDescending(f => f.UploadedAt).ToListAsync();

    public async Task<FileRecord?> GetByIdAsync(string id) =>
        await _files.Find(f => f.Id == id).FirstOrDefaultAsync();

    public async Task<FileRecord> CreateAsync(FileRecord file)
    {
        await _files.InsertOneAsync(file);
        return file;
    }

    public async Task DeleteAsync(string id) =>
        await _files.DeleteOneAsync(f => f.Id == id);
}
