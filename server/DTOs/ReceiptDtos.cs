namespace ClientPortal.API.DTOs;

public class CreateReceiptDto
{
    public string ReceiptNumber { get; set; } = null!;
    public string ClientName { get; set; } = null!;
    public string ClientEmail { get; set; } = null!;
    public string PaymentMethod { get; set; } = null!;
    public string? TransactionId { get; set; }
    public List<CreateReceiptItemDto> Items { get; set; } = new();
    public decimal TaxRate { get; set; }
    public string? Notes { get; set; }
    public string? InvoiceId { get; set; }
}

public class UpdateReceiptDto
{
    public string ReceiptNumber { get; set; } = null!;
    public string ClientName { get; set; } = null!;
    public string ClientEmail { get; set; } = null!;
    public string PaymentMethod { get; set; } = null!;
    public string? TransactionId { get; set; }
    public List<CreateReceiptItemDto> Items { get; set; } = new();
    public decimal TaxRate { get; set; }
    public string? Notes { get; set; }
    public string? InvoiceId { get; set; }
}

public class CreateReceiptItemDto
{
    public string Description { get; set; } = null!;
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
}
