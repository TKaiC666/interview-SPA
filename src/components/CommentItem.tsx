import { useState } from "react";
import {
  Typography,
  ListItem,
  ListItemText,
  IconButton,
  CircularProgress,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import type { Comment } from "@/types";
import { useComment } from "@/contexts/commentContext";

type CommentItemProps = {
  data: Comment;
};

const CommentItem = ({ data }: CommentItemProps) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const { deleteComment } = useComment();
  const handleClickDeleteComment = async () => {
    if (!deleteComment) return;
    setIsDeleting(true);
    const result = await deleteComment(data.id);
    if (result === "success") setIsDeleting(false);
  };

  return (
    <ListItem
      alignItems="flex-start"
      sx={{ px: 0 }}
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          disabled={isDeleting}
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={handleClickDeleteComment}
        >
          {isDeleting ? <CircularProgress size={20} /> : <DeleteForeverIcon />}
        </IconButton>
      }
    >
      <ListItemText
        primary={data.body}
        sx={{ pr: 10 }}
        secondary={
          <Typography
            component="span"
            variant="body2"
            sx={{ color: "text.secondary", display: "inline" }}
          >
            {data.name}
          </Typography>
        }
      />
    </ListItem>
  );
};

export default CommentItem;
