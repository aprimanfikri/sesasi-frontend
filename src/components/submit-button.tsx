'use client';

import { Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ButtonVariant =
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link';

type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

type ButtonType = 'submit' | 'button' | 'reset';

interface SubmitButtonProps {
  isPending: boolean;
  text: string;
  type: ButtonType;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: () => void;
}

const SubmitButton = ({
  isPending,
  text,
  className,
  type,
  variant,
  size,
  onClick,
}: SubmitButtonProps) => {
  return (
    <Button
      type={type ?? 'button'}
      variant={variant ?? 'default'}
      size={size ?? 'default'}
      className={cn(className, 'cursor-pointer')}
      disabled={isPending}
      onClick={onClick}
    >
      {isPending ? (
        <>
          <Loader className="animate-spin" size="24" color="#FFFFFF" /> Loading
        </>
      ) : (
        text
      )}
    </Button>
  );
};

export default SubmitButton;
