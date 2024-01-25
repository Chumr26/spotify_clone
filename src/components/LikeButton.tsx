'use client';

import { useContext, useEffect, useRef, useState } from 'react';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import useAuthModal from '@/hooks/useAuthModal';
import { LikedSongContext } from '@/provider/LikedSongsProvider';

const LikeButton = ({ songId }: { songId: string }) => {
    const likedSongs = useContext(LikedSongContext);
    const isInArr = () => !!likedSongs.find((song) => song.id === songId);
    const [isLiked, setIsLiked] = useState(isInArr);

    const timeoutId = useRef<NodeJS.Timeout>();
    const router = useRouter();
    const user = useUser();
    const supabaseClient = useSupabaseClient();
    const authModal = useAuthModal();

    const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

    useEffect(() => setIsLiked(isInArr), [likedSongs]);

    const handleClick = () => {
        if (!user) return authModal.handleOpen();
        setIsLiked(!isLiked);

        clearTimeout(timeoutId.current);
        timeoutId.current = setTimeout(async () => {
            if (isLiked) {
                const { error } = await supabaseClient
                    .from('liked_songs')
                    .delete()
                    .eq('user_id', user.id)
                    .eq('song_id', songId);
                if (error) {
                    setIsLiked(true);
                    toast.error('Unlike song Error');
                    console.log(
                        'Unlike song Error: ',
                        error.message,
                        'Date: ',
                        new Date().toLocaleString()
                    );
                }
            } else {
                const { error } = await supabaseClient
                    .from('liked_songs')
                    .insert({ song_id: songId, user_id: user.id });
                if (error) {
                    setIsLiked(false);
                    toast.error('Like song Error');
                    console.log(
                        'Like song Error: ',
                        error.message,
                        'Date: ',
                        new Date().toLocaleString()
                    );
                }
            }
            router.refresh();
        }, 500);
    };

    return (
        <button onClick={handleClick} className="hover:opacity-75 transition">
            <Icon size={25} color={isLiked ? '#22c55e' : 'white'} />
        </button>
    );
};
export default LikeButton;
