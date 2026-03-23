import { cn } from '../../lib/utils';

const variantStyles = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  danger: 'bg-red-600 text-white hover:bg-red-700',
  secondary: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-xs rounded-lg',
  md: 'px-4 py-2 text-sm rounded-lg',
};

const Button = ({
  children,
  text,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  className,
}: {
  children?: React.ReactNode;
  text?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: keyof typeof variantStyles;
  size?: keyof typeof sizeStyles;
  className?: string;
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        'font-medium transition-colors cursor-pointer',
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
    >
      {children ?? text}
    </button>
  );
};

export default Button;
