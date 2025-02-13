import * as RadixSlider from '@radix-ui/react-slider';
import { useEffect, useState } from 'react';

import convertstm from '@/helper/convertstm';

interface SeekSliderProps {
    sound: Howl | null;
}

const SeekSlider = ({ sound }: SeekSliderProps) => {
    const [seekValue, setSeekValue] = useState(0);

    useEffect(() => {
        const itvId = setInterval(
            () => setSeekValue(Math.floor(sound?.seek() || 0)),
            1000
        );
        return () => {
            clearInterval(itvId);
        };
    }, [sound]);
    return (
        <div className="flex flex-col md:flex-row items-center gap-x-2 text-sm">
            <div className="w-full flex md:hidden justify-between">
                <p className="w-10">{convertstm(seekValue)}</p>
                <p>{convertstm(sound?.duration()!)}</p>
            </div>
            <p className="hidden md:block w-10">{convertstm(seekValue)}</p>
            <RadixSlider.Root
                className="flex items-center h-1 w-full"
                defaultValue={[0]}
                value={[seekValue]}
                onValueChange={(value: number[]) => sound?.seek(value[0])}
                max={sound?.duration()}
                step={1}
            >
                <RadixSlider.Track className=" relative bg-neutral-600 h-2 md:h-1 hover:h-2 transition rounded-full w-full">
                    <RadixSlider.Range className="absolute bg-green-500 rounded-full h-full" />
                </RadixSlider.Track>
            </RadixSlider.Root>
            <p className="hidden md:block">{convertstm(sound?.duration()! || 0)}</p>
        </div>
    );
};

export default SeekSlider;
