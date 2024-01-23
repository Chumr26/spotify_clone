import { useEffect, useState } from 'react';

const useDebounce = <T>(value: T, delay?: number): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedValue(value);
        }, delay || 500);
        return () => clearTimeout(timeoutId);
    }, [value]);

    return debouncedValue;
};
export default useDebounce;
