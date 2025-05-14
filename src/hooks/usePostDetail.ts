import { useState, useEffect, useCallback } from "react";
import {
  getPostWithPostId,
  getUserInfo,
  getPostComments,
  deletePostComment,
} from "@/lib/dataFetch";
import type { Post, User, Comment } from "@/types";

type PostDetailInfo = Post &
  Pick<User, "username"> & {
    comments: Comment[];
  };

const usePostDetail = (postId: number) => {
  const [data, setData] = useState<PostDetailInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPostDetail = useCallback(async () => {
    try {
      const postData = await getPostWithPostId(postId);
      if (!postData) {
        throw new Error("Failed to fetch post data with postId");
      }
      const { id, userId } = postData;
      const [userData, comments] = await Promise.all([
        getUserInfo(userId),
        getPostComments(id),
      ]);
      if (!userData || !comments) {
        throw new Error("Failed to fetch user info or comments");
      }

      setData({
        ...postData,
        username: userData.username,
        comments,
      });
    } catch (err) {
      setError(err as string);
    } finally {
      setIsLoading(false);
    }
  }, [postId]);

  const deleteComment = async (targetCommentId: number) => {
    try {
      const result = await deletePostComment(targetCommentId);
      if (!result) {
        throw new Error("Failed to delete comment");
      }
      setData((prevData) => ({
        ...prevData!,
        comments: prevData!.comments.filter(
          (comment) => comment.id !== targetCommentId
        ),
      }));
      return "success";
    } catch (err) {
      setError(err as string);
      return "fail";
    }
  };

  useEffect(() => {
    fetchPostDetail();
  }, [fetchPostDetail]);

  return { data, isLoading, error, deleteComment };
};

export default usePostDetail;
