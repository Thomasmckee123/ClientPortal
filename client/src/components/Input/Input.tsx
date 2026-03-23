import { cn } from '../../lib/utils';

const Input = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  required,
  step,
  className,
}: {
  type?: string;
  placeholder?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  step?: string;
  className?: string;
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      step={step}
      className={cn(
        'border border-gray-300 rounded-lg px-3 py-2 text-sm',
        className,
      )}
    />
  );
};

export default Input;
