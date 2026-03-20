import { cn } from '../../lib/utils';

const Button = ({
  text,
  onClick,
  className,
}: {
  text: string;
  onClick: () => void;
  className?: string;
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        `px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors`,
        className,
      )}
    >
      {text}
    </button>
  );
};

export default Button;
