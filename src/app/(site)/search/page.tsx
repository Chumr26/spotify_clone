import getSongsByTitleOrAuthor from '@/actions/getSongsByTitleOrAuthor';
import Box from '@/components/Box';
import Header from '@/components/Header';
import SearchInput from './components/SearchInput';
import SearchContent from './components/SearchContent';

interface SearchPageProps {
    searchParams: { q: string };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
    const songs = await getSongsByTitleOrAuthor(searchParams.q);

    return (
        <Box className="h-full overflow-y-auto no-scrollbar">
            <Header className="from-neutral-900 bg-inherit sticky top-0 z-10">
                <h1 className="text-3xl font-semibold mb-6">Search</h1>
                <SearchInput />
            </Header>
            <SearchContent songs={songs} />
        </Box>
    );
};
export default SearchPage;
