import { PiCaretDownBold } from 'react-icons/pi';
import { TiArrowLoop, TiArrowShuffle } from 'react-icons/ti';
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai';
import { IconType } from 'react-icons';

import { Song } from '@/types';
import SongItem from '../SongItem';
import SeekSlider from './SeekSlider';

interface MobilePlayerProps {
    handleClose: () => void;
    song: Song;
    sound: Howl | null;
    changeSong: (position: 1 | -1) => void;
    togglePlay: () => void;
    Icon: IconType;
    isLoop: boolean;
    setIsLoop: (isLoop: boolean) => void;
    isShuffle: boolean;
    setIsShuffle: (isShuffle: boolean) => void;
}

const MobilePlayer = ({
    handleClose,
    song,
    sound,
    changeSong,
    togglePlay,
    Icon,
    isLoop,
    setIsLoop,
    isShuffle,
    setIsShuffle,
}: MobilePlayerProps) => {
    return (
        <div className="flex flex-col justify-between bg-neutral-900 fixed inset-0">
            <div>
                <div className="flex justify-end m-4">
                    <PiCaretDownBold size={30} onClick={handleClose} />
                </div>
                <div className="m-10">
                    <SongItem song={song} />
                </div>
            </div>
            <div className="m-10 flex flex-col">
                <SeekSlider sound={sound} />
                <div className="mt-3 mx-auto flex flex-row items-center gap-x-20">
                    <TiArrowLoop
                        onClick={() => {
                            setIsLoop(!isLoop);
                            setIsShuffle(false);
                        }}
                        className={`${isLoop && 'text-green-500'}`}
                        size={30}
                    />
                    <TiArrowShuffle
                        onClick={() => {
                            setIsShuffle(!isShuffle);
                            setIsLoop(false);
                        }}
                        className={`${isShuffle && 'text-green-500'}`}
                        size={28}
                    />
                </div>
                <div className="flex mt-2 gap-x-6 justify-center items-center">
                    <AiFillStepBackward
                        onClick={() => changeSong(-1)}
                        size={30}
                        className="text-neutral-400 cursor-pointer hover:text-white transition"
                    />
                    <div
                        onClick={togglePlay}
                        className="flex h-10 w-10 rounded-full bg-white cursor-pointer items-center justify-center"
                    >
                        <Icon size={30} className="text-black" />
                    </div>
                    <AiFillStepForward
                        onClick={() => changeSong(1)}
                        size={30}
                        className="text-neutral-400 cursor-pointer hover:text-white transition"
                    />
                </div>
            </div>
        </div>
    );
};
export default MobilePlayer;
