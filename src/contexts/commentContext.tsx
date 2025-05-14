import { createContext, useContext } from "react";

type CommentContextType = {
  deleteComment?: (id: number) => Promise<"success" | "fail">;
};

export const CommentContext = createContext<CommentContextType>({});
export const useComment = () => useContext(CommentContext);
