import { useState } from "react";
import { Person, Phone, Edit, Save, Cancel } from "@mui/icons-material";
import { Divider, Typography, TextField, IconButton, Tooltip, Fade, Grow } from "@mui/material";
import { Box, useMediaQuery, useTheme } from "@mui/system";
import ImageComponent from "../../components/Containers/ImageComponent";
import WidgetWrapper from "../../components/Containers/WidgetWrapper";
import FlexBetween from "../../components/Containers/FlexBetween";
import { Owner } from "../../schemas/AuthUser/User.schema";

interface OwnerWidgetsProps {
    owner: Owner;
    editProf?: boolean;
    onEditChange?: (isEditing: boolean) => void;
}

const OwnerWidgets = ({ owner, editProf = false, onEditChange }: OwnerWidgetsProps) => {
    const theme = useTheme();
    const medium = theme.palette.secondary.dark;
    const isNonMobileScreens = useMediaQuery("(min-width:700px)");
    const [imageUrl, setImageUrl] = useState<string | undefined>();
    const [editedUser, setEditedUser] = useState<Owner>({ ...owner });
    const [isEditing, setIsEditing] = useState(editProf);

    if (!owner) return null;

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        if (onEditChange) onEditChange(!isEditing);
    };

    const handleSave = () => {
        setIsEditing(false);
        if (onEditChange) onEditChange(false);
    };

    const handleCancel = () => {
        setEditedUser({ ...owner });
        setIsEditing(false);
        if (onEditChange) onEditChange(false);
    };

    const handleInputChange = (field: keyof Owner) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditedUser(prev => ({ ...prev, [field]: event.target.value }));
    };

    return (
        <Grow in={true} timeout={800}>
            <WidgetWrapper
                sx={{
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: "1.5rem",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)"
                    },
                    backdropFilter: "blur(10px)",
                    border: `1px solid ${theme.palette.divider}`
                }}
                m={2}
                flexDirection={isNonMobileScreens ? "row" : "column"}
            >
                <FlexBetween width="100%">
                    <Box flex={1} p={3}>
                        <Fade in={true} timeout={1000}>
                            <Box display="flex" alignItems="center" gap="1rem" mb={3}>
                                <Person 
                                    fontSize="large" 
                                    sx={{ 
                                        color: theme.palette.primary.main,
                                        transform: "scale(1.2)",
                                        transition: "transform 0.3s ease"
                                    }} 
                                />
                                {isEditing ? (
                                    <Box display="flex" gap={2} width="100%">
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            size="small"
                                            value={editedUser.firstName}
                                            onChange={handleInputChange('firstName')}
                                            label="First Name"
                                            sx={{
                                                "& .MuiOutlinedInput-root": {
                                                    "&:hover fieldset": {
                                                        borderColor: theme.palette.primary.main,
                                                    }
                                                }
                                            }}
                                        />
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            size="small"
                                            value={editedUser.lastName}
                                            onChange={handleInputChange('lastName')}
                                            label="Last Name"
                                            sx={{
                                                "& .MuiOutlinedInput-root": {
                                                    "&:hover fieldset": {
                                                        borderColor: theme.palette.primary.main,
                                                    }
                                                }
                                            }}
                                        />
                                    </Box>
                                ) : (
                                    <Typography
                                        variant="h4"
                                        fontWeight={600}
                                        sx={{
                                            color: theme.palette.primary.main,
                                            textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                                            letterSpacing: "0.5px"
                                        }}
                                    >
                                        {`${owner.firstName} ${owner.lastName}`}
                                    </Typography>
                                )}
                            </Box>
                        </Fade>

                        <Divider sx={{ 
                            my: 3,
                            background: `linear-gradient(90deg, ${theme.palette.primary.light}, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                            height: "2px"
                        }} />

                        <Fade in={true} timeout={1200}>
                            <Box display="flex" flexDirection="column" gap="2rem">
                                <Box 
                                    display="flex" 
                                    alignItems="center" 
                                    gap="1rem"
                                    sx={{
                                        transition: "transform 0.3s ease",
                                        "&:hover": {
                                            transform: "translateX(10px)"
                                        }
                                    }}
                                >
                                    <Phone 
                                        fontSize="large" 
                                        sx={{ 
                                            color: theme.palette.success.main,
                                            filter: "drop-shadow(2px 2px 2px rgba(0,0,0,0.2))"
                                        }} 
                                    />
                                    {isEditing ? (
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            size="small"
                                            value={editedUser.phone}
                                            onChange={handleInputChange('phone')}
                                            label="Phone"
                                            sx={{
                                                "& .MuiOutlinedInput-root": {
                                                    "&:hover fieldset": {
                                                        borderColor: theme.palette.success.main,
                                                    }
                                                }
                                            }}
                                        />
                                    ) : (
                                        <Typography 
                                            color={medium}
                                            sx={{
                                                fontSize: "1.1rem",
                                                fontWeight: 500,
                                                letterSpacing: "0.5px"
                                            }}
                                        >
                                            {owner.phone}
                                        </Typography>
                                    )}
                                </Box>
                            </Box>
                        </Fade>
                    </Box>

                    <Fade in={true} timeout={1400}>
                        <Box display="flex" flexDirection="column" alignItems="center" gap={3} p={3}>
                            <Box
                                sx={{
                                    transition: "transform 0.3s ease",
                                    "&:hover": {
                                        transform: "scale(1.05)"
                                    }
                                }}
                            >
                                <ImageComponent
                                    size={isNonMobileScreens ? "250px" : "10rem"}
                                    setImage={setImageUrl}
                                    image={imageUrl}
                                    isCircular={true}
                                    allowEdit={isEditing}
                                />
                            </Box>

                            {!editProf && (
                                <Box display="flex" gap={2}>
                                    <Tooltip title={isEditing ? "Save Changes" : "Edit Profile"}>
                                        <IconButton
                                            onClick={isEditing ? handleSave : handleEditToggle}
                                            sx={{
                                                backgroundColor: isEditing ? theme.palette.success.main : theme.palette.primary.main,
                                                color: "white",
                                                transition: "all 0.3s ease",
                                                "&:hover": {
                                                    backgroundColor: isEditing ? theme.palette.success.dark : theme.palette.primary.dark,
                                                    transform: "scale(1.1)"
                                                }
                                            }}
                                        >
                                            {isEditing ? <Save /> : <Edit />}
                                        </IconButton>
                                    </Tooltip>
                                    {isEditing && (
                                        <Tooltip title="Cancel">
                                            <IconButton
                                                onClick={handleCancel}
                                                sx={{
                                                    backgroundColor: theme.palette.error.main,
                                                    color: "white",
                                                    transition: "all 0.3s ease",
                                                    "&:hover": {
                                                        backgroundColor: theme.palette.error.dark,
                                                        transform: "scale(1.1)"
                                                    }
                                                }}
                                            >
                                                <Cancel />
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                </Box>
                            )}
                        </Box>
                    </Fade>
                </FlexBetween>
            </WidgetWrapper>
        </Grow>
    );
};

export default OwnerWidgets;
