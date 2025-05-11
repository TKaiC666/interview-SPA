import { Link } from "react-router";
import useFetchData from "@/hooks/useFetchData";
import { getAllPosts } from "@/lib/dataFetch";

// TODO: userName 的資訊要用 userId 和 getUserInfo 取得。
// TODO: 兩個 api 的 data mapping
const Posts = () => {
  const { data, isLoading, error, refetch } = useFetchData(getAllPosts);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section>
      {data && (
        <ul>
          {data.map((post, index) => (
            <li key={post.id}>
              <Link to={`/post-detail/${post.id}`}>
                <span>{index + 1}</span>
                <span>{post.title}</span>
                <span>{post.userId}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <button onClick={refetch}>Refetch</button>
    </section>
  );
};

export default Posts;
