import * as RadixSlider from '@radix-ui/react-slider';

interface VolumeSliderProps {
    value?: number;
    onChange?: (value: number) => void;
}

const VolumeSlider = ({ value = 1, onChange }: VolumeSliderProps) => {
    const handleChange = (value: number[]) => onChange?.(value[0]);
    return (
        <RadixSlider.Root
            className="flex items-center h-10 w-full"
            defaultValue={[1]}
            value={[value]}
            onValueChange={handleChange}
            max={1}
            step={0.1}
        >
            <RadixSlider.Track className=" relative bg-neutral-600 h-1 rounded-full w-full">
                <RadixSlider.Range className="absolute bg-white rounded-full h-full" />
            </RadixSlider.Track>
        </RadixSlider.Root>
    );
};

export default VolumeSlider;
