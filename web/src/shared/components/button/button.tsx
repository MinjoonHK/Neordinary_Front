import { cn } from '@libs/cn';
import type { ButtonHTMLAttributes } from 'react';

type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'title'
> & {
  startIcon?: string;
  className?: string;
  title: string;
};

const Button = ({ className = '', title, startIcon, ...rest }: ButtonProps) => {
  const baseClass =
    'flex-row-center cursor-pointer ' +
    'py-[1.6rem] w-full rounded-[16px] ' +
    'disabled:cursor-default';

  return (
    <button type="button" className={cn(baseClass, className)} {...rest}>
      {startIcon && (
        <img className="mr-[0.32rem]" src={startIcon} alt="Image not found" />
      )}
      <span className="h3">{title}</span>
    </button>
  );
};

export default Button;
