import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../api';
import type { Portal, TaskItem, Message, FileRecord, Invoice } from '../types';

type Tab = 'overview' | 'files' | 'tasks' | 'messages' | 'invoices';

export default function PortalView() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  const { data: portal, isLoading } = useQuery({
    queryKey: ['portal', slug],
    queryFn: () => api.portals.getBySlug(slug!),
    enabled: !!slug,
  });

  const portalId = portal?.id;

  const { data: tasks = [] } = useQuery({
    queryKey: ['tasks', portalId],
    queryFn: () => api.tasks.getByPortalId(portalId!).catch(() => [] as TaskItem[]),
    enabled: !!portalId,
  });

  const { data: messages = [] } = useQuery({
    queryKey: ['messages', portalId],
    queryFn: () => api.messages.getByPortalId(portalId!).catch(() => [] as Message[]),
    enabled: !!portalId,
  });

  const { data: files = [] } = useQuery({
    queryKey: ['files', portalId],
    queryFn: () => api.files.getByPortalId(portalId!).catch(() => [] as FileRecord[]),
    enabled: !!portalId,
  });

  const { data: invoices = [] } = useQuery({
    queryKey: ['portal-invoices', portalId],
    queryFn: () => api.invoices.getByPortalId(portalId!).catch(() => [] as Invoice[]),
    enabled: !!portalId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-400">Loading portal...</p>
      </div>
    );
  }

  if (!portal) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Portal not found
          </h2>
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-4 text-blue-600 hover:underline text-sm"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'files', label: 'Files' },
    { id: 'tasks', label: 'Tasks' },
    { id: 'messages', label: 'Messages' },
    { id: 'invoices', label: 'Invoices' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div
        className="h-2"
        style={{ backgroundColor: portal.brandColor || '#3B82F6' }}
      />
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <button
              onClick={() => navigate('/dashboard')}
              className="text-sm text-gray-400 hover:text-gray-600 mb-1"
            >
              &larr; Dashboard
            </button>
            <h1 className="text-xl font-bold text-gray-900">{portal.name}</h1>
            <p className="text-sm text-gray-500">
              {portal.clientName} &middot; {portal.clientEmail}
            </p>
          </div>
          <span
            className={`text-xs px-3 py-1 rounded-full font-medium ${
              portal.status === 'Active'
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-500'
            }`}
          >
            {portal.status}
          </span>
        </div>
        <div className="max-w-6xl mx-auto px-6">
          <nav className="flex space-x-1 -mb-px">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {activeTab === 'overview' && (
          <OverviewTab
            portal={portal}
            tasks={tasks}
            files={files}
            invoices={invoices}
            messages={messages}
          />
        )}
        {activeTab === 'files' && (
          <FilesTab portalId={portal.id!} files={files} />
        )}
        {activeTab === 'tasks' && (
          <TasksTab portalId={portal.id!} tasks={tasks} />
        )}
        {activeTab === 'messages' && (
          <MessagesTab portalId={portal.id!} messages={messages} />
        )}
        {activeTab === 'invoices' && (
          <InvoicesTab portalId={portal.id!} invoices={invoices} />
        )}
      </div>
    </div>
  );
}

/* ─── Overview Tab ─── */
function OverviewTab({
  portal,
  tasks,
  files,
  invoices,
  messages,
}: {
  portal: Portal;
  tasks: TaskItem[];
  files: FileRecord[];
  invoices: Invoice[];
  messages: Message[];
}) {
  const unpaid = invoices.filter((i) => i.status !== 'Paid');
  const totalOwed = unpaid.reduce((sum, i) => sum + i.total, 0);

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">Files</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {files.length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">Tasks</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {tasks.filter((t) => t.status === 'done').length}/{tasks.length}
            <span className="text-sm font-normal text-gray-400 ml-1">
              done
            </span>
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">Messages</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {messages.length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">Outstanding</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            £{totalOwed.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            Recent Tasks
          </h3>
          {tasks.length === 0 ? (
            <p className="text-sm text-gray-400">No tasks yet</p>
          ) : (
            <ul className="space-y-2">
              {tasks.slice(0, 5).map((task) => (
                <li key={task.id} className="flex items-center gap-3">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      task.status === 'done'
                        ? 'bg-green-500'
                        : task.status === 'in_progress'
                          ? 'bg-blue-500'
                          : 'bg-gray-300'
                    }`}
                  />
                  <span
                    className={`text-sm ${task.status === 'done' ? 'line-through text-gray-400' : 'text-gray-700'}`}
                  >
                    {task.title}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            Portal Details
          </h3>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-500">Client</dt>
              <dd className="text-gray-900 font-medium">
                {portal.clientName}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Email</dt>
              <dd className="text-gray-900">{portal.clientEmail}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Created</dt>
              <dd className="text-gray-900">
                {new Date(portal.createdAt).toLocaleDateString()}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Status</dt>
              <dd className="text-gray-900">{portal.status}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

/* ─── Files Tab ─── */
function FilesTab({
  portalId,
  files,
}: {
  portalId: string;
  files: FileRecord[];
}) {
  const queryClient = useQueryClient();
  const [showUpload, setShowUpload] = useState(false);
  const [form, setForm] = useState({ fileName: '', fileSize: 0, contentType: 'application/octet-stream' });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['files', portalId] });

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.files.create({
      ...form,
      portalId,
      storagePath: `/uploads/${portalId}/${form.fileName}`,
    });
    setForm({ fileName: '', fileSize: 0, contentType: 'application/octet-stream' });
    setShowUpload(false);
    invalidate();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this file?')) return;
    await api.files.delete(id);
    invalidate();
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Files</h2>
        <button
          onClick={() => setShowUpload(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
        >
          Upload File
        </button>
      </div>

      {showUpload && (
        <form
          onSubmit={handleUpload}
          className="bg-white rounded-xl border border-gray-200 p-6 space-y-4"
        >
          <h3 className="text-sm font-semibold">Upload File</h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="File name"
              value={form.fileName}
              onChange={(e) => setForm({ ...form, fileName: e.target.value })}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
              required
            />
            <input
              placeholder="File size (bytes)"
              type="number"
              value={form.fileSize}
              onChange={(e) =>
                setForm({ ...form, fileSize: parseInt(e.target.value) || 0 })
              }
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              Upload
            </button>
            <button
              type="button"
              onClick={() => setShowUpload(false)}
              className="border border-gray-300 px-4 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                File Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Size
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Uploaded
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {files.map((file) => (
              <tr key={file.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {file.fileName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {formatSize(file.fileSize)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(file.uploadedAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 space-x-2">
                  <button className="text-blue-600 hover:underline text-sm">
                    Download
                  </button>
                  <button
                    onClick={() => handleDelete(file.id!)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {files.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-12 text-center text-gray-400 text-sm"
                >
                  No files uploaded yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── Tasks Tab (Kanban) ─── */
function TasksTab({
  portalId,
  tasks,
}: {
  portalId: string;
  tasks: TaskItem[];
}) {
  const queryClient = useQueryClient();
  const [newTask, setNewTask] = useState('');

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['tasks', portalId] });

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    await api.tasks.create({ title: newTask.trim(), status: 'todo', portalId });
    setNewTask('');
    invalidate();
  };

  const handleStatusChange = async (
    task: TaskItem,
    newStatus: TaskItem['status'],
  ) => {
    await api.tasks.update(task.id!, {
      title: task.title,
      status: newStatus,
      portalId: task.portalId,
    });
    invalidate();
  };

  const handleDelete = async (id: string) => {
    await api.tasks.delete(id);
    invalidate();
  };

  const columns: { status: TaskItem['status']; label: string; color: string }[] = [
    { status: 'todo', label: 'To Do', color: 'bg-gray-100' },
    { status: 'in_progress', label: 'In Progress', color: 'bg-blue-50' },
    { status: 'done', label: 'Done', color: 'bg-green-50' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Task Board</h2>
      </div>

      {/* Add task form */}
      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
        >
          Add Task
        </button>
      </form>

      {/* Kanban columns */}
      <div className="grid grid-cols-3 gap-4">
        {columns.map((col) => (
          <div key={col.status} className={`${col.color} rounded-xl p-4`}>
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center justify-between">
              {col.label}
              <span className="text-xs font-normal bg-white rounded-full px-2 py-0.5 text-gray-500">
                {tasks.filter((t) => t.status === col.status).length}
              </span>
            </h3>
            <div className="space-y-2">
              {tasks
                .filter((t) => t.status === col.status)
                .map((task) => (
                  <div
                    key={task.id}
                    className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 flex-1">
                        <button
                          onClick={() =>
                            handleStatusChange(
                              task,
                              task.status === 'done' ? 'todo' : 'done',
                            )
                          }
                          className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                            task.status === 'done'
                              ? 'border-green-500 bg-green-500'
                              : 'border-gray-300 hover:border-blue-400'
                          }`}
                        >
                          {task.status === 'done' && (
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </button>
                        <span
                          className={`text-sm ${task.status === 'done' ? 'line-through text-gray-400' : 'text-gray-800'}`}
                        >
                          {task.title}
                        </span>
                      </div>
                      <button
                        onClick={() => handleDelete(task.id!)}
                        className="text-gray-300 hover:text-red-500 text-xs"
                      >
                        &times;
                      </button>
                    </div>
                    {task.status !== 'done' && (
                      <div className="mt-2 flex gap-1">
                        {col.status !== 'todo' && (
                          <button
                            onClick={() =>
                              handleStatusChange(
                                task,
                                col.status === 'in_progress'
                                  ? 'todo'
                                  : 'in_progress',
                              )
                            }
                            className="text-xs text-gray-400 hover:text-gray-600"
                          >
                            &larr;
                          </button>
                        )}
                        {col.status !== 'done' && (
                          <button
                            onClick={() =>
                              handleStatusChange(
                                task,
                                col.status === 'todo'
                                  ? 'in_progress'
                                  : 'done',
                              )
                            }
                            className="text-xs text-gray-400 hover:text-gray-600"
                          >
                            &rarr;
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Messages Tab ─── */
function MessagesTab({
  portalId,
  messages,
}: {
  portalId: string;
  messages: Message[];
}) {
  const queryClient = useQueryClient();
  const [newMessage, setNewMessage] = useState('');

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    await api.messages.create({
      body: newMessage.trim(),
      senderName: 'Owner',
      senderRole: 'owner',
      portalId,
    });
    setNewMessage('');
    queryClient.invalidateQueries({ queryKey: ['messages', portalId] });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Messages</h2>

      <div className="bg-white rounded-xl border border-gray-200 flex flex-col" style={{ height: '500px' }}>
        {/* Message list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 ? (
            <p className="text-sm text-gray-400 text-center mt-8">
              No messages yet. Start the conversation!
            </p>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.senderRole === 'owner' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-md rounded-xl px-4 py-3 ${
                    msg.senderRole === 'owner'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-xs font-medium opacity-75 mb-1">
                    {msg.senderName}
                  </p>
                  <p className="text-sm">{msg.body}</p>
                  <p className="text-xs opacity-50 mt-1">
                    {new Date(msg.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input */}
        <form
          onSubmit={handleSend}
          className="border-t border-gray-200 p-4 flex gap-2"
        >
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

/* ─── Invoices Tab ─── */
function InvoicesTab({
  portalId,
  invoices,
}: {
  portalId: string;
  invoices: Invoice[];
}) {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    invoiceNumber: '',
    dueDate: '',
    clientName: '',
    clientEmail: '',
    taxRate: 0,
    notes: '',
    lineItems: [{ description: '', quantity: 1, unitPrice: 0 }],
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['portal-invoices', portalId] });

  const resetForm = () => {
    setForm({
      invoiceNumber: '',
      dueDate: '',
      clientName: '',
      clientEmail: '',
      taxRate: 0,
      notes: '',
      lineItems: [{ description: '', quantity: 1, unitPrice: 0 }],
    });
    setShowForm(false);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.invoices.create({ ...form, portalId });
    resetForm();
    invalidate();
  };

  const addLineItem = () => {
    setForm({
      ...form,
      lineItems: [
        ...form.lineItems,
        { description: '', quantity: 1, unitPrice: 0 },
      ],
    });
  };

  const updateLineItem = (i: number, field: string, value: string | number) => {
    const items = [...form.lineItems];
    items[i] = { ...items[i], [field]: value };
    setForm({ ...form, lineItems: items });
  };

  const statusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800';
      case 'Sent':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Invoices</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
        >
          New Invoice
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleCreate}
          className="bg-white rounded-xl border border-gray-200 p-6 space-y-4"
        >
          <h3 className="text-sm font-semibold">New Invoice</h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="Invoice Number (e.g. INV-0001)"
              value={form.invoiceNumber}
              onChange={(e) =>
                setForm({ ...form, invoiceNumber: e.target.value })
              }
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
              required
            />
            <input
              type="date"
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
              required
            />
            <input
              placeholder="Client Name"
              value={form.clientName}
              onChange={(e) => setForm({ ...form, clientName: e.target.value })}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
              required
            />
            <input
              placeholder="Client Email"
              type="email"
              value={form.clientEmail}
              onChange={(e) =>
                setForm({ ...form, clientEmail: e.target.value })
              }
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
              required
            />
            <input
              placeholder="Tax Rate (%)"
              type="number"
              step="0.01"
              value={form.taxRate}
              onChange={(e) =>
                setForm({ ...form, taxRate: parseFloat(e.target.value) || 0 })
              }
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <input
            placeholder="Notes"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full"
          />
          <div>
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-sm">Line Items</h4>
              <button
                type="button"
                onClick={addLineItem}
                className="text-blue-600 text-sm hover:underline"
              >
                + Add Item
              </button>
            </div>
            {form.lineItems.map((item, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) =>
                    updateLineItem(i, 'description', e.target.value)
                  }
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm flex-1"
                  required
                />
                <input
                  placeholder="Qty"
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    updateLineItem(i, 'quantity', parseInt(e.target.value) || 0)
                  }
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-20"
                  required
                />
                <input
                  placeholder="Unit Price"
                  type="number"
                  step="0.01"
                  value={item.unitPrice}
                  onChange={(e) =>
                    updateLineItem(
                      i,
                      'unitPrice',
                      parseFloat(e.target.value) || 0,
                    )
                  }
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-32"
                  required
                />
                {form.lineItems.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      setForm({
                        ...form,
                        lineItems: form.lineItems.filter(
                          (_, idx) => idx !== i,
                        ),
                      })
                    }
                    className="text-red-500 hover:text-red-700 px-2"
                  >
                    X
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              Create Invoice
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="border border-gray-300 px-4 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Invoice list */}
      <div className="space-y-3">
        {invoices.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-gray-400 text-sm">No invoices for this portal</p>
          </div>
        ) : (
          invoices.map((inv) => (
            <div
              key={inv.id}
              className="bg-white rounded-xl border border-gray-200 p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">
                    {inv.invoiceNumber}
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Due: {new Date(inv.dueDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-gray-900">
                    £{inv.total.toFixed(2)}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor(inv.status)}`}
                  >
                    {inv.status}
                  </span>
                  {inv.status === 'Sent' && (
                    <button className="bg-green-600 text-white px-3 py-1 rounded-lg text-xs font-medium hover:bg-green-700">
                      Pay Now
                    </button>
                  )}
                </div>
              </div>
              {inv.lineItems.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="text-gray-500">
                        <th className="text-left py-1">Description</th>
                        <th className="text-right py-1">Qty</th>
                        <th className="text-right py-1">Rate</th>
                        <th className="text-right py-1">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inv.lineItems.map((li, idx) => (
                        <tr key={idx} className="text-gray-700">
                          <td className="py-1">{li.description}</td>
                          <td className="text-right py-1">{li.quantity}</td>
                          <td className="text-right py-1">
                            £{li.unitPrice.toFixed(2)}
                          </td>
                          <td className="text-right py-1">
                            £{li.amount.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="border-t border-gray-100">
                      <tr className="text-gray-500">
                        <td colSpan={3} className="text-right py-1">
                          Subtotal
                        </td>
                        <td className="text-right py-1">
                          £{inv.subtotal.toFixed(2)}
                        </td>
                      </tr>
                      {inv.taxAmount > 0 && (
                        <tr className="text-gray-500">
                          <td colSpan={3} className="text-right py-1">
                            Tax ({inv.taxRate}%)
                          </td>
                          <td className="text-right py-1">
                            £{inv.taxAmount.toFixed(2)}
                          </td>
                        </tr>
                      )}
                      <tr className="font-semibold text-gray-900">
                        <td colSpan={3} className="text-right py-1">
                          Total
                        </td>
                        <td className="text-right py-1">
                          £{inv.total.toFixed(2)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
