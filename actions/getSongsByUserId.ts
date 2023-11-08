import { Song } from '@/types';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const getSongsByUserId = async (): Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies,
    });

    const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

    if (sessionError) {
        console.log('sessionError: ', sessionError.message);
        return [];
    }

    // If the current session has user
    if (sessionData.session?.user.id) {
        const { data, error } = await supabase
            .from('songs')
            .select('*')
            .eq('user_id', sessionData.session?.user.id)
            .order('created_at', { ascending: false });

        if (error) {
            console.log('getSongsByUserId: ', error.message);
        } else {
            return data as any;
        }
    }

    return [];
};

export default getSongsByUserId;
