import { useState } from "react";
import { Link } from "react-router";
import usePosts from "@/hooks/usePosts";

const Posts = () => {
  const [cursor, setCursor] = useState<{ start: number; end: number }>({
    start: 0,
    end: 10,
  });
  const { posts, totalPostCount, isLoading, error, refetch } = usePosts(cursor);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section>
      {posts && (
        <ul>
          {posts.map((post, index) => (
            <li key={post.id}>
              <Link to={`/post-detail/${post.id}`}>
                <span>{index + 1 + cursor.start}</span>
                <span>{post.title}</span>
                <span>{post.userId}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {cursor.start > 0 && (
        <button
          onClick={() => {
            setCursor((prev) => ({
              start: prev.start - 10,
              end: prev.end - 10,
            }));
          }}
        >
          Prev
        </button>
      )}
      <span>
        {cursor.start + 1} - {cursor.end} of {totalPostCount}
      </span>
      {totalPostCount > cursor.end && (
        <button
          onClick={() => {
            setCursor((prev) => ({
              start: prev.start + 10,
              end: prev.end + 10,
            }));
          }}
        >
          Next
        </button>
      )}

      <button onClick={refetch}>Refresh</button>
    </section>
  );
};

export default Posts;
