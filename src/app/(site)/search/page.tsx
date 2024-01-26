import getSongsByTitle from '@/actions/getSongsByTitle';
import Box from '@/components/Box';
import Header from '@/components/Header';
import SearchInput from './components/SearchInput';
import SearchContent from './components/SearchContent';

interface SearchPageProps {
    searchParams: { title: string };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
    const songs = await getSongsByTitle(searchParams.title);

    return (
        <Box className="h-full">
            <Header className="from-neutral-900">
                <h1 className="text-3xl font-semibold mb-6">Search</h1>
                <SearchInput />
            </Header>
            <SearchContent songs={songs} />
        </Box>
    );
};
export default SearchPage;