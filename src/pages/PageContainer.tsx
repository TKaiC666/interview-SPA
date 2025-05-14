import { Outlet } from "react-router";
import { Container } from "@mui/material";

const PageContainer = () => (
  <Container maxWidth="md" sx={{ mt: 10 }}>
    <Outlet />
  </Container>
);

export default PageContainer;
