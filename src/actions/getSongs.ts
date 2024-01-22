import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export interface Song {
    id: string;
    title: string;
    author: string;
    song_path: string;
    poster_path: string;
    user_id: string;
}

const getSongs = async (): Promise<Song[]> => {
    const supabase = createServerComponentClient({ cookies: cookies });

    const { data, error } = await supabase
        .from('songs')
        .select('*')
        .order('created_at', { ascending: false });
    if (error) console.log('getSong Error: ', error);
    return (data as Song[]) || [];
};

export default getSongs;
