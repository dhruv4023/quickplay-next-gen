import WidgetsOnPage from "../../components/Containers/WidgetsOnPage";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";

const OwnerAnalysis = () => {
  return (
    <Box>
      <WidgetsOnPage
        isSidebarShouldBeOn={true}
        components={
          <Box sx={{ p: 3 }}>
            <Typography variant="h4">Analysis</Typography>
          </Box>
        }
      />
    </Box>
  )
}

export default OwnerAnalysis;