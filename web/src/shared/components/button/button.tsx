import { cn } from '@libs/cn';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  children: ReactNode;
};

const Button = ({ className = '', children }: ButtonProps) => {
  const baseClass =
    'flex-row-center cursor-pointer ' +
    'py-[1.6rem] w-full rounded-[16px] ' +
    'disabled:cursor-default';

  return (
    <button type="button" className={cn(baseClass, className)}>
      <span className="h3">{children}</span>
    </button>
  );
};

export default Button;
