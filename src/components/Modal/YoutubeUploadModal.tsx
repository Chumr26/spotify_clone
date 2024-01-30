import { type FieldValues, useForm, SubmitHandler } from 'react-hook-form';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import { BounceLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import uniqid from 'uniqid';

import useYoutubeUploadModal from '@/hooks/useYoutubeUploadModal';
import useUploadModal from '@/hooks/useUploadModal';
import fetchSongApi from '@/helper/fetchSongApi';
import fetchPosterApi from '@/helper/fetchPosterApi';
import sanitizer from '@/helper/sanitizer';

import Modal from '.';
import Input from '../Input';
import Button from '../Button';
import { useState } from 'react';
import PosterOption from './PosterOption';

const YoutubeUploadModal = () => {
    const supabaseClient = useSupabaseClient();
    const user = useUser();
    const router = useRouter();
    const { isOpen, handleClose } = useYoutubeUploadModal();
    const uploadModal = useUploadModal();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            url: '',
            title: '',
            author: '',
            poster: null,
        },
    });

    const [formLoading, setFormLoading] = useState(false);
    const [posterLoading, setPosterLoading] = useState(false);
    const [warnings, setWarnings] = useState<string>();
    const [posters, setPosters] = useState<string[]>([]);

    const handleFetchPoster = async () => {
        setPosterLoading(true);
        const titleValue = (
            document.getElementById('title') as HTMLInputElement
        ).value;
        const authorValue = (
            document.getElementById('author') as HTMLInputElement
        ).value;
        const urlValue = (document.getElementById('url') as HTMLInputElement)
            .value;

        if (!urlValue) {
            return setWarnings('Missing url.');
        } else if (!titleValue) {
            return setWarnings('Missing title.');
        } else if (!authorValue) {
            return setWarnings('Missing author.');
        }
        const data = await fetchPosterApi(`${titleValue} ${authorValue}`);
        const sanitizedUrl = sanitizer(urlValue);
        if (sanitizedUrl.error) return setWarnings('Invalid youtube link.');
        setPosterLoading(false);
        setPosters([
            data.tracks.items[0].data.albumOfTrack.coverArt.sources[0].url,
            `https://img.youtube.com/vi/${sanitizedUrl.videoId}/maxresdefault.jpg`,
        ]);
    };

    const handleChange = (open: boolean) => {
        if (!open) {
            handleClose();
        }
    };

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        setFormLoading(true);
        //setup poster data
        const posterUrl = (
            document.querySelector(
                'input[name="poster"]:checked'
            ) as HTMLInputElement
        )?.value;
        if (!posterUrl && !values.poster) {
            setWarnings('Missing poster');
            setFormLoading(false);
            return;
        }

        //setup song data
        const sanitizedUrl = sanitizer(values.url);
        if (sanitizedUrl.error) return setWarnings('Invalid youtube link.');
        const data = await fetchSongApi(sanitizedUrl.videoId!);
        if (data?.status !== 'ok') return setWarnings(data?.msg);
        const songBlob = await fetch(data!.link).then((res) => res.blob());

        const uniqueId = uniqid();

        try {
            // upload song
            const { data: songData, error: songError } =
                await supabaseClient.storage
                    .from('songs')
                    .upload(`song-${uniqueId}`, songBlob, {
                        cacheControl: '3600',
                        upsert: false,
                    });

            if (songError) {
                setWarnings('Upload song error.');
                throw {
                    songError: songError.message,
                };
            }

            // upload poster
            let posterPath = null;
            if (values.poster) {
                const { data: posterData, error: posterError } =
                    await supabaseClient.storage
                        .from('posters')
                        .upload(`poster-${uniqueId}`, values.poster[0], {
                            cacheControl: '3600',
                            upsert: false,
                        });

                if (posterError) {
                    setWarnings('Upload poster error.');
                    throw {
                        posterError: posterError.message,
                    };
                }
                posterPath = posterData.path;
            }

            // insert record
            const { error: insertError } = await supabaseClient
                .from('songs')
                .insert({
                    user_id: user!.id,
                    title: values.title,
                    author: values.author,
                    song_path: songData?.path,
                    poster_path: posterPath,
                    youtube_poster: posterUrl || null,
                });
            if (insertError) {
                throw {
                    insertError: insertError.message,
                };
            }

            // sucess
            handleClose();
            uploadModal.handleClose();
            reset();
            setPosters([]);
            router.refresh();
            toast.success('Song uploaded!');
        } catch (error) {
            console.log(error, new Date().toLocaleString());
        } finally {
            setFormLoading(false);
        }
    };

    return (
        <Modal
            title="Youtube"
            description="Upload a youtube link"
            isOpen={isOpen}
            handleChange={handleChange}
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-y-4"
            >
                <Input
                    id="url"
                    placeholder="Url"
                    {...register('url', { required: true })}
                />
                <Input
                    id="title"
                    placeholder="Title"
                    {...register('title', { required: true })}
                />
                <Input
                    id="author"
                    placeholder="Author"
                    {...register('author', { required: true })}
                />
                <div className="flex flex-col items-center">
                    <p className="pb-1">Select a poster</p>
                    <Button
                        onClick={handleFetchPoster}
                        className="w-full bg-neutral-200 flex justify-center"
                    >
                        {posterLoading ? (
                            <BounceLoader size={20} />
                        ) : (
                            'Suggest posters'
                        )}
                    </Button>
                    <PosterOption posters={posters} />
                    <p>or</p>
                    <Input
                        id="poster"
                        type="file"
                        accept="image/*"
                        {...register('poster')}
                        className="cursor-pointer"
                    />
                </div>
                <Button type="submit" className="flex justify-center">
                    {formLoading ? <BounceLoader size={24} /> : 'Upload'}
                </Button>
                {Object.keys(errors).map((field) => (
                    <p key={field} className="text-center text-orange-400">
                        Missing {field} field.
                    </p>
                ))}
                {warnings && (
                    <p className="text-center text-orange-400">{warnings}.</p>
                )}
            </form>
        </Modal>
    );
};
export default YoutubeUploadModal;
