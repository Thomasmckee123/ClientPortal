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
  portalId?: string;
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

export interface Portal {
  id?: string;
  name: string;
  slug: string;
  clientName: string;
  clientEmail: string;
  ownerId: string;
  brandColor?: string;
  logoUrl?: string;
  status: string;
  createdAt: string;
}

export interface TaskItem {
  id?: string;
  title: string;
  status: 'todo' | 'in_progress' | 'done';
  portalId: string;
  createdAt: string;
}

export interface Message {
  id?: string;
  body: string;
  senderName: string;
  senderRole: 'owner' | 'client';
  portalId: string;
  createdAt: string;
}

export interface FileRecord {
  id?: string;
  fileName: string;
  fileSize: number;
  contentType: string;
  storagePath: string;
  portalId: string;
  uploadedAt: string;
}
