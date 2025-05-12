import type { User, Post, Comment } from "@/types";

const DOMAIN = "https://jsonplaceholder.typicode.com";

const getApiUrl = (route: string) => `${DOMAIN}${route}`;

const fetchData = async <T>({
  apiUrl,
  method = "GET",
  headers = {
    "Content-Type": "application/json",
  },
}: {
  apiUrl: string;
  method?: string;
  headers?: Record<string, string>;
}) => {
  try {
    const response = await fetch(apiUrl, {
      method,
      headers,
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error("[fetchData]: ", error);
    return null;
  }
};

export const getAllPosts = async () => {
  const apiUrl = getApiUrl("/posts");
  const data = await fetchData<Post[]>({ apiUrl });

  return data;
};

// 沒有帶 postId 時，會回傳所有的 post
export const getPostWithPostId = async (postId: number) => {
  const apiUrl = getApiUrl(`/posts/${postId}`);
  const data = await fetchData<Post>({ apiUrl });

  return data;
};

/*
 * query start 和 end 時，api 的 response header 會有 X-Total-Count，
 * 表示總共有多少筆 post。
 * source: https://github.com/typicode/jsonplaceholder/issues/49
 * 但是不想在 fetchData 裡面額外處理這個 header，
 * 所以這邊直接使用 fetch 處理。
 */
export const getPaginatedPosts = async ({
  start,
  end,
}: {
  start: number;
  end: number;
}) => {
  const query = `?_start=${start}&_end=${end}`;
  const apiUrl = getApiUrl("/posts") + query;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const totalPostCount = Number(response.headers.get("X-Total-Count"));
    const data: Post[] = await response.json();
    return {
      totalPostCount,
      data,
    };
  } catch (error) {
    console.error("[getPaginatedPosts]: ", error);
    return null;
  }
};

export const getUserInfo = async (userId: number) => {
  const apiUrl = getApiUrl(`/users/${userId}`);
  const data = await fetchData<User>({ apiUrl });

  return data;
};

export const getPostComments = async (postId: number) => {
  const query = `?postId=${postId}`;
  const apiUrl = getApiUrl("/comments") + query;
  const data = await fetchData<Comment[]>({ apiUrl });

  return data;
};

export const deletePost = async (postId: number) => {
  const apiUrl = getApiUrl(`/posts/${postId}`);
  const data = await fetchData<Post>({ apiUrl, method: "DELETE" });

  return data;
};
