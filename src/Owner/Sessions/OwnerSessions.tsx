import WidgetsOnPage from "../../components/Containers/WidgetsOnPage";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { ErrorResponse } from "../../schemas/Response.schema";
import { ApiResponse } from "../../schemas/Response.schema";

const isApiResponse = (response: ApiResponse | ErrorResponse): response is ApiResponse => {
  return response.success;
};

const OwnerSessions = () => {
  return (
    <Box>
      <WidgetsOnPage
        isSidebarShouldBeOn={true}
        components={
          <Box sx={{ p: 3 }}>
            <Typography variant="h4">Sessions</Typography>
          </Box>
        }
      />
    </Box>
  )
}

export default OwnerSessions;