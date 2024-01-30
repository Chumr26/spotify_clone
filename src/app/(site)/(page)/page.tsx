import getSongs from '@/actions/getSongs';
import Box from '@/components/Box';
import Header from '@/components/Header';
import LikedList from './components/LikedList';
import PageContent from './components/PageContent';

export default async function Home() {
    const songs = await getSongs();
    return (
        <Box className="h-full overflow-hidden overflow-y-auto no-scrollbar">
            <Header>
                <div className="mb-2">
                    <h1 className="text-white text-3xl font-semibold">
                        Welcome back
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                        <LikedList
                            name="Library"
                            href="library"
                        />
                    </div>
                </div>
            </Header>
            <div className="mt-2 mb-7 px-6">
                <h1 className="text-white text-2xl font-semibold">
                    Newest songs
                </h1>
                <PageContent songs={songs} />
            </div>
        </Box>
    );
}
