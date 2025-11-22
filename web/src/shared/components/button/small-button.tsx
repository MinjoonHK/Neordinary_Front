import { cn } from '@libs/cn';
import type { ButtonHTMLAttributes } from 'react';

type SmallButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'title'
> & {
  className?: string;
  title: string;
};

const SmallButton = ({
  className = 'bg-gray-10 text-black',
  title,
}: SmallButtonProps) => {
  const baseClass =
    'flex-row-center cursor-pointer ' +
    'px-[1.6rem] py-[1.2rem] rounded-[16px] ' +
    'disabled:cursor-default';

  return (
    <button type="button" className={cn(baseClass, className)}>
      <span className="b1">{title}</span>
    </button>
  );
};

export default SmallButton;
