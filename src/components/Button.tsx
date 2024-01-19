import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, children, type = 'button', ...props }: ButtonProps, ref) => {
        return (
            <button
                ref={ref}
                type={type}
                className={twMerge(
                    'rounded-full bg-green-500 px-3 py-3 text-black font-bold hover:opacity-75 transition',
                    className
                )}
                {...props}
            >
                {children}
            </button>
        );
    }
);

export default Button;
