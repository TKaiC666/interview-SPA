import { Box, Typography, Skeleton, Divider, Button } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useParams, useNavigate } from "react-router";
import usePostDetail from "@/hooks/usePostDetail";
import CommentsList from "@/components/CommentsList";

const PostDetail = () => {
  const navigate = useNavigate();
  const postId = Number(useParams().postId);
  const { data, isLoading, error } = usePostDetail(postId);

  const handleClickBack = () => {
    navigate("/");
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
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
          <Box sx={{ mb: 2 }}>
            <Button
              variant="text"
              startIcon={<ArrowBackIosNewIcon />}
              onClick={handleClickBack}
              sx={{ fontSize: "0.8rem" }}
            >
              Back to all post
            </Button>
          </Box>
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
    </>
  );
};

export default PostDetail;
