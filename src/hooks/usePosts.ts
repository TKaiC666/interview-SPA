import { useState, useEffect, useCallback } from "react";
import { getPaginatedPosts, getUserInfo } from "@/lib/dataFetch";
import type { PostInfo } from "@/types";
import { filterRepeatedNumber } from "@/utils";

const MOCK_DATA: PostInfo[] = [
  {
    id: 1,
    userId: 1,
    title: "tredsa",
    body: "asdsadsaasdzxczxc asdasdaqwe",
    username: "Duke",
  },
  {
    id: 2,
    userId: 1,
    title: "asdasd",
    body: "asdsadsaasdzxczxc asdasdaqwe",
    username: "Duke",
  },
  {
    id: 3,
    userId: 1,
    title: "!!",
    body: "asdsadsaasdzxczxc asdasdaqwe",
    username: "Duke",
  },
  {
    id: 4,
    userId: 1,
    title: "zzzz",
    body: "asdsadsaasdzxczxc asdasdaqwe",
    username: "Duke",
  },
  {
    id: 5,
    userId: 1,
    title: "fgdfxc",
    body: "asdsadsaasdzxczxc asdasdaqwe",
    username: "Duke",
  },
  {
    id: 6,
    userId: 2,
    title: "tredsa",
    body: "asdsadsaasdzxczxc asdasdaqwe",
    username: "Jane",
  },
  {
    id: 7,
    userId: 2,
    title: "zxc1",
    body: "asdsadsaasdzxczxc asdasdaqwe",
    username: "Jane",
  },
  {
    id: 8,
    userId: 1,
    title: "cc",
    body: "asdsadsaasdzxczxc asdasdaqwe",
    username: "Jane",
  },
  {
    id: 9,
    userId: 1,
    title: "bb",
    body: "asdsadsaasdzxczxc asdasdaqwe",
    username: "Jane",
  },
  {
    id: 10,
    userId: 1,
    title: "aa",
    body: "asdsadsaasdzxczxc asdasdaqwe",
    username: "Jane",
  },
  {
    id: 11,
    userId: 3,
    title: "11",
    body: "asdsadsaasdzxczxc asdasdaqwe",
    username: "Sam",
  },
];

type UsePostProps = {
  start: number;
  end: number;
};

const usePosts = ({ start, end }: UsePostProps) => {
  const [posts, setPosts] = useState<PostInfo[]>([]);
  const [totalPostCount, setTotalPostCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const mockMode = () => {
    console.log("[fetchPosts]: ", start, end);
    console.log("[fetchPosts]: ", MOCK_DATA.slice(start, end));
    setIsLoading(false);
    setPosts(MOCK_DATA.slice(start, end));
    setTotalPostCount(MOCK_DATA.length);
  };

  const fetchPosts = useCallback(async () => {
    if (!isLoading) setIsLoading(true);
    try {
      const postsData = await getPaginatedPosts({ start, end });
      if (!postsData) throw new Error("Failed to fetch posts");
      const { totalPostCount, data } = postsData;
      const nonRepeatedUserIds = filterRepeatedNumber(
        data.map((post) => post.userId)
      );
      const usersInfo = await Promise.all(
        nonRepeatedUserIds.map(async (userId) => getUserInfo(userId))
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
