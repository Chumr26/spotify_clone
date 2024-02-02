import { BsPauseFill, BsPlayFill } from 'react-icons/bs';
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai';
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2';
import { useEffect, useRef, useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import useSound from 'use-sound';

import { Song } from '@/types';
import MediaItem from '../MediaItem';
import LikeButton from '../LikeButton';
import Slider from './Slider';
import usePlayer from '@/hooks/usePlayer';
import Seekbar from './Seekbar';

const PlayerContent = ({ songUrl, song }: { songUrl: string; song: Song }) => {
    const player = usePlayer();
    const supabase = useSupabaseClient();

    const [volume, setVolume] = useState(1);
    const volumeRef = useRef<number>(1);
    const [isPlaying, setIsPlaying] = useState(false);

    const Icon = isPlaying ? BsPauseFill : BsPlayFill;
    const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

    const changeSong = async (position: 1 | -1) => {
        if (player.ids.length === 0) return;

        const currentIndex = player.ids.findIndex(
            (id) => id === player.activeSong?.id
        );

        // const nextIndex =
        //     currentIndex + position < 0
        //         ? player.ids.length - 1
        //         : currentIndex + position;
        // const nextId = player.ids[nextIndex] || player.ids[0];

        let nextIndex = currentIndex + position;
        // if nextIndex ouside a array indexs then nextIndex is the first index in array
        if (nextIndex >= player.ids.length) {
            nextIndex = 0;
            // if currentIndex is 0 then nextIndex is the last index in array
        } else if (nextIndex < 0) {
            nextIndex = player.ids.length - 1;
        }

        const nextSong = await supabase
            .from('songs')
            .select('*')
            .eq('id', player.ids[nextIndex])
            .then((res) => res.data?.[0]);

        const nextUrl = await supabase.storage
            .from('songs')
            .getPublicUrl(nextSong.song_path).data.publicUrl;

        player.setActiveSong(nextSong);
        player.setActiveUrl(nextUrl);
    };

    const changeVolume = (value: number) => {
        setVolume(value);
        volumeRef.current = value;
    };

    const [play, { pause, sound }] = useSound(songUrl, {
        volume,
        onplay: () => setIsPlaying(true),
        onend: () => {
            setIsPlaying(false);
            changeSong(1);
        },
        format: ['mp3'],
        html5: true,
        autoplay: true,
    });

    useEffect(() => {
        const itvId = setInterval(
            () => console.log(Math.floor(sound?.seek())),
            1000
        );
        return () => {
            sound?.unload();
            clearInterval(itvId);
        };
    }, [sound]);

    const handlePause = () => {
        sound?.fade(volume, 0, 500);
        setIsPlaying(false);
        setTimeout(() => {
            pause();
        }, 500);
    };

    const handlePlay = () => {
        sound?.fade(0, volume, 1000);
        play();
    };

    const togglePlay = () => (isPlaying ? handlePause() : handlePlay());

    const toggleMute = () =>
        volume === 0 ? setVolume(volumeRef.current) : setVolume(0);

    return (
        <div className="h-full grid grid-cols-3">
            <div className="flex gap-x-4 rounded-md col-span-2 -mr-16 md:col-span-1 md:mr-0">
                <MediaItem song={song} isOpen />
                <LikeButton songId={song.id} />
            </div>
            <div className="flex md:hidden justify-end items-center">
                <div
                    onClick={togglePlay}
                    className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 
                    cursor-pointer"
                >
                    <Icon size={30} className="text-black" />
                </div>
            </div>

            <div className="hidden md:flex gap-x-6 justify-end items-center md:justify-center">
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

            {/* {Math.floor(sound.duration()! / 60)}:
                    {Math.floor(sound.duration() % 60) === 0
                        ? '00'
                        : Math.floor(sound.duration() % 60)} */}

            <div className="hidden md:flex justify-end">
                <div className="flex gap-x-2 w-[120px] items-center">
                    <VolumeIcon
                        onClick={toggleMute}
                        size={30}
                        className="cursor-pointer"
                    />
                    <Slider value={volume} onChange={changeVolume} />
                </div>
            </div>
        </div>
    );
};
export default PlayerContent;
