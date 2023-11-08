'use client';

import { useSessionContext } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import toast from 'react-hot-toast';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';

interface LikeButtonProps {
    songId: string;
}

const LikeButton = ({ songId }: LikeButtonProps) => {
    const router = useRouter();
    const { supabaseClient } = useSessionContext();

    const authModal = useAuthModal();
    const { user } = useUser();

    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        if (!user?.id) return;

        const fetchData = async () => {
            const { data, error } = await supabaseClient
                .from('liked_songs')
                .select('*')
                .eq('user_id', user.id)
                .eq('song_id', songId)
                .single();

            if (!error && data) {
                setIsLiked(true);
            }
        };

        fetchData();
    }, [songId, supabaseClient, user?.id]);

    const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

    async function handleLike() {
        if (!user) return authModal.onOpen();

        if (isLiked) {
            setIsLiked(false);
            const { error } = await supabaseClient
                .from('liked_songs')
                .delete()
                .eq('user_id', user?.id)
                .eq('song_id', songId);

            if (error) {
                setIsLiked(true);
                return toast.error(error.message);
            }
        } else {
            setIsLiked(true);
            const { error } = await supabaseClient.from('liked_songs').insert({
                song_id: songId,
                user_id: user.id,
            });

            if (error) {
                setIsLiked(false);
                return toast.error(error.message);
            }
        }
        router.refresh();
    }

    return (
        <button onClick={handleLike} className="hover:opacity-75 transition">
            <Icon color={isLiked ? '#22c55e' : 'white'} size={25} />
        </button>
    );
};

export default LikeButton;
