using ClientPortal.API.DTOs;
using ClientPortal.API.Models;
using ClientPortal.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ClientPortal.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class AccountsController : ControllerBase
{
    private readonly AccountService _accountService;

    public AccountsController(AccountService accountService)
    {
        _accountService = accountService;
    }

    [HttpGet]
    public async Task<ActionResult<List<Account>>> GetAll() =>
        Ok(await _accountService.GetAllAsync());

    [HttpGet("{id}")]
    public async Task<ActionResult<Account>> GetById(string id)
    {
        var account = await _accountService.GetByIdAsync(id);
        return account is null ? NotFound() : Ok(account);
    }

    [HttpPost]
    public async Task<ActionResult<Account>> Create(CreateAccountDto dto)
    {
        var account = new Account
        {
            AccountType = dto.AccountType
        };

        var created = await _accountService.CreateAsync(account);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, UpdateAccountDto dto)
    {
        var existing = await _accountService.GetByIdAsync(id);
        if (existing is null) return NotFound();

        var account = new Account
        {
            Id = id,
            AccountType = dto.AccountType
        };

        await _accountService.UpdateAsync(id, account);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var existing = await _accountService.GetByIdAsync(id);
        if (existing is null) return NotFound();

        await _accountService.DeleteAsync(id);
        return NoContent();
    }
}
