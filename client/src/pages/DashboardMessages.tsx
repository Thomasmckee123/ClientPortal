import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import type { Message } from '../types';

export default function DashboardMessages() {
  const navigate = useNavigate();
  const { data: portals = [] } = useQuery({ queryKey: ['portals'], queryFn: api.portals.getAll });
  const { data: messagesByPortal = {} } = useQuery<Record<string, Message[]>>({
    queryKey: ['messages-by-portal', portals.map((p) => p.id)],
    queryFn: async () => {
      const msgs: Record<string, Message[]> = {};
      await Promise.all(
        portals.map(async (portal) => {
          try {
            msgs[portal.id!] = await api.messages.getByPortalId(portal.id!);
          } catch {
            msgs[portal.id!] = [];
          }
        }),
      );
      return msgs;
    },
    enabled: portals.length > 0,
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Messages</h1>

      {portals.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-400 text-sm">
            No message threads yet. Create a portal to start messaging.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {portals.map((portal) => {
            const messages = messagesByPortal[portal.id!] || [];
            const lastMessage = messages[messages.length - 1];
            return (
              <div
                key={portal.id}
                onClick={() => navigate(`/p/${portal.slug}`)}
                className="bg-white rounded-xl border border-gray-200 p-5 cursor-pointer hover:shadow-md transition-all hover:border-gray-300 flex items-center justify-between"
              >
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    {portal.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {portal.clientName} &middot; {portal.clientEmail}
                  </p>
                  {lastMessage ? (
                    <p className="text-sm text-gray-600 mt-2 truncate max-w-md">
                      <span className="font-medium">
                        {lastMessage.senderName}:
                      </span>{' '}
                      {lastMessage.body}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-400 mt-2">
                      No messages yet
                    </p>
                  )}
                </div>
                <div className="text-right">
                  {lastMessage && (
                    <p className="text-xs text-gray-400">
                      {new Date(lastMessage.createdAt).toLocaleDateString()}
                    </p>
                  )}
                  {messages.length > 0 && (
                    <span className="inline-block mt-1 bg-indigo-100 text-indigo-700 text-xs font-medium px-2 py-0.5 rounded-full">
                      {messages.length}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
