import { useNavigate } from "react-router";
import { TableBody, TableRow, TableCell } from "@mui/material";
import type { PostInfo } from "@/types";
import type { Column } from "@/types/ui";

type CustomTableBodyProps = {
  columns: readonly Column[];
  rows: readonly PostInfo[];
};

const CustomTableBody = ({ columns, rows }: CustomTableBodyProps) => {
  const ROUTE_POST_DETAIL = "/post-detail";
  const navigate = useNavigate();
  const handleRowClick = (postId: number) => {
    navigate(`${ROUTE_POST_DETAIL}/${postId}`);
  };

  return (
    <TableBody>
      {rows.map((row) => (
        <TableRow
          key={row.id}
          style={{ textDecoration: "none" }}
          hover
          onClick={() => {
            handleRowClick(row.id);
          }}
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          {columns.map((column) => {
            // 暫不處理型別問題
            const value = row[column.id];
            return (
              <TableCell key={`${column.id}-${row.id}`} align="left">
                {value}
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default CustomTableBody;
