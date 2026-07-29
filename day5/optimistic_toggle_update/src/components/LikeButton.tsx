import type { LikeButtonProps } from "../types";

const LikeButton = ({ initialLiked, initialCount, onToggleLike, isLoading }: LikeButtonProps) => {
    return <>
        <span>Like Count: {initialCount}</span>
        <span>You Like: {initialLiked}</span>
        <button disabled={isLoading} onClick={onToggleLike}>
            like
        </button>
    </>
}

export default LikeButton