import { cn } from "../../lib/utils";

interface LoadingProps {
    text?: string;
    className?: string;
}

const Loading: React.FC<LoadingProps> = ({ text, className }) => {
    return (
        <div
            className={cn("flex items-center gap-2", className, {
                default: "text-foreground dark:text-dark-foreground",
                post: "text-white",
            })}
        >
            <div className='animate-spin rounded-full h-4 w-4 border-[3px] border-blue-400 border-b-white/80'></div>
            <p>{text}</p>
        </div>
    );
};

export default Loading;
