'use client';

import usePlayer from '@/hooks/usePlayer';
import PlayerContent from './PlayerContent';

const Player = () => {
    const player = usePlayer();
    if (!player.activeUrl) return null;

    return (
        <div className="fixed bottom-0 w-full bg-black py-2 px-4 h-[80px]">
            <PlayerContent
                song={player.activeSong!}
                songUrl={player.activeUrl}
            />
        </div>
    );
};
export default Player;
