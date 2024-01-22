import { useSupabaseClient } from '@supabase/auth-helpers-react';

const useLoadPoster = (poster_path: string) => {
    const supabaseClient = useSupabaseClient();

    if (!poster_path) return null;

    const { data } = supabaseClient.storage
        .from('posters')
        .getPublicUrl(poster_path);
    return data.publicUrl;
};

export default useLoadPoster;
