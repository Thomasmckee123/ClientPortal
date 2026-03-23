import type { Portal, TaskItem, Message, FileRecord, Invoice } from './types';

const BASE = '/api';

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${url}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  if (res.status === 204) return undefined as T;
  return res.json();
}

export const api = {
  invoices: {
    getAll: () => request<Invoice[]>('/invoices'),
    getById: (id: string) => request<Invoice>(`/invoices/${id}`),
    getByPortalId: (portalId: string) => request<Invoice[]>(`/invoices/portal/${portalId}`),
    create: (data: any) => request<Invoice>('/invoices', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: any) => request<void>(`/invoices/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: string) => request<void>(`/invoices/${id}`, { method: 'DELETE' }),
  },
  receipts: {
    getAll: () => request<any[]>('/receipts'),
    getById: (id: string) => request<any>(`/receipts/${id}`),
    create: (data: any) => request<any>('/receipts', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: any) => request<void>(`/receipts/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: string) => request<void>(`/receipts/${id}`, { method: 'DELETE' }),
  },
  clients: {
    getAll: () => request<any[]>('/client'),
    getById: (id: string) => request<any>(`/client/${id}`),
    create: (data: any) => request<any>('/client', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: any) => request<void>(`/client/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: string) => request<void>(`/client/${id}`, { method: 'DELETE' }),
  },
  users: {
    getAll: () => request<any[]>('/users'),
    getById: (id: string) => request<any>(`/users/${id}`),
    create: (data: any) => request<any>('/users', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: any) => request<void>(`/users/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: string) => request<void>(`/users/${id}`, { method: 'DELETE' }),
  },
  accounts: {
    getAll: () => request<any[]>('/accounts'),
    getById: (id: string) => request<any>(`/accounts/${id}`),
    create: (data: any) => request<any>('/accounts', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: any) => request<void>(`/accounts/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: string) => request<void>(`/accounts/${id}`, { method: 'DELETE' }),
  },
  portals: {
    getAll: () => request<Portal[]>('/portals'),
    getById: (id: string) => request<Portal>(`/portals/${id}`),
    getBySlug: (slug: string) => request<Portal>(`/portals/slug/${slug}`),
    create: (data: any) => request<Portal>('/portals', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: any) => request<void>(`/portals/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: string) => request<void>(`/portals/${id}`, { method: 'DELETE' }),
  },
  tasks: {
    getByPortalId: (portalId: string) => request<TaskItem[]>(`/tasks/portal/${portalId}`),
    create: (data: any) => request<TaskItem>('/tasks', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: any) => request<void>(`/tasks/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: string) => request<void>(`/tasks/${id}`, { method: 'DELETE' }),
  },
  messages: {
    getByPortalId: (portalId: string) => request<Message[]>(`/messages/portal/${portalId}`),
    create: (data: any) => request<Message>('/messages', { method: 'POST', body: JSON.stringify(data) }),
  },
  files: {
    getByPortalId: (portalId: string) => request<FileRecord[]>(`/files/portal/${portalId}`),
    create: (data: any) => request<FileRecord>('/files', { method: 'POST', body: JSON.stringify(data) }),
    delete: (id: string) => request<void>(`/files/${id}`, { method: 'DELETE' }),
  },
};
