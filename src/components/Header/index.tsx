'use client';

import { useRouter } from 'next/navigation';
import { BiSearch } from 'react-icons/bi';
import { HiHome } from 'react-icons/hi';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import { useUser } from '@supabase/auth-helpers-react';
import { twMerge } from 'tailwind-merge';

import Button from '../Button';
import useAuthModal from '@/hooks/useAuthModal';
import Account from './Account';

interface HeaderProps {
    children: React.ReactNode;
    className?: string;
}

const Header = ({ children, className }: HeaderProps) => {
    const router = useRouter();
    const authModal = useAuthModal();
    const user = useUser();

    return (
        <div
            className={twMerge(
                'bg-gradient-to-b from-emerald-800 p-6',
                className
            )}
        >
            <div className="mb-4 flex justify-between">
                <div className="flex gap-x-2 items-center">
                    <button
                        onClick={() => router.back()}
                        className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
                    >
                        <RxCaretLeft size={35} />
                    </button>
                    <button
                        onClick={() => router.forward()}
                        className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
                    >
                        <RxCaretRight size={35} />
                    </button>
                </div>
                {user ? (
                    <Account user={user} />
                ) : (
                    <div>
                        <Button
                            onClick={authModal.handleOpen}
                            className="bg-white px-6 py-2"
                        >
                            Login
                        </Button>
                    </div>
                )}
            </div>
            {children}
        </div>
    );
};

export default Header;
