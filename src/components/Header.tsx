'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { BiSearch } from 'react-icons/bi';
import { HiHome } from 'react-icons/hi';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import toast from 'react-hot-toast';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';

import Button from './Button';
import useAuthModal from '@/hooks/useAuthModal';
import { FaUserAlt } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';

interface HeaderProps {
    children: React.ReactNode;
    className?: string;
}

const Header = ({ children, className }: HeaderProps) => {
    const router = useRouter();
    const authModal = useAuthModal();
    const user = useUser();
    const supabaseClient = useSupabaseClient();
    const handleLogout = async () => {
        const { error } = await supabaseClient.auth.signOut();
        router.refresh();
        if (error) {
            toast.error(error.message);
            console.log('handleLogout Error: ', error);
        } else {
            toast.success('Logged out!');
        }
    };
    return (
        <div
            className={twMerge(
                'bg-gradient-to-b from-emerald-800 p-6',
                className
            )}
        >
            <div className="mb-4 flex justify-between">
                <div className="hidden md:flex gap-x-2 items-center">
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
                <div className="flex md:hidden gap-x-2 items-center">
                    <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
                        <HiHome size={20} className="text-black" />
                    </button>
                    <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
                        <BiSearch size={20} className="text-black" />
                    </button>
                </div>
                {user ? (
                    <div className="flex gap-x-4 items-center">
                        <Button
                            onClick={handleLogout}
                            className="bg-white px-4 py-2"
                        >
                            Logout
                        </Button>
                        {user.user_metadata.avatar_url ? (
                            <div
                                onClick={() => router.push('/account')}
                                className="relative h-[40px] w-[40px] rounded-full overflow-hidden border-2 border-white border-opacity-80 drop-shadow-sm cursor-pointer hover:border-opacity-100 transition"
                            >
                                <Image
                                    src={user.user_metadata.avatar_url}
                                    fill
                                    sizes="(min-width: 40px)"
                                    alt="User image"
                                />
                            </div>
                        ) : (
                            <Button
                                onClick={() => router.push('/account')}
                                className="bg-white"
                            >
                                <FaUserAlt />
                            </Button>
                        )}
                    </div>
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
