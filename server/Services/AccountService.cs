using ClientPortal.API.Configuration;
using ClientPortal.API.Models;
using MongoDB.Driver;

namespace ClientPortal.API.Services;

public class AccountService
{
    private readonly IMongoCollection<Account> _accounts;

    public AccountService(MongoDbContext context)
    {
        _accounts = context.Accounts;
    }

    public async Task<List<Account>> GetAllAsync() =>
        await _accounts.Find(_ => true).SortByDescending(i => i.AccountType).ToListAsync();

    public async Task<Account?> GetByIdAsync(string id) =>
        await _accounts.Find(i => i.Id == id).FirstOrDefaultAsync();

    public async Task<Account> CreateAsync(Account account)
    {
        await _accounts.InsertOneAsync(account);
        return account;
    }

    public async Task UpdateAsync(string id, Account account) =>
        await _accounts.ReplaceOneAsync(i => i.Id == id, account);

    public async Task DeleteAsync(string id) =>
        await _accounts.DeleteOneAsync(i => i.Id == id);
}
