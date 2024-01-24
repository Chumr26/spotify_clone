import Image from 'next/image';

import getLikedSongs from '@/actions/getLikedSongs';
import Box from '@/components/Box';
import Header from '@/components/Header';
import LikedContent from './components/LikedContent';

const Liked = async () => {
    const songs = await getLikedSongs();
    return (
        <Box className="h-full overflow-hidden">
            <Header>
                <div className="mt-10 md:mt-14 flex flex-col md:flex-row items-center gap-x-5">
                    <div className="relative h-32 w-32 lg:h-44 lg:w-44 rounded-lg overflow-hidden">
                        <Image
                            fill
                            sizes="auto"
                            src="/images/liked.png"
                            alt="Playlist"
                        />
                    </div>
                    <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
                        <p className="hidden md:block font-semibold">
                            Playlist
                        </p>
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-semibold">
                            Liked Songs
                        </h1>
                    </div>
                </div>
            </Header>
            <LikedContent songs={songs} />
        </Box>
    );
};

export default Liked;
