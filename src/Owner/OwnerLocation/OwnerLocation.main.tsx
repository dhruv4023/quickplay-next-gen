import { Box, Button, Typography, useTheme } from "@mui/material";
import WidgetsOnPage from "../../components/Containers/WidgetsOnPage";
import { RootState } from "../../state/store";
import { useSelector, useDispatch } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { getAllLocationsApiCall } from "./OwnerLocation.api";
import { Location } from "../../schemas/Location/OwnerLocation.schema";
import { isApiResponse } from "../../schemas/Response.schema";
import LocationCardView from "./LocationCardView";
import Loading from "../../components/Loading/Loading";
import { useAlert } from "../../utils/Alert";
import FlexBetween from "../../components/Containers/FlexBetween";
import { setLocations } from "../../state/slices/locationSlice";
import AddIcon from '@mui/icons-material/Add';
import { addButtonStyle } from "./Owner.css";
import { useNavigate } from "react-router-dom";


const OwnerLocation = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const token = useSelector((state: RootState) => state.auth.token);
  const locations = useSelector((state: RootState) => state.location.locations);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [locationsState, setLocationsState] = useState<Location[]>([]);

  const fetchLocations = useCallback(async () => {
    if (!token) return;
    setLoading(true);

    const response = await getAllLocationsApiCall(token);
    if (isApiResponse(response)) {
      const data = response.data as Location[];
      setLocationsState(data);
      dispatch(setLocations(data));
      showAlert("Locations fetched successfully", "success");
    } else {
      showAlert(response.message, "error");
    }

    setLoading(false);
  }, [token]);

  useEffect(() => {
    if (locations.length > 0) {
      setLocationsState(locations);
    } else {
      fetchLocations();
    }
  }, [locations.length, fetchLocations]);

  const handleAddLocation = () => {
    navigate(`/owner/locations/NEW`);
  };

  return (
    <Box>
      <WidgetsOnPage
        isSidebarShouldBeOn={true}
        components={
          <Box sx={{ p: 3 }}>
            {loading && <Loading />}
            <FlexBetween>
              <Typography variant="h4">Locations</Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddLocation}
                disabled={loading}
                sx={addButtonStyle(theme)}
              >
                Add Location
              </Button>
            </FlexBetween>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
              {locationsState.length > 0 ? (
                locationsState.map((location) => (
                  <Box key={location._id} sx={{ flex: '1 1 300px', minWidth: '300px', maxWidth: '400px' }}>
                    <LocationCardView location={location} />
                  </Box>
                ))
              ) : (
                !loading && (
                  <Typography
                    variant="body1"
                    sx={{ mt: 4, mx: "auto", textAlign: "center", width: "100%" }}
                  >
                    No locations added yet.
                  </Typography>
                )
              )}
            </Box>
          </Box>
        }
      />
    </Box>
  );
};

export default OwnerLocation;
