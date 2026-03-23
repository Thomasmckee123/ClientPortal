import { cn } from '../../lib/utils';

interface Column<T> {
  header: string;
  accessor?: keyof T;
  render?: (row: T) => React.ReactNode;
  className?: string;
}

const Table = <T extends { id?: string }>({
  columns,
  data,
  emptyMessage = 'No data yet',
  className,
}: {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
  className?: string;
}) => {
  return (
    <div className={cn('bg-white rounded-xl border border-gray-200 overflow-hidden', className)}>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 text-left border-b border-gray-200">
            {columns.map((col) => (
              <th
                key={col.header}
                className="px-6 py-3 text-xs font-medium text-gray-500 uppercase"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {columns.map((col) => (
                <td
                  key={col.header}
                  className={cn('px-6 py-4 text-sm text-gray-600', col.className)}
                >
                  {col.render
                    ? col.render(row)
                    : col.accessor
                      ? String(row[col.accessor] ?? '')
                      : null}
                </td>
              ))}
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-12 text-center text-gray-400 text-sm"
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
