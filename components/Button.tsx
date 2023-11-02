import { twMerge } from 'tailwind-merge';

import { forwardRef } from 'react';

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ type = 'button', className, children, disabled, ...props }, ref) => {
        return (
            <button
                type={type}
                className={twMerge(
                    `w-full rounded-full bg-green-500 border border-transparent p-3 
                        disabled:cursor-not-allowed disabled:opacity-50 text-black 
                        font-bold hover:opacity-75 transition`,
                    className
                )}
                disabled={disabled}
                ref={ref}
                {...props}
            >{children}</button>
        );
    }
);

// Button.displayName = 'Button';

export default Button;
