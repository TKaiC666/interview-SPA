import { Container, Box, Typography, Skeleton, Divider } from "@mui/material";
import { useParams } from "react-router";
import usePostDetail from "@/hooks/usePostDetail";
import CommentsList from "@/components/CommentsList";

const PostDetail = () => {
  const postId = Number(useParams().postId);
  const { data, isLoading, error } = usePostDetail(postId);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      {isLoading && (
        <>
          <Box sx={{ mb: 3 }}>
            <Skeleton variant="text" sx={{ mb: 1 }} />
            <Skeleton variant="text" width="30%" />
          </Box>
          <Box>
            <Skeleton variant="rounded" height={300} />
          </Box>
        </>
      )}
      {data && (
        <>
          <Box>
            <Typography variant="h4" component="h4" sx={{ mb: 1 }}>
              {data.title}
            </Typography>
            <Typography
              variant="subtitle1"
              component="div"
              color="text.secondary"
            >
              {data.username}
            </Typography>
          </Box>
          <Box sx={{ mt: 5, mb: 10 }}>
            <Typography variant="body1">{data.body}</Typography>
          </Box>
          <Divider sx={{ mb: 10 }} />
          <Box>
            <Typography variant="h5">Comments</Typography>
            <CommentsList comments={data.comments} />
          </Box>
        </>
      )}
    </Container>
  );
};

export default PostDetail;
