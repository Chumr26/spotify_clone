import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import { Song } from '@/types';

const getSongsByUserId = async (): Promise<Song[]> => {
    const supabase = createServerComponentClient({ cookies: cookies });
    const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

    if (sessionError) {
        console.log(
            'sessionError: ',
            sessionError.message,
            'Date: ',
            new Date().toLocaleString()
        );
        return [];
    } else if (!sessionData.session) return [];

    const { data, error } = await supabase
        .from('songs')
        .select('*')
        .eq('user_id', sessionData.session?.user.id)
        .order('created_at', { ascending: false });

    if (error)
        console.log(
            'getSongByUserId Error: ',
            error,
            'Date: ',
            new Date().toLocaleString()
        );

    return (data as Song[]) || [];
};

export default getSongsByUserId;
