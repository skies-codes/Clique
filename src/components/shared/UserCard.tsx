import { Models } from "appwrite";
import { Link } from "react-router-dom";

import { Button } from "../ui/button";

type UserCardProps = {
    user: Models.Document;
};

const UserCard = ({ user }: UserCardProps) => {
    return (
        <Link to={`/profile/${user.$id}`} className='user-card'>
            <div className='flex flex-col items-center w-full gap-2'>
                <img
                    src={
                        user.imageUrl || "/assets/icons/profile-placeholder.svg"
                    }
                    alt='creator'
                    className='rounded-full w-10 h-10'
                />
                <p className='text-sm text-foreground dark:text-dark-foreground text-center line-clamp-1'>
                    @{user.username}
                </p>
            </div>

            <Button
                type='button'
                size='sm'
                className='shad-button_primary px-5'
            >
                Follow
            </Button>
        </Link>
    );
};

export default UserCard;
