export interface Invoices {
  invoiceNumber: string;
  dueDate: string;
  clientName: string;
  clientEmail: string;
  lineItems: [
    {
      description: string;
      quantity: number;
      unitPrice: number;
    }
  ];
  taxRate: number;
  notes: string;
}

