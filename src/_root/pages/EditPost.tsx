import { useParams } from "react-router-dom";
import { useGetPostById } from "../../lib/react-query/queries";
import PostForm from "../../components/forms/PostForm";
import Loading from "../../components/loaders/Loading";

const EditPost = () => {
    const { id } = useParams();
    const { data: post, isLoading } = useGetPostById(id);

    if (isLoading)
        return (
            <div className='flex-center w-full h-full'>
                <Loading />
            </div>
        );

    return (
        <div className='flex flex-1'>
            <div className='common-container'>
                <div className='flex-start gap-3 justify-start w-full max-w-5xl'>
                    <img
                        src='/assets/icons/edit.svg'
                        width={36}
                        height={36}
                        alt='edit'
                        className='invert-white'
                    />
                    <h2 className='h3-bold md:h2-bold text-left w-full'>
                        Edit Post
                    </h2>
                </div>

                {isLoading ? (
                    <Loading />
                ) : (
                    <PostForm action='Update' post={post} />
                )}
            </div>
        </div>
    );
};

export default EditPost;
