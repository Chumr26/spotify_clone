import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import { Song } from '@/types';
import getSongs from './getSongs';

const getSongsByTitleOrAuthor = async (q: string): Promise<Song[]> => {
    const supabase = createServerComponentClient({ cookies: cookies });

    if (!q) return await getSongs();

    const { data, error } = await supabase
        .from('songs')
        .select('*')
        .or(`title.ilike.%${q}%,author.ilike.%${q}%`)
        .order('created_at', { ascending: false });
    if (error)
        console.log(
            'getSong Error: ',
            error,
            'Date: ',
            new Date().toLocaleString()
        );
    return (data as Song[]) || [];
};

export default getSongsByTitleOrAuthor;
