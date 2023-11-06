import { useSupabaseClient } from '@supabase/auth-helpers-react';

import { Song } from '@/types';

const useLoadImage = (song: Song) => {
    if (!song) return null;

    const supabaseClient = useSupabaseClient();
    const { data: imageData } = supabaseClient.storage
        .from('images')
        .getPublicUrl(song.image_path);

    return imageData.publicUrl;
};

export default useLoadImage;
