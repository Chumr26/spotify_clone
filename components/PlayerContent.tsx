'use client';

import { useEffect, useState } from 'react';
import useSound from 'use-sound';
import { BsPauseFill, BsPlayFill } from 'react-icons/bs';
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai';
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2';

import { Song } from '@/types';

import usePlayer from '@/hooks/usePlayer';

import MediaItem from './MediaItem';
import LikeButton from './LikeButton';
import Slider from './Slider';

interface PlayerContentProps {
    song: Song;
    songUrl: string;
}

const PlayerContent = ({ song, songUrl }: PlayerContentProps) => {
    const player = usePlayer();
    const [volume, setVolume] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);

    const Icon = isPlaying ? BsPauseFill : BsPlayFill;
    const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

    const onPlayNext = () => {
        if (player.ids.length === 0) return;

        const currentIndex = player.ids.findIndex(
            (id) => id === player.activeId
        );
        const nextSong = player.ids[currentIndex + 1];

        if (!nextSong) return player.setId(player.ids[0]);

        return player.setId(nextSong);
    };

    const onPlayPrevious = () => {
        if (player.ids.length === 0) return;

        const currentIndex = player.ids.findIndex(
            (id) => id === player.activeId
        );
        const previousSong = player.ids[currentIndex - 1];

        if (!previousSong) {
            return player.setId(player.ids[player.ids.length - 1]);
        }

        return player.setId(previousSong);
    };

    const [play, { pause, sound }] = useSound(songUrl, {
        volume: volume,
        onplay: () => setIsPlaying(true),
        onend: () => {
            setIsPlaying(false);
            onPlayNext();
        },
        onpause: () => setIsPlaying(false),
        format: ['mp3'],
    });

    useEffect(() => {
        sound?.play();
        return () => sound?.unload();
    }, [sound]);

    const handlePlay = () => {
        isPlaying ? pause() : play();
    };

    const toggleMute = () => {
        volume === 0 ? setVolume(1) : setVolume(0);
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 h-full">
            <div className="flex w-full justify-start z-10">
                <div className="flex items-center gap-x-4">
                    <MediaItem data={song} />
                    <LikeButton songId={song.id} />
                </div>
            </div>
            <div className="flex md:hidden col-auto w-full justify-end">
                <div
                    onClick={handlePlay}
                    className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 
                    cursor-pointer"
                >
                    <Icon size={30} className="text-black" />
                </div>
            </div>
            <div className="hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6">
                <AiFillStepBackward
                    onClick={onPlayPrevious}
                    size={30}
                    className="text-neutral-400 cursor-pointer hover:text-white transition"
                />
                <div
                    onClick={handlePlay}
                    className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 
                    cursor-pointer"
                >
                    <Icon size={30} className="text-black" />
                </div>
                <AiFillStepForward
                    onClick={onPlayNext}
                    size={30}
                    className="text-neutral-400 cursor-pointer hover:text-white transition"
                />
            </div>
            <div className="hidden md:flex w-full justify-end pr-2">
                <div className="flex items-center gap-x-2 w-[120px]">
                    <VolumeIcon
                        onClick={toggleMute}
                        size={34}
                        className="cursor-pointer"
                    />
                    <Slider
                        value={volume}
                        onChange={(value) => setVolume(value)}
                    />
                </div>
            </div>
        </div>
    );
};
export default PlayerContent;
