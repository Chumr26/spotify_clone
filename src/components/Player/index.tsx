'use client';

import usePlayer from '@/hooks/usePlayer';
import PlayerContent from './PlayerContent';

const Player = () => {
    const player = usePlayer();
    if (!player.activeUrl) return null;

    return (
        // fixed inset-0 h-full md:inset-auto md:bottom-0 md:h-[80px] w-full bg-black py-2 px-4 z-10 md:z-0
        <div className="fixed bottom-0 w-full bg-black py-2 px-4 h-[80px]">
            <PlayerContent
                song={player.activeSong!}
                songUrl={player.activeUrl}
            />
        </div>
    );
};
export default Player;
