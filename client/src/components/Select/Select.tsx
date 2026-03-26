import { cn } from '../../lib/utils';

type Option = string | { value: string; label: string };

const Select = ({
  id,
  label,
  value,
  onChange,
  options,
  className,
}: {
  id?: string;
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  className?: string;
}) => {
  return (
    <div className={label ? 'w-full' : undefined}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        id={id}
        value={value}
        onChange={onChange}
        className={cn(
          'border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow',
          className,
        )}
      >
        {options.map((opt) => {
          const val = typeof opt === 'string' ? opt : opt.value;
          const optLabel = typeof opt === 'string' ? opt : opt.label;
          return (
            <option key={val} value={val}>
              {optLabel}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
