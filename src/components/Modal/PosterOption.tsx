import Input from '../Input';

const PosterOption = ({ posters }: { posters: string[] }) => {
    return (
        <div className="flex justify-between">
            {posters.map((posterUrl) => (
                <label key={posterUrl}>
                    <Input
                        className="opacity-0 peer"
                        type="radio"
                        name="poster"
                        value={posterUrl}
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
