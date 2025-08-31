import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

import { ArrowBack, Cancel, Delete, Edit, MapRounded } from "@mui/icons-material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudDoneIcon from "@mui/icons-material/CloudDone";

import WidgetsOnPage from "../../components/Containers/WidgetsOnPage";
import FlexBetween from "../../components/Containers/FlexBetween";
import FlexBetweenColumn from "../../components/FlexBetweenColumn";
import EditableData from "../../components/EditableData";
import ImageComponent from "../../components/Containers/ImageComponent";
import DeleteDialog from "../../components/Dialogs/DeleteDialog";

import { useAppSelector } from "../../state/store";
import { useAlert } from "../../utils/Alert";

import {
  getSportIcon,
  SPORTS,
} from "./location.util";

import {
  createLocationApiCall,
  deleteLocationApiCall,
  getLocationApiCall,
  updateLocationApiCall,
} from "./OwnerLocation.api";

import { isApiResponse } from "../../schemas/Response.schema";
import { Location } from "../../schemas/Location/OwnerLocation.schema";
import Loading from "../../components/Loading/Loading";
import FlexEvenlyColumn from "../../components/FlexEvenlyColumn";

const OwnerLocationFormView = () => {
  const { ID } = useParams<{ ID: string }>();
  const theme = useTheme();
  const navigate = useNavigate();
  const { token } = useAppSelector((state) => state.auth);
  const [isEdit, setIsEdit] = useState(ID === "NEW");
  const [location, setLocation] = useState<Location>({
    _id: ID || "NEW",
    locationName: "",
    area: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    mapLink: "",
    sports: [],
    images: [],
  });
  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlert();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const getLocationById = useCallback(async () => {
    setLoading(true);
    try {
      if (!ID || !token || ID === "NEW") return;
      const response = await getLocationApiCall(ID, token);
      if (isApiResponse(response)) {
        setLocation(response.data as Location);
      } else {
        showAlert(response.message, "error");
      }
    } catch (error) {
      showAlert("Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  }, [ID, token, showAlert]);

  const handleEdit = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response =
        location._id === "NEW"
          ? await createLocationApiCall(location, token)
          : await updateLocationApiCall(location._id, location, token);

      if (isApiResponse(response)) {
        setLocation(response.data as Location);
        showAlert(
          location._id === "NEW"
            ? "Location created successfully"
            : "Location updated successfully",
          "success"
        );
        setIsEdit(false);
      } else {
        showAlert(response.message, "error");
      }
    } catch (error) {
      showAlert("Error updating or creating location", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!token) return;
    setLoading(true);
    try {
      if (location._id === "NEW") {
        navigate("/owner/locations");
        showAlert("Location deleted", "info");
      } else {
        const response = await deleteLocationApiCall(location._id, token);
        if (isApiResponse(response)) {
          showAlert("Location deleted successfully", "success");
          navigate("/owner/locations");
        } else {
          showAlert(response.message, "error");
        }
      }
    } catch (error) {
      showAlert("Error deleting location", "error");
    } finally {
      setDeleteDialogOpen(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ID !== "NEW") getLocationById();
  }, [getLocationById]);

  return (
    <WidgetsOnPage
      isSidebarShouldBeOn
      components={
        <FlexBetweenColumn gap={2} sx={{ p: 3 }}>
          {loading && <Loading />}
          <FlexBetween
            sx={{
              width: "100%",
              p: 2,
              backgroundColor: theme.palette.background.paper,
              borderRadius: 2,
            }}
          >
            <FlexBetween gap={2}>
              <IconButton onClick={() => navigate("/owner/locations/")}>
                <ArrowBack sx={{ color: "black" }} />
              </IconButton>
              <Typography variant="h5" my={"auto"} fontWeight="bold">
                {location.locationName || "New Location"}
              </Typography>
            </FlexBetween>

            <Box>
              {!isEdit ? (
                <FlexBetween gap={2}>
                  <IconButton onClick={() => setDeleteDialogOpen(true)}>
                    <Delete sx={{ color: "red" }} />
                  </IconButton>
                  <IconButton onClick={() => setIsEdit(true)}>
                    <Edit sx={{ color: "blue" }} />
                  </IconButton>
                  <IconButton>
                    <CloudDoneIcon sx={{ color: "green" }} />
                  </IconButton>
                </FlexBetween>
              ) : (
                <FlexBetween gap={2}>
                  <IconButton
                    onClick={() => {
                      setIsEdit(false);
                      if (ID === "NEW") navigate("/owner/locations/");
                    }}
                  >
                    <Cancel sx={{ color: "red" }} />
                  </IconButton>
                  <IconButton onClick={handleEdit}>
                    <CloudUploadIcon sx={{ color: "blue" }} />
                  </IconButton>
                </FlexBetween>
              )}
            </Box>
          </FlexBetween>

          <FlexBetween
            sx={{
              p: 3,
              backgroundColor: theme.palette.background.paper,
              borderRadius: 2,
            }}
          >
            <Stack spacing={3}>
              {/* Address Section */}
              <Typography variant="h6" fontWeight="bold" sx={{ color: theme.palette.primary.dark }}>
                Address
              </Typography>

              {/* Address Fields */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ flex: '1 1 45%', minWidth: '200px' }}>
                  <EditableData
                    fieldName="area"
                    data={location}
                    setData={setLocation}
                    isEdit={isEdit}
                  />
                </Box>
                <Box sx={{ flex: '1 1 45%', minWidth: '200px' }}>
                  <EditableData
                    fieldName="addressLine1"
                    data={location}
                    setData={setLocation}
                    isEdit={isEdit}
                  />
                </Box>
                <Box sx={{ flex: '1 1 100%' }}>
                  <EditableData
                    fieldName="addressLine2"
                    data={location}
                    setData={setLocation}
                    isEdit={isEdit}
                  />
                </Box>
                <Box sx={{ flex: '1 1 45%', minWidth: '200px' }}>
                  <EditableData
                    fieldName="city"
                    data={location}
                    setData={setLocation}
                    isEdit={isEdit}
                  />
                </Box>
                <Box sx={{ flex: '1 1 45%', minWidth: '200px' }}>
                  <EditableData
                    fieldName="state"
                    data={location}
                    setData={setLocation}
                    isEdit={isEdit}
                  />
                </Box>
                <Box sx={{ flex: '1 1 45%', minWidth: '200px' }}>
                  <EditableData
                    fieldName="pincode"
                    data={location}
                    setData={setLocation}
                    isEdit={isEdit}
                  />
                </Box>
              </Box>
              {isEdit ? (
                <EditableData
                  fieldName="mapLink"
                  data={location}
                  setData={setLocation}
                  isEdit={isEdit}
                />
              ) : (
                <Button onClick={() => window.open(location.mapLink, "_blank")}>
                  View on Google Map <MapRounded />
                </Button>
              )}
            </Stack>
          </FlexBetween>

          <FlexBetween
            sx={{
              p: 3,
              backgroundColor: theme.palette.background.paper,
              borderRadius: 2,
            }}
          >
            <FlexEvenlyColumn>
              {/* Available Sports Section */}
              <Typography variant="h6" fontWeight="bold" sx={{ color: theme.palette.primary.dark }}>
                Available Sports
              </Typography>
              <Stack direction="column" spacing={1} sx={{ mt: 2 }}>
                {SPORTS.map((sport, index) => {
                  const isSelected = location.sports.some((s) => s.name === sport.name);
                  return (
                    <Chip
                      key={index}
                      icon={getSportIcon(sport.name)}
                      label={sport.name}
                      onClick={() => {
                        if (!isEdit) return;
                        setLocation((prev) => {
                          const current = prev.sports || [];
                          return {
                            ...prev,
                            sports: isSelected
                              ? current.filter((s) => s.name !== sport.name)
                              : [...current, sport],
                          };
                        });
                      }}
                      sx={{
                        backgroundColor: isSelected
                          ? theme.palette.primary.main
                          : "rgba(25, 118, 210, 0.08)",
                        color: isSelected ? "white" : theme.palette.primary.main,
                        fontWeight: "bold",
                        ".MuiChip-icon": {
                          color: isSelected ? "white" : theme.palette.primary.main,
                        },
                        "&:hover": {
                          backgroundColor: isSelected
                            ? theme.palette.primary.dark
                            : "rgba(25, 118, 210, 0.16)",
                        },
                      }}
                    />
                  );
                })}
              </Stack>
            </FlexEvenlyColumn>
          </FlexBetween>

          <Box>
            <Typography variant="subtitle2" fontWeight="bold">
              Location Images
            </Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap" mt={1}>
              {location.images?.map((img, index) => (
                <ImageComponent
                  key={index}
                  size="10rem"
                  image={img}
                  sx={{
                    borderRadius: 1,
                    objectFit: "cover",
                    height: "6rem",
                  }}
                  isCircular={false}
                  allowEdit={false}
                  alt={`Location Image ${index + 1}`}
                />
              ))}

              {/* Editable slot for adding/changing an image */}
              <ImageComponent
                key="editable"
                size="10rem"
                image={"/assets/pic.png"}
                setImage={(newImg) => {
                  // Replace with your logic to handle the new image
                  const updatedImages = [...(location.images || []), newImg];
                  setLocation({ ...location, images: updatedImages });
                }}
                sx={{
                  borderRadius: 1,
                  objectFit: "cover",
                  height: "6rem",
                  border: "2px dashed #ccc",
                  cursor: "pointer",
                }}
                isCircular={false}
                allowEdit={true}
                alt="Add Image"
              />
            </Stack>
          </Box>

          <DeleteDialog
            displayData={location.locationName || "New location"}
            open={deleteDialogOpen}
            id={location._id}
            onClose={() => setDeleteDialogOpen(false)}
            onConfirm={handleDelete}
          />
        </FlexBetweenColumn>
      }
    />
  );
};

export default OwnerLocationFormView;
