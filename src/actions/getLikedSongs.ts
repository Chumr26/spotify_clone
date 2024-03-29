import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import { Song } from '@/types';

const getLikedSongs = async (): Promise<Song[]> => {
    const supabase = createServerComponentClient({ cookies: cookies });

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user.id) return [];

    const { data, error } = await supabase
        .from('liked_songs')
        .select('*, songs(*)')
        .eq('user_id', session?.user.id)
        .order('created_at', { ascending: false });
    if (error) {
        console.log(
            'getLikedSong Error: ',
            error,
            'Date: ',
            new Date().toLocaleString()
        );
        return [];
    } else if (!data) {
        return [];
    } else return data.map((record) => ({ ...record.songs }));
};

export default getLikedSongs;
