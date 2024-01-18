
interface BoxProps {
    children: React.ReactNode;
    className?: string;
}

const Box = ({ children, className }: BoxProps) => {
    return (
        <div className={`bg-neutral-900 rounded-lg w-full ${className}`}>
            {children}
        </div>
    );
};

export default Box;
