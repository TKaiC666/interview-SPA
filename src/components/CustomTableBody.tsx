import { useNavigate } from "react-router";
import { TableBody, TableRow, TableCell, Skeleton } from "@mui/material";
import type { PostInfo } from "@/types";
import type { Column } from "@/types/ui";

type CustomTableBodyProps = {
  columns: readonly Column[];
  rows: readonly PostInfo[];
  isLoading?: boolean;
};

const SkeletonTableRow = ({
  columns,
}: Pick<CustomTableBodyProps, "columns">) => (
  <TableBody>
    {new Array(10).fill("skeleton").map((_, index) => (
      <TableRow key={index}>
        {columns.map((column) => {
          return (
            <TableCell key={column.id} align="left">
              <Skeleton />
            </TableCell>
          );
        })}
      </TableRow>
    ))}
  </TableBody>
);

const CustomTableBody = ({
  columns,
  rows,
  isLoading,
}: CustomTableBodyProps) => {
  const ROUTE_POST_DETAIL = "/post-detail";
  const navigate = useNavigate();
  const handleRowClick = (postId: number) => {
    navigate(`${ROUTE_POST_DETAIL}/${postId}`);
  };

  if (isLoading) return <SkeletonTableRow columns={columns} />;

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
            const value = row[column.id as keyof PostInfo];
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
