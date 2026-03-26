import { cn } from '../../lib/utils';

const Input = ({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  required,
  step,
  disabled,
  minLength,
  className,
}: {
  id?: string;
  label?: string;
  type?: string;
  placeholder?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  step?: string;
  disabled?: boolean;
  minLength?: number;
  className?: string;
}) => {
  return (
    <div className={label ? 'w-full' : undefined}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        step={step}
        disabled={disabled}
        minLength={minLength}
        className={cn(
          'border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow',
          disabled && 'opacity-60 cursor-not-allowed',
          className,
        )}
      />
    </div>
  );
};

export default Input;
