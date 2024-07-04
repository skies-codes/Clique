import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Input } from "../../components/ui";
import GridPostList from "../../components/shared/GridPostList";
import { useGetPosts, useSearchPosts } from "../../lib/react-query/queries";
import useDebounce from "../../hooks/useDebounce";
import { IoFilter, IoSearch } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import Loading from "../../components/loaders/Loading";

export type SearchResultProps = {
    isSearchFetching: boolean;
    searchedPosts: any;
};

const SearchResults = ({
    isSearchFetching,
    searchedPosts,
}: SearchResultProps) => {
    if (isSearchFetching) {
        return <Loading />;
    } else if (searchedPosts && searchedPosts.documents.length > 0) {
        return <GridPostList posts={searchedPosts.documents} />;
    } else {
        return (
            <p className='text-light-4 mt-10 text-center w-full'>
                No results found
            </p>
        );
    }
};

const Explore = () => {
    const { ref, inView } = useInView();
    const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();

    const [searchValue, setSearchValue] = useState("");
    const debouncedSearch = useDebounce(searchValue, 500);
    const { data: searchedPosts, isFetching: isSearchFetching } =
        useSearchPosts(debouncedSearch);

    useEffect(() => {
        if (inView && !searchValue) {
            fetchNextPage();
        }
    }, [inView, searchValue, fetchNextPage]);

    if (!posts)
        return (
            <div className='flex-center w-full h-full'>
                <Loading />
            </div>
        );

    const shouldShowSearchResults = searchValue !== "";
    const shouldShowPosts =
        !shouldShowSearchResults &&
        posts.pages.every((item: any) => item.documents.length === 0);

    return (
        <div className='max-w-screen-lg w-full mx-auto flex flex-col overflow-scroll px-5 mt-12 py-4 custom-scrollbar'>
            <div className='w-full flex flex-col gap-6 md:gap-9 py-4'>
                <h2 className='text-4xl text-left w-full text-foreground dark:text-dark-foreground'>
                    Search Posts
                </h2>
                <div className='flex gap-1 px-4 w-full rounded-lg bg-dark-3 items-center'>
                    <CiSearch size={30} className='text-zinc-400' />
                    <Input
                        type='text'
                        placeholder='Search'
                        className='h-12 border-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-offset-0 text-dark-foreground'
                        value={searchValue}
                        onChange={(e) => {
                            const { value } = e.target;
                            setSearchValue(value);
                        }}
                    />
                </div>
            </div>

            <div className='flex-between w-full max-w-5xl mt-16 mb-7'>
                <h3 className='text-lg font-semibold text-foreground dark:text-dark-foreground'>
                    Popular Today
                </h3>

                <div className='flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer'>
                    <p className='text-sm text-white'>All</p>
                    <IoFilter size={20} className='text-purple-500' />
                </div>
            </div>

            <div className='flex flex-wrap gap-9 w-full max-w-5xl'>
                {shouldShowSearchResults ? (
                    <SearchResults
                        isSearchFetching={isSearchFetching}
                        searchedPosts={searchedPosts}
                    />
                ) : shouldShowPosts ? (
                    <p className='text-foreground dark:text-dark-foreground mt-10 text-center w-full'>
                        End of posts
                    </p>
                ) : (
                    posts.pages.map((item: any, index: number) => (
                        <GridPostList
                            key={`page-${index}`}
                            posts={item.documents}
                        />
                    ))
                )}
            </div>

            {hasNextPage && !searchValue && (
                <div ref={ref} className='mt-10'>
                    <Loading />
                </div>
            )}
        </div>
    );
};

export default Explore;
