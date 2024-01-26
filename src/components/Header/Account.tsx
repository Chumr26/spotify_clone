import { FaUserAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import type { User } from '@supabase/auth-helpers-nextjs';
import toast from 'react-hot-toast';
import * as HoverCard from '@radix-ui/react-hover-card';

import Button from '../Button';
import usePlayer from '@/hooks/usePlayer';

const Account = ({ user }: { user: User }) => {
    const supabaseClient = useSupabaseClient();
    const router = useRouter();

    const player = usePlayer();

    const handleLogout = async () => {
        const { error } = await supabaseClient.auth.signOut();
        player.reset();
        router.refresh();
        if (error) {
            toast.error(error.message);
            console.log(
                'handleLogout Error: ',
                error,
                'Date: ',
                new Date().toLocaleString()
            );
        } else {
            toast.success('Logged out!');
        }
    };
    return (
        <div className="flex gap-x-4 items-center">
            <Button onClick={handleLogout} className="bg-white px-4 py-2">
                Logout
            </Button>
            <HoverCard.Root openDelay={100} closeDelay={100}>
                <HoverCard.Trigger>
                    {user.user_metadata.avatar_url ? (
                        <div className="relative h-[40px] w-[40px] rounded-full overflow-hidden border-2 border-white border-opacity-80 drop-shadow-sm hover:border-opacity-100 transition">
                            <img
                                src={user.user_metadata.avatar_url}
                                alt="User image"
                            />
                        </div>
                    ) : (
                        <Button className="bg-white cursor-default">
                            <FaUserAlt />
                        </Button>
                    )}
                </HoverCard.Trigger>
                <HoverCard.Portal>
                    <HoverCard.Content sideOffset={5}>
                        <div className="bg-neutral-900 w-auto p-4 rounded-lg mr-3">
                            <p>{user.user_metadata.preferred_username}</p>
                            <p className="text-neutral-400">{user.email}</p>
                            <p className="text-neutral-400 text-center">
                                ({user.app_metadata.provider})
                            </p>
                        </div>
                        <HoverCard.Arrow className="fill-neutral-900" />
                    </HoverCard.Content>
                </HoverCard.Portal>
            </HoverCard.Root>
        </div>
    );
};
export default Account;
