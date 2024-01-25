import { useSupabaseClient } from '@supabase/auth-helpers-react';

const useLoadSongUrl = (song_path: string) => {
    const supabaseClient = useSupabaseClient();

    if (!song_path) return null;

    const { data } = supabaseClient.storage
        .from('songs')
        .getPublicUrl(song_path);
    return data.publicUrl;
};

export default useLoadSongUrl;
