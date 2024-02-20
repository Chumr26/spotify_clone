import Input from '../Input';

interface PosterOptionProps {
    posters: string[];
    formLoading: boolean;
    setIsPosterSelected: (isCheck: boolean) => void;
}

const PosterOption = ({
    posters,
    formLoading,
    setIsPosterSelected,
}: PosterOptionProps) => {
    return (
        <div className="flex justify-between">
            {posters.map((posterUrl) => (
                <label key={posterUrl}>
                    <Input
                        onChange={() => setIsPosterSelected(true)}
                        className="opacity-0 disabled:opacity-0 peer"
                        type="radio"
                        name="poster"
                        value={posterUrl}
                        disabled={formLoading}
                    />
                    <img
                        className="border-4 border-transparent peer-checked:border-green-500 rounded-lg cursor-pointer h-[200px] w-[200px] object-cover"
                        key={posterUrl}
                        src={posterUrl}
                        alt="poster option"
                    />
                </label>
            ))}
        </div>
    );
};
export default PosterOption;
