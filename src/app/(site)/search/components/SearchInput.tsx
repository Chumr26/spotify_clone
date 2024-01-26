'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import useDebounce from '@/hooks/useDebounce';
import Input from '@/components/Input';

const SearchInput = () => {
    const [value, setValue] = useState<string>('');
    const debouncedValue = useDebounce<string>(value, 500);

    const router = useRouter();

    useEffect(() => {
        router.push(`/search?title=${debouncedValue}`);
    }, [debouncedValue]);

    return (
        <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="What do you want to listen to ?"
        />
    );
};
export default SearchInput;
