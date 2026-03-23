using ClientPortal.API.DTOs;
using ClientPortal.API.Models;
using ClientPortal.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace ClientPortal.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly TaskItemService _taskService;

    public TasksController(TaskItemService taskService)
    {
        _taskService = taskService;
    }

    [HttpGet("portal/{portalId}")]
    public async Task<ActionResult<List<TaskItem>>> GetByPortalId(string portalId) =>
        Ok(await _taskService.GetByPortalIdAsync(portalId));

    [HttpPost]
    public async Task<ActionResult<TaskItem>> Create(CreateTaskItemDto dto)
    {
        var task = new TaskItem
        {
            Title = dto.Title,
            Status = dto.Status,
            PortalId = dto.PortalId
        };
        var created = await _taskService.CreateAsync(task);
        return Created($"/api/tasks/{created.Id}", created);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, UpdateTaskItemDto dto)
    {
        var existing = await _taskService.GetByIdAsync(id);
        if (existing is null) return NotFound();

        var task = new TaskItem
        {
            Id = id,
            Title = dto.Title,
            Status = dto.Status,
            PortalId = dto.PortalId,
            CreatedAt = existing.CreatedAt
        };
        await _taskService.UpdateAsync(id, task);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var existing = await _taskService.GetByIdAsync(id);
        if (existing is null) return NotFound();
        await _taskService.DeleteAsync(id);
        return NoContent();
    }
}
