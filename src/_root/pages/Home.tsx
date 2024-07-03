import { Models } from "appwrite";

// import { useToast } from "@/components/ui/use-toast";
import { Loader, PostCard, UserCard } from "../../components/shared";
import { useGetRecentPosts, useGetUsers } from "../../lib/react-query/queries";

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
            <div className='flex flex-1'>
                <div className='home-container'>
                    <p className='body-medium text-light-1'>
                        Something bad happened
                    </p>
                </div>
                <div className='home-creators'>
                    <p className='body-medium text-light-1'>
                        Something bad happened
                    </p>
                </div>
            </div>
        );
    }

    return (
        <section className='flex flex-1'>
            <div className='flex flex-col flex-1 items-center gap-10 overflow-scroll py-10 px-5 md:px-8 lg:p-14 custom-scrollbar'>
                <div className='home-posts'>
                    <h2 className='h3-bold md:h2-bold text-left w-full'>
                        Home Feed
                    </h2>
                    {isPostLoading && !posts ? (
                        <Loader />
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
                        <p>There's no post to show. Be the first to post!</p>
                    )}
                </div>
            </div>

            <div className='home-creators'>
                <h3 className='h3-bold text-light-1'>Top Creators</h3>
                {isUserLoading && !creators ? (
                    <Loader />
                ) : (
                    <ul className='grid 2xl:grid-cols-2 gap-6'>
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
