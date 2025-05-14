import { Typography, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import type { Comment } from "@/types";

type CommentItemProps = {
  data: Comment;
};

const CommentItem = ({ data }: CommentItemProps) => {
  return (
    <ListItem
      alignItems="flex-start"
      sx={{ px: 0 }}
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => {
            console.log("comment id: ", data.id);
          }}
        >
          <DeleteForeverIcon />
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
