using ClientPortal.API.DTOs;
using ClientPortal.API.Models;
using ClientPortal.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace ClientPortal.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ClientController : ControllerBase
{
    private readonly ClientService _clientService;

    public ClientController(ClientService clientService)
    {
        _clientService = clientService;
    }

    [HttpGet]
    public async Task<ActionResult<List<Client>>> GetAll() =>
        Ok(await _clientService.GetAllAsync());

    [HttpGet("{id}")]
    public async Task<ActionResult<Client>> GetById(string id)
    {
        var client = await _clientService.GetByIdAsync(id);
        return client is null ? NotFound() : Ok(client);
    }

    [HttpPost]
    public async Task<ActionResult<Client>> Create(CreateClientDto dto)
    {
        var client = new Client
        {
            UserId = dto.UserId,
            Name = dto.Name,
            Balance = dto.Balance,
            UserTypeId = dto.UserTypeId
        };

        var created = await _clientService.CreateAsync(client);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, UpdateClientDto dto)
    {
        var existing = await _clientService.GetByIdAsync(id);
        if (existing is null) return NotFound();

        var client = new Client
        {
            Id = id,
            UserId = dto.UserId,
            Name = dto.Name,
            Balance = dto.Balance,
            UserTypeId = dto.UserTypeId
        };

        await _clientService.UpdateAsync(id, client);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var existing = await _clientService.GetByIdAsync(id);
        if (existing is null) return NotFound();

        await _clientService.DeleteAsync(id);
        return NoContent();
    }
}
