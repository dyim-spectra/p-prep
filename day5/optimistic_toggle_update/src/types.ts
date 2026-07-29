export type LikeButtonProps = {
  initialLiked: boolean;
  initialCount: number;
  onToggleLike: () => Promise<boolean>;
  isLoading: boolean;
};