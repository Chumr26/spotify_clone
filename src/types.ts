export interface Song {
    id: string;
    title: string;
    author: string;
    song_path: string;
    poster_path: string;
    user_id: string;
    youtube_poster: string | null;
    updated_poster?: string;
}
