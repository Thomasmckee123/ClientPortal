using ClientPortal.API.DTOs;
using ClientPortal.API.Models;
using ClientPortal.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ClientPortal.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class MessagesController : ControllerBase
{
    private readonly MessageService _messageService;

    public MessagesController(MessageService messageService)
    {
        _messageService = messageService;
    }

    [HttpGet("portal/{portalId}")]
    public async Task<ActionResult<List<Message>>> GetByPortalId(string portalId) =>
        Ok(await _messageService.GetByPortalIdAsync(portalId));

    [HttpPost]
    public async Task<ActionResult<Message>> Create(CreateMessageDto dto)
    {
        var message = new Message
        {
            Body = dto.Body,
            SenderName = dto.SenderName,
            SenderRole = dto.SenderRole,
            PortalId = dto.PortalId
        };
        var created = await _messageService.CreateAsync(message);
        return Created($"/api/messages/{created.Id}", created);
    }
}
