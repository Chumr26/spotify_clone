const fetchPosterApi = async (query: string) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SPOTIFY_URL}/search?type=tracks&limit=1&q=${query}`,
        {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY!,
                'X-RapidAPI-Host': process.env.NEXT_PUBLIC_SPOTIFY_HOST!,
            },
        }
    );
    return await res.json();
};
export default fetchPosterApi;
