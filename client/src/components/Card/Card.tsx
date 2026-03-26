import { cn } from '../../lib/utils';

const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={cn('border border-gray-300 rounded-lg p-4', className)}>
      {children}
    </div>
  );
};

export default Card;
