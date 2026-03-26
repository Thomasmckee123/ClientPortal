using ClientPortal.API.DTOs;
using ClientPortal.API.Models;
using ClientPortal.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ClientPortal.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class FilesController : ControllerBase
{
    private readonly FileRecordService _fileService;

    public FilesController(FileRecordService fileService)
    {
        _fileService = fileService;
    }

    [HttpGet("portal/{portalId}")]
    public async Task<ActionResult<List<FileRecord>>> GetByPortalId(string portalId) =>
        Ok(await _fileService.GetByPortalIdAsync(portalId));

    [HttpPost]
    public async Task<ActionResult<FileRecord>> Create(CreateFileRecordDto dto)
    {
        var file = new FileRecord
        {
            FileName = dto.FileName,
            FileSize = dto.FileSize,
            ContentType = dto.ContentType,
            StoragePath = dto.StoragePath,
            PortalId = dto.PortalId
        };
        var created = await _fileService.CreateAsync(file);
        return Created($"/api/files/{created.Id}", created);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var existing = await _fileService.GetByIdAsync(id);
        if (existing is null) return NotFound();
        await _fileService.DeleteAsync(id);
        return NoContent();
    }
}
