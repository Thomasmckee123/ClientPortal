import { cn } from '../../lib/utils';

type Option = string | { value: string; label: string };

const Select = ({
  value,
  onChange,
  options,
  className,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  className?: string;
}) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className={cn(
        'border border-gray-300 rounded-lg px-3 py-2 text-sm',
        className,
      )}
    >
      {options.map((opt) => {
        const val = typeof opt === 'string' ? opt : opt.value;
        const label = typeof opt === 'string' ? opt : opt.label;
        return (
          <option key={val} value={val}>
            {label}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
