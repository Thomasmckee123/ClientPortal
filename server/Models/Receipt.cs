using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ClientPortal.API.Models;

public class Receipt
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    public string ReceiptNumber { get; set; } = null!;
    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

    public string ClientName { get; set; } = null!;
    public string ClientEmail { get; set; } = null!;

    public string PaymentMethod { get; set; } = null!; // Cash, Card, Transfer, etc.
    public string? TransactionId { get; set; }

    public List<ReceiptItem> Items { get; set; } = new();

    public decimal Subtotal { get; set; }
    public decimal TaxRate { get; set; }
    public decimal TaxAmount { get; set; }
    public decimal Total { get; set; }

    public string? Notes { get; set; }
    public string? InvoiceId { get; set; } // Optional link to an invoice
}

public class ReceiptItem
{
    public string Description { get; set; } = null!;
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal Amount { get; set; }
}
