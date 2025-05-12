import { useState, useEffect, useCallback } from "react";
import { getPaginatedPosts, getUserInfo } from "@/lib/dataFetch";
import type { Post, User } from "@/types";

type PostInfo = Post & Pick<User, "username">;
type UsePostProps = {
  start: number;
  end: number;
};

const usePosts = ({ start, end }: UsePostProps) => {
  const [posts, setPosts] = useState<PostInfo[]>([]);
  const [totalPostCount, setTotalPostCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    try {
      const postsData = await getPaginatedPosts({ start, end });
      if (!postsData) throw new Error("Failed to fetch posts");
      const { totalPostCount, data } = postsData;
      const usersInfo = await Promise.all(
        data.map(async (post) => getUserInfo(post.userId))
      );
      const postsWithUsernames = data.map((post) => ({
        ...post,
        username:
          usersInfo.find((userInfo) => userInfo?.id === post.userId)
            ?.username ?? "Unknown",
      }));
      setPosts(postsWithUsernames);
      setTotalPostCount(totalPostCount);
    } catch (err) {
      setError(err as string);
    } finally {
      setIsLoading(false);
    }
  }, [end, start]);

  const refetch = () => {
    setPosts([]);
    setTotalPostCount(0);
    setIsLoading(true);
    setError(null);

    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, totalPostCount, isLoading, error, refetch };
};

export default usePosts;
