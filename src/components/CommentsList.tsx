import React from "react";
import { List, Divider } from "@mui/material";
import type { Comment } from "@/types";
import CommentItem from "./CommentItem";

type CommentsListProps = {
  comments: Comment[];
};

const CommentsList = ({ comments }: CommentsListProps) => {
  return (
    <List>
      {comments.map((comment, index) => {
        return (
          <React.Fragment key={comment.id}>
            <CommentItem data={comment} />
            {index < comments.length - 1 && (
              <Divider component="li" color="text.secondary" />
            )}
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default CommentsList;
