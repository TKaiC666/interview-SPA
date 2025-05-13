import { useState } from "react";
import {
  Container,
  Paper,
  Table,
  TableContainer,
  TablePagination,
  CircularProgress,
} from "@mui/material";
import usePosts from "@/hooks/usePosts";
import type { Column } from "@/types/ui";
import CustomTableHead from "@/components/CustomTableHead";
import CustomTableBody from "@/components/CustomTableBody";

const Posts = () => {
  const INIT_PAGE: number = 0;
  const ROWS_PER_PAGE: number = 10;

  const [page, setPage] = useState<number>(INIT_PAGE);
  const [cursor, setCursor] = useState<{ start: number; end: number }>({
    start: INIT_PAGE,
    end: INIT_PAGE + ROWS_PER_PAGE,
  });
  const { posts, totalPostCount, isLoading, error, refetch } = usePosts(cursor);
  const columns: Column[] = [
    {
      id: "dataIndex",
      label: "Index",
    },
    {
      id: "title",
      label: "Title",
    },
    {
      id: "username",
      label: "User",
    },
  ];

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    setCursor({
      start: newPage * ROWS_PER_PAGE,
      end: newPage * ROWS_PER_PAGE + ROWS_PER_PAGE,
    });
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Container>
      <Paper sx={{ position: "relative", width: "100%", mb: 2 }}>
        {isLoading && (
          <div
            style={{
              position: "absolute",
              zIndex: 1,
              width: "100%",
              height: "100%",
            }}
          >
            <div
              style={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  zIndex: -1,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(190, 190, 190, 0.5)",
                }}
              />
              <CircularProgress />
            </div>
          </div>
        )}
        <TableContainer style={{ position: "relative" }}>
          <Table>
            <CustomTableHead columns={columns} />
            <CustomTableBody columns={columns} rows={posts} />
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={totalPostCount}
          rowsPerPage={10}
          rowsPerPageOptions={[-1]} // disable rows per page
          page={page}
          onPageChange={handleChangePage}
        />
        {/* <button onClick={refetch}>Refresh</button> */}
      </Paper>
    </Container>
  );
};

export default Posts;
