import { TextField, Button, Box } from "@mui/material";
import styled from "@emotion/styled";
import { Theme, useTheme } from "@mui/material/styles";
import { FC } from "react";

interface SearchFieldProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  handleSearch: () => void;
}
const StyledSearchField = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  backgroundColor: theme.palette.background.paper,
}));

const SearchField: FC<SearchFieldProps> = ({ searchTerm, setSearchTerm, handleSearch }) => {
  return (
    <StyledSearchField theme={useTheme()} flexGrow={1}>
      <TextField
        label="Search"
        variant="standard"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
        sx={{ marginRight: 2 }}
      />
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
    </StyledSearchField>
  );
};

export default SearchField;
