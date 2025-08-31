import { styled, TableRow } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.grey[200],
    fontWeight: 700,
    fontSize: "1.1rem",
    borderBottom: `2px solid ${theme.palette.grey[300]}`,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "1rem",
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
  },
}));
export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.grey[100],
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    transition: "background-color 0.3s ease",
  },
}));
