using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ClientPortal.API.Models;

public class Invoice
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    public string InvoiceNumber { get; set; } = null!;
    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    public DateTime DueDate { get; set; }

    public string ClientName { get; set; } = null!;
    public string ClientEmail { get; set; } = null!;

    public List<LineItem> LineItems { get; set; } = new();

    public decimal Subtotal { get; set; }
    public decimal TaxRate { get; set; }
    public decimal TaxAmount { get; set; }
    public decimal Total { get; set; }

    public string Status { get; set; } = "Draft"; // Draft, Sent, Paid, Overdue
    public string? Notes { get; set; }
}

public class LineItem
{
    public string Description { get; set; } = null!;
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal Amount { get; set; }
}
