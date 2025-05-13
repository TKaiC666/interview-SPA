import { TableHead, TableRow, TableCell, TableSortLabel } from "@mui/material";
import type { Column } from "@/types/ui";

interface CustomTableHeadProps {
  columns: readonly Column[];
}

const CustomTableHead = ({ columns: headCells }: CustomTableHeadProps) => {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align="left" padding="normal">
            <TableSortLabel direction="asc">{headCell.label}</TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default CustomTableHead;
