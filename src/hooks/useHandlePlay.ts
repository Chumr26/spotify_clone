import { Song } from '@/types';
import usePlayer from './usePlayer';

const useHandlePlay = (songs: Song[]) => {
    const player = usePlayer();

    const onPLay = (activeSong: Song, activeUrl: string) => {
        player.setActiveUrl(activeUrl);
        player.setActiveSong(activeSong);
        player.setIds(songs.map((song) => song.id));
    };

    return onPLay;
};
export default useHandlePlay;
