export interface Invoice {
  id?: string;
  invoiceNumber: string;
  createdDate: string;
  dueDate: string;
  clientName: string;
  clientEmail: string;
  lineItems: LineItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  status: string;
  notes?: string;
}

export interface LineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface Receipt {
  id?: string;
  receiptNumber: string;
  createdDate: string;
  clientName: string;
  clientEmail: string;
  paymentMethod: string;
  transactionId?: string;
  items: ReceiptItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  notes?: string;
  invoiceId?: string;
}

export interface ReceiptItem {
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface Client {
  id?: string;
  userId: number;
  name: string;
  balance: number;
  userTypeId: number;
}

export interface User {
  id?: string;
  email: string;
  accountId: number;
  password: string;
}

export interface Account {
  id?: string;
  accountType: string;
}
