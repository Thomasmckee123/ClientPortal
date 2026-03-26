using ClientPortal.API.Configuration;
using ClientPortal.API.Models;
using MongoDB.Driver;

namespace ClientPortal.API.Services;

public class InvoiceService
{
    private readonly IMongoCollection<Invoice> _invoices;

    public InvoiceService(MongoDbContext context)
    {
        _invoices = context.Invoices;
    }

    public async Task<List<Invoice>> GetAllAsync() =>
        await _invoices.Find(_ => true).SortByDescending(i => i.CreatedDate).ToListAsync();

    public async Task<Invoice?> GetByIdAsync(string id) =>
        await _invoices.Find(i => i.Id == id).FirstOrDefaultAsync();

    public async Task<List<Invoice>> GetByPortalIdAsync(string portalId) =>
        await _invoices.Find(i => i.PortalId == portalId).SortByDescending(i => i.CreatedDate).ToListAsync();

    public async Task<Invoice> CreateAsync(Invoice invoice)
    {
        await _invoices.InsertOneAsync(invoice);
        return invoice;
    }

    public async Task UpdateAsync(string id, Invoice invoice) =>
        await _invoices.ReplaceOneAsync(i => i.Id == id, invoice);

    public async Task DeleteAsync(string id) =>
        await _invoices.DeleteOneAsync(i => i.Id == id);
}
