import PostForm from "../../components/forms/PostForm";

const CreatePost = () => {
    return (
        <div className='flex flex-1 mt-12'>
            <div className='max-w-screen-sm w-full mx-auto flex flex-col overflow-scroll px-5 mt-12 py-4 custom-scrollbar'>
                <div className='max-w-5xl flex-start gap-3 justify-start w-full mb-10'>
                    <img
                        src='/assets/icons/add-post.svg'
                        width={36}
                        height={36}
                        alt='add'
                        className='invert dark:invert-0'
                    />
                    <h2 className='text-2xl text-left w-full text-foreground dark:text-dark-foreground'>
                        Create Post
                    </h2>
                </div>

                <PostForm action='Create' />
            </div>
        </div>
    );
};

export default CreatePost;
