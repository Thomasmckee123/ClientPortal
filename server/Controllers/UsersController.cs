using ClientPortal.API.DTOs;
using ClientPortal.API.Models;
using ClientPortal.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ClientPortal.API.Controllers;

[Authorize]
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
    public async Task<ActionResult<List<GetUserDto>>> GetAll()
    {
        var users = await _userService.GetAllAsync();
        var dtos = users.Select(u => new GetUserDto
        {
            Id = u.Id!,
            Name = u.Name,
            Email = u.Email,
            Role = u.Role,
            AccountId = u.AccountId,
            CreatedAt = u.CreatedAt
        }).ToList();
        return Ok(dtos);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<GetUserDto>> GetById(string id)
    {
        var user = await _userService.GetByIdAsync(id);
        if (user is null) return NotFound();

        return Ok(new GetUserDto
        {
            Id = user.Id!,
            Name = user.Name,
            Email = user.Email,
            Role = user.Role,
            AccountId = user.AccountId,
            CreatedAt = user.CreatedAt
        });
    }

    [HttpPost]
    public async Task<ActionResult<GetUserDto>> Create(CreateUserDto dto)
    {
        var user = new User
        {
            Name = dto.Name,
            Email = dto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            Role = dto.Role,
            AccountId = dto.AccountId,
            CreatedAt = DateTime.UtcNow
        };

        var created = await _userService.CreateAsync(user);

        var responseDto = new GetUserDto
        {
            Id = created.Id!,
            Name = created.Name,
            Email = created.Email,
            Role = created.Role,
            AccountId = created.AccountId,
            CreatedAt = created.CreatedAt
        };

        return CreatedAtAction(nameof(GetById), new { id = created.Id }, responseDto);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, UpdateUserDto dto)
    {
        var existing = await _userService.GetByIdAsync(id);
        if (existing is null) return NotFound();

        var user = new User
        {
            Id = id,
            Name = dto.Name,
            Email = dto.Email,
            PasswordHash = string.IsNullOrEmpty(dto.Password)
                ? existing.PasswordHash
                : BCrypt.Net.BCrypt.HashPassword(dto.Password),
            Role = dto.Role,
            AccountId = dto.AccountId,
            CreatedAt = existing.CreatedAt
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
