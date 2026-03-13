using ClientPortal.API.Configuration;
using ClientPortal.API.Models;
using MongoDB.Driver;

namespace ClientPortal.API.Services;

public class ReceiptService
{
    private readonly IMongoCollection<Receipt> _receipts;

    public ReceiptService(MongoDbContext context)
    {
        _receipts = context.Receipts;
    }

    public async Task<List<Receipt>> GetAllAsync() =>
        await _receipts.Find(_ => true).SortByDescending(r => r.CreatedDate).ToListAsync();

    public async Task<Receipt?> GetByIdAsync(string id) =>
        await _receipts.Find(r => r.Id == id).FirstOrDefaultAsync();

    public async Task<Receipt> CreateAsync(Receipt receipt)
    {
        await _receipts.InsertOneAsync(receipt);
        return receipt;
    }

    public async Task UpdateAsync(string id, Receipt receipt) =>
        await _receipts.ReplaceOneAsync(r => r.Id == id, receipt);

    public async Task DeleteAsync(string id) =>
        await _receipts.DeleteOneAsync(r => r.Id == id);
}
