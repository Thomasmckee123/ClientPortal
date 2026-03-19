namespace ClientPortal.API.DTOs;

public class CreateInvoiceDto
{
    public string InvoiceNumber { get; set; } = null!;
    public DateTime DueDate { get; set; }
    public string ClientName { get; set; } = null!;
    public string ClientEmail { get; set; } = null!;
    public List<CreateLineItemDto> LineItems { get; set; } = new();
    public decimal TaxRate { get; set; }
    public string? Notes { get; set; }
}

public class UpdateInvoiceDto
{
    public string InvoiceNumber { get; set; } = null!;
    public DateTime DueDate { get; set; }
    public string ClientName { get; set; } = null!;
    public string ClientEmail { get; set; } = null!;
    public List<CreateLineItemDto> LineItems { get; set; } = new();
    public decimal TaxRate { get; set; }
    public string Status { get; set; } = null!;
    public string? Notes { get; set; }
}

public class CreateLineItemDto
{
    public string Description { get; set; } = null!;
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
}
