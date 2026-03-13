using ClientPortal.API.Models;
using ClientPortal.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace ClientPortal.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ReceiptsController : ControllerBase
{
    private readonly ReceiptService _receiptService;

    public ReceiptsController(ReceiptService receiptService)
    {
        _receiptService = receiptService;
    }

    [HttpGet]
    public async Task<ActionResult<List<Receipt>>> GetAll() =>
        Ok(await _receiptService.GetAllAsync());

    [HttpGet("{id}")]
    public async Task<ActionResult<Receipt>> GetById(string id)
    {
        var receipt = await _receiptService.GetByIdAsync(id);
        return receipt is null ? NotFound() : Ok(receipt);
    }

    [HttpPost]
    public async Task<ActionResult<Receipt>> Create(Receipt receipt)
    {
        var created = await _receiptService.CreateAsync(receipt);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, Receipt receipt)
    {
        var existing = await _receiptService.GetByIdAsync(id);
        if (existing is null) return NotFound();

        receipt.Id = id;
        await _receiptService.UpdateAsync(id, receipt);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var existing = await _receiptService.GetByIdAsync(id);
        if (existing is null) return NotFound();

        await _receiptService.DeleteAsync(id);
        return NoContent();
    }
}
