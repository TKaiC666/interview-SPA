import { useState } from "react";
import {
  Paper,
  Table,
  TableContainer,
  TablePagination,
  CircularProgress,
  Stack,
  Button,
  Typography,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
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
      id: "id",
      label: "Index",
      width: "5%",
    },
    {
      id: "title",
      label: "Title",
      width: "70%",
    },
    {
      id: "username",
      label: "User",
      width: "25%",
    },
  ];

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    setCursor({
      start: newPage * ROWS_PER_PAGE,
      end: newPage * ROWS_PER_PAGE + ROWS_PER_PAGE,
    });
  };

  const handleClickRefresh = () => {
    refetch();
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        useFlexGap
        sx={{
          mb: 2,
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Typography
          variant="h5"
          component="h5"
          sx={{
            display: "flex",
          }}
        >
          All Posts
        </Typography>
        <Button
          variant="contained"
          disabled={isLoading}
          startIcon={<RefreshIcon />}
          onClick={handleClickRefresh}
        >
          Refresh
        </Button>
      </Stack>
      <Paper sx={{ position: "relative", width: "100%", mb: 2 }}>
        <TableContainer style={{ position: "relative" }}>
          <Table>
            <CustomTableHead columns={columns} />
            <CustomTableBody
              columns={columns}
              rows={posts}
              isLoading={isLoading}
            />
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
      </Paper>
    </>
  );
};

export default Posts;
