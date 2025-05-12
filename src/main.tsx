import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Posts from "@/pages/Posts";
import PostDetail from "@/pages/PostDetail";
import PageNotFound from "@/pages/pageNotFound";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Posts />} />
      <Route path="/post-detail" element={<PageNotFound />} />
      <Route path="/post-detail/:postId" element={<PostDetail />} />
    </Routes>
  </BrowserRouter>
);
