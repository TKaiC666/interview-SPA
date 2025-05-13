import { Link } from "react-router";
import { TableBody, TableRow, TableCell } from "@mui/material";
import type { PostInfo } from "@/types";
import type { Column } from "@/types/ui";

type CustomTableBodyProps = {
  columns: readonly Column[];
  rows: readonly PostInfo[];
};

const CustomTableBody = ({ columns, rows }: CustomTableBodyProps) => {
  return (
    <TableBody>
      {rows.map((row) => (
        <TableRow>
          {/* <Link to={`/post-detail/${row.id}`}> */}
          {columns.map((column) => {
            const value = row[column.id];
            return <TableCell align="left">{value}</TableCell>;
          })}
          {/* </Link> */}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default CustomTableBody;
