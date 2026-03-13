using ClientPortal.API.Models;
using ClientPortal.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace ClientPortal.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class InvoicesController : ControllerBase
{
    private readonly InvoiceService _invoiceService;

    public InvoicesController(InvoiceService invoiceService)
    {
        _invoiceService = invoiceService;
    }

    [HttpGet]
    public async Task<ActionResult<List<Invoice>>> GetAll() =>
        Ok(await _invoiceService.GetAllAsync());

    [HttpGet("{id}")]
    public async Task<ActionResult<Invoice>> GetById(string id)
    {
        var invoice = await _invoiceService.GetByIdAsync(id);
        return invoice is null ? NotFound() : Ok(invoice);
    }

    [HttpPost]
    public async Task<ActionResult<Invoice>> Create(Invoice invoice)
    {
        var created = await _invoiceService.CreateAsync(invoice);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, Invoice invoice)
    {
        var existing = await _invoiceService.GetByIdAsync(id);
        if (existing is null) return NotFound();

        invoice.Id = id;
        await _invoiceService.UpdateAsync(id, invoice);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var existing = await _invoiceService.GetByIdAsync(id);
        if (existing is null) return NotFound();

        await _invoiceService.DeleteAsync(id);
        return NoContent();
    }
}
