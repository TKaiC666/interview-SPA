import { useParams } from "react-router";
import usePostDetail from "@/hooks/usePostDetail";

const PostDetail = () => {
  const postId = Number(useParams().postId);
  const { data, isLoading, error, deleteComment } = usePostDetail(postId);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section>
      {data && (
        <>
          <ul>
            <li>{data.id}</li>
            <li>{data.username}</li>
            <li>{data.title}</li>
            <li>{data.body}</li>
          </ul>
          <ul>
            {data.comments.map((comment) => (
              <li key={comment.id}>
                <span>{comment.name}</span>
                <span>{comment.body}</span>
                <button
                  onClick={() => {
                    deleteComment(comment.id);
                  }}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
};

export default PostDetail;
