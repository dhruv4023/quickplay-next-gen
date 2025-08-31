import { useState } from "react";
import Dropzone from "react-dropzone";
import {
  Box,
  CircularProgress,
  Typography,
  IconButton,
  useTheme,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { uploadImageApiCall } from "../../utils/uploadImg.api";
import { useAlert } from "../../utils/Alert";
import { isApiResponse } from "../../schemas/Response.schema";
import { useAppSelector } from "../../state/store";

interface ImageComponentProps {
  image?: string;
  setImage?: (image: string) => void;
  size?: string;
  isCircular?: boolean;
  allowEdit?: boolean;
  alt?: string;
  sx?: object;
}

const ImageComponent: React.FC<ImageComponentProps> = ({
  image,
  setImage,
  alt="Image",
  size = "200px",
  sx={},
  isCircular = true,
  allowEdit = false,
}) => {
  const theme = useTheme();
  const { showAlert } = useAlert();
  const token = useAppSelector((state) => state.auth.token);

  const [previewUrl, setPreviewUrl] = useState<string>(
    image || "/assets/defaultUserPic.png"
  );
  const [uploading, setUploading] = useState<boolean>(false);

  const handleDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
      setUploading(true);

      try {
        // Upload Image
        const result = await uploadImageApiCall(file, token);

        if (isApiResponse(result)) {
          showAlert(result.message, "success");
          setImage && setImage(result.data?.url);
          setPreviewUrl(result.data?.url);
        } else {
          showAlert(result.message, "error");
          setPreviewUrl(image || "/assets/defaultUserPic.png");
        }
      } catch (error) {
        console.error(error);
        showAlert("An error occurred during image upload.", "error");
        setPreviewUrl(image || "/assets/defaultUserPic.png");
      }

      setUploading(false);
      URL.revokeObjectURL(preview);
    }
  }

  return (
    <Dropzone
      accept={{
        "image/jpeg": [".jpg", ".jpeg"],
        "image/png": [".png"],
      }}
      multiple={false}
      onDrop={handleDrop}
      disabled={!allowEdit}
    >
      {({ getRootProps, getInputProps }) => (
        <Box
          {...getRootProps()}
          position="relative"
          width={size}
          height={size}
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            borderRadius: isCircular ? "50%" : "0",
            overflow: "hidden",
            border: allowEdit
              ? `2px dashed ${theme.palette.primary.main}`
              : "none",
            cursor: allowEdit ? "pointer" : "default",
            "&:hover": allowEdit
              ? { borderColor: theme.palette.primary.contrastText }
              : undefined,
            ...sx,
          }}
        >
          {uploading && (
            <Box
              position="absolute"
              top={0}
              left={0}
              width="100%"
              height="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              bgcolor="rgba(255, 255, 255, 0.8)"
              zIndex={2}
            >
              <CircularProgress />
            </Box>
          )}
          <img
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: previewUrl ? "block" : "none",
            }}
            alt={alt}
            src={previewUrl}
          />
          {!previewUrl && !uploading && (
            <Typography variant="body2" color="textSecondary">
              Drag & Drop or Click to Upload
            </Typography>
          )}
          {allowEdit && !uploading && (
            <IconButton
              sx={{
                position: "absolute",
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                },
              }}
            >
              <Edit />
              <input {...getInputProps()} />
            </IconButton>
          )}
        </Box>
      )}
    </Dropzone>
  );
};

export default ImageComponent;
