import { TableHead, TableRow, TableCell, TableSortLabel } from "@mui/material";
import type { Column } from "@/types/ui";

interface CustomTableHeadProps {
  columns: readonly Column[];
}

const CustomTableHead = ({ columns }: CustomTableHeadProps) => {
  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            width={column.width}
            align="left"
            padding="normal"
          >
            <TableSortLabel direction="asc">{column.label}</TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default CustomTableHead;
