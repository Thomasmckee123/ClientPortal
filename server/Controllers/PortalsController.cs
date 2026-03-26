using ClientPortal.API.DTOs;
using ClientPortal.API.Models;
using ClientPortal.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ClientPortal.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class PortalsController : ControllerBase
{
    private readonly PortalService _portalService;

    public PortalsController(PortalService portalService)
    {
        _portalService = portalService;
    }

    [HttpGet]
    public async Task<ActionResult<List<Portal>>> GetAll() =>
        Ok(await _portalService.GetAllAsync());

    [HttpGet("{id}")]
    public async Task<ActionResult<Portal>> GetById(string id)
    {
        var portal = await _portalService.GetByIdAsync(id);
        return portal is null ? NotFound() : Ok(portal);
    }

    [HttpGet("slug/{slug}")]
    public async Task<ActionResult<Portal>> GetBySlug(string slug)
    {
        var portal = await _portalService.GetBySlugAsync(slug);
        return portal is null ? NotFound() : Ok(portal);
    }

    [HttpGet("owner/{ownerId}")]
    public async Task<ActionResult<List<Portal>>> GetByOwnerId(string ownerId) =>
        Ok(await _portalService.GetByOwnerIdAsync(ownerId));

    [HttpPost]
    public async Task<ActionResult<Portal>> Create(CreatePortalDto dto)
    {
        var portal = new Portal
        {
            Name = dto.Name,
            Slug = dto.Slug,
            ClientName = dto.ClientName,
            ClientEmail = dto.ClientEmail,
            OwnerId = dto.OwnerId,
            BrandColor = dto.BrandColor,
            LogoUrl = dto.LogoUrl,
            Status = dto.Status
        };
        var created = await _portalService.CreateAsync(portal);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, UpdatePortalDto dto)
    {
        var existing = await _portalService.GetByIdAsync(id);
        if (existing is null) return NotFound();

        var portal = new Portal
        {
            Id = id,
            Name = dto.Name,
            Slug = dto.Slug,
            ClientName = dto.ClientName,
            ClientEmail = dto.ClientEmail,
            OwnerId = dto.OwnerId,
            BrandColor = dto.BrandColor,
            LogoUrl = dto.LogoUrl,
            Status = dto.Status,
            CreatedAt = existing.CreatedAt
        };
        await _portalService.UpdateAsync(id, portal);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var existing = await _portalService.GetByIdAsync(id);
        if (existing is null) return NotFound();
        await _portalService.DeleteAsync(id);
        return NoContent();
    }
}
