import { useParams } from "react-router";

const PostDetail = () => {
  const { postId } = useParams();
  return <>{postId}</>;
};

export default PostDetail;
