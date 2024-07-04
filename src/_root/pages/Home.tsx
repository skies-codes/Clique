import { Models } from "appwrite";

// import { useToast } from "@/components/ui/use-toast";
import { PostCard, UserCard } from "../../components/shared";
import { useGetRecentPosts, useGetUsers } from "../../lib/react-query/queries";
import Loading from "../../components/loaders/Loading";

const Home = () => {
    // const { toast } = useToast();

    const {
        data: posts,
        isLoading: isPostLoading,
        isError: isErrorPosts,
    } = useGetRecentPosts();

    const {
        data: creators,
        isLoading: isUserLoading,
        isError: isErrorCreators,
    } = useGetUsers(10);

    if (isErrorPosts || isErrorCreators) {
        return (
            <div className='flex flex-1 items-center justify-center'>
                <p className='body-medium text-light-1'>
                    Something bad happened
                </p>
            </div>
        );
    }

    return (
        <section className='w-full h-screen flex flex-1 bg-gray-100 dark:bg-dark-background'>
            <div className='flex flex-col flex-1 items-center lg:gap-10 overflow-scroll custom-scrollbar border-r border-zinc-300 dark:border-zinc-900 mt-12 py-4 lg:mt-0'>
                <div className='max-w-screen-sm flex flex-col items-center w-full gap-6 md:gap-9 px-5 py-5 md:px-0 lg:py-10'>
                    <h2 className='text-4xl md:text-xl text-left w-full text-foreground dark:text-dark-foreground'>
                        Home Feed
                    </h2>
                    {isPostLoading && !posts ? (
                        <Loading />
                    ) : posts?.total !== 0 ? (
                        <ul className='flex flex-col flex-1 gap-9 w-full '>
                            {posts?.documents.map((post: Models.Document) => (
                                <li
                                    key={post.$id}
                                    className='flex justify-center w-full'
                                >
                                    <PostCard post={post} />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className='text-foreground dark:text-dark-foreground'>
                            There's no post to show. Be the first to post!
                        </p>
                    )}
                </div>
            </div>

            <div className='home-creators bg-background dark:bg-dark-2'>
                <h3 className='text-base md:text-xl text-left w-full text-foreground dark:text-dark-foreground'>
                    Top Creators
                </h3>
                {isUserLoading && !creators ? (
                    <Loading />
                ) : (
                    <ul className='w-full flex flex-col gap-8'>
                        {creators?.documents.map((creator) => (
                            <li key={creator?.$id}>
                                <UserCard user={creator} />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
};

export default Home;
