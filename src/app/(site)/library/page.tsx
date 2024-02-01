import getSongsByUserId from '@/actions/getSongsByUserId';

import Box from '@/components/Box';
import Header from '@/components/Header';
import LibraryIcon from '@/components/Icons/LibraryIcon';
import LibraryContent from './components/LibraryContent';
import UploadButton from '@/components/UploadButton';

const Library = async () => {
    const songs = await getSongsByUserId();

    return (
        <Box className="h-full overflow-hidden overflow-y-auto no-scrollbar">
            <Header>
                <div className="mt-10 md:mt-14 flex flex-col md:flex-row items-center justify-between gap-5">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="relative h-32 w-32 lg:h-44 lg:w-44 rounded-lg overflow-hidden">
                            <LibraryIcon />
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-semibold">
                            Library
                        </h1>
                    </div>
                    <UploadButton size={40} />
                </div>
            </Header>
            <LibraryContent songs={songs} />
        </Box>
    );
};

export default Library;
