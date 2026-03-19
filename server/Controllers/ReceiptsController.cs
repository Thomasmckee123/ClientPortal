using ClientPortal.API.DTOs;
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
    public async Task<ActionResult<Receipt>> Create(CreateReceiptDto dto)
    {
        var receipt = new Receipt
        {
            ReceiptNumber = dto.ReceiptNumber,
            ClientName = dto.ClientName,
            ClientEmail = dto.ClientEmail,
            PaymentMethod = dto.PaymentMethod,
            TransactionId = dto.TransactionId,
            TaxRate = dto.TaxRate,
            Notes = dto.Notes,
            InvoiceId = dto.InvoiceId,
            Items = dto.Items.Select(i => new ReceiptItem
            {
                Description = i.Description,
                Quantity = i.Quantity,
                UnitPrice = i.UnitPrice,
                Amount = i.Quantity * i.UnitPrice
            }).ToList()
        };
        receipt.Subtotal = receipt.Items.Sum(i => i.Amount);
        receipt.TaxAmount = receipt.Subtotal * receipt.TaxRate / 100;
        receipt.Total = receipt.Subtotal + receipt.TaxAmount;

        var created = await _receiptService.CreateAsync(receipt);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, UpdateReceiptDto dto)
    {
        var existing = await _receiptService.GetByIdAsync(id);
        if (existing is null) return NotFound();

        var receipt = new Receipt
        {
            Id = id,
            ReceiptNumber = dto.ReceiptNumber,
            CreatedDate = existing.CreatedDate,
            ClientName = dto.ClientName,
            ClientEmail = dto.ClientEmail,
            PaymentMethod = dto.PaymentMethod,
            TransactionId = dto.TransactionId,
            TaxRate = dto.TaxRate,
            Notes = dto.Notes,
            InvoiceId = dto.InvoiceId,
            Items = dto.Items.Select(i => new ReceiptItem
            {
                Description = i.Description,
                Quantity = i.Quantity,
                UnitPrice = i.UnitPrice,
                Amount = i.Quantity * i.UnitPrice
            }).ToList()
        };
        receipt.Subtotal = receipt.Items.Sum(i => i.Amount);
        receipt.TaxAmount = receipt.Subtotal * receipt.TaxRate / 100;
        receipt.Total = receipt.Subtotal + receipt.TaxAmount;

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
