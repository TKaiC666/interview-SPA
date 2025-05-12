import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Posts from "@/pages/Posts";
import PostDetail from "@/pages/PostDetail";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Posts />} />
      <Route path="/post-detail/:postId" element={<PostDetail />} />
    </Routes>
  </BrowserRouter>
);
