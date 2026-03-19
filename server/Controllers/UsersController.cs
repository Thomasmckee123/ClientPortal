using ClientPortal.API.DTOs;
using ClientPortal.API.Models;
using ClientPortal.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace ClientPortal.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly UserService _userService;

    public UsersController(UserService userService)
    {
        _userService = userService;
    }

    [HttpGet]
    public async Task<ActionResult<List<User>>> GetAll() =>
        Ok(await _userService.GetAllAsync());

    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetById(string id)
    {
        var user = await _userService.GetByIdAsync(id);
        return user is null ? NotFound() : Ok(user);
    }

    [HttpPost]
    public async Task<ActionResult<User>> Create(CreateUserDto dto)
    {
        var user = new User
        {
            Email = dto.Email,
            AccountId = dto.AccountId,
            Password = dto.Password
        };

        var created = await _userService.CreateAsync(user);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, UpdateUserDto dto)
    {
        var existing = await _userService.GetByIdAsync(id);
        if (existing is null) return NotFound();

        var user = new User
        {
            Id = id,
            Email = dto.Email,
            AccountId = dto.AccountId,
            Password = dto.Password
        };

        await _userService.UpdateAsync(id, user);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var existing = await _userService.GetByIdAsync(id);
        if (existing is null) return NotFound();

        await _userService.DeleteAsync(id);
        return NoContent();
    }
}
