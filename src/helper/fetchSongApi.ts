interface ResponeType {
    title: string;
    link: string;
    status: string;
    progress: string;
    msg: string;
}

type fetchSongApiType = (videoId: string) => Promise<ResponeType | undefined>;

const fetchSongApi: fetchSongApiType = async (videoId) => {
    try {
        const data = (await (
            await fetch(`${process.env.NEXT_PUBLIC_Y2M_URL}?id=${videoId}`, {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY!,
                    'X-RapidAPI-Host': process.env.NEXT_PUBLIC_Y2M_HOST!,
                },
            })
        ).json()) as ResponeType;

        if (data.status === 'processing') {
            await new Promise<void>((resolve) =>
                setTimeout(() => resolve(), 1000)
            );
            return await fetchSongApi(videoId);
        } else return data;
    } catch (error) {
        console.log('fetchSongApi Error: ', error);
    }
};

export default fetchSongApi;
