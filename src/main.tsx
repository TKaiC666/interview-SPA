import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Posts from "@/pages/Posts";
import PostDetail from "@/pages/PostDetail";
import PageNotFound from "@/pages/PageNotFound";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Posts />} />
      <Route path="/post-detail/:postId" element={<PostDetail />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </BrowserRouter>
);
