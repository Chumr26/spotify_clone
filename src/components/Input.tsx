import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, disabled, ...props }, ref) => {
        return (
            <input
                type={type}
                ref={ref}
                disabled={disabled}
                className={twMerge(
                    'w-full px-3 py-3 rounded-md bg-neutral-700 focus:outline-none placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 file:border-0 file:bg-transparent',
                    className
                )}
                {...props}
            />
        );
    }
);

export default Input;
