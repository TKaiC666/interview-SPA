import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Posts from "@/pages/Posts";
import PostDetail from "@/pages/PostDetail";
import PageNotFound from "@/pages/PageNotFound";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Posts />} />
      <Route path="/post-detail/:postId" element={<PostDetail />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </BrowserRouter>
);
