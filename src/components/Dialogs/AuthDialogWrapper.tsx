import { Box, Dialog, IconButton, useMediaQuery } from "@mui/material";
import { fadeIn } from "../../utils/animation";
import Loading from "../Loading/Loading";
import WidgetWrapper from "../Containers/WidgetWrapper";
import { Close } from "@mui/icons-material";

const AuthDialogWrapper = ({
    loading,
    open,
    components,
    onClose,
}: {
    loading: boolean;
    open: boolean;
    components: React.ReactNode;
    onClose: () => void;
}) => {
    const isNonMobileScreens = useMediaQuery("(min-width: 650px)");

    return (
        <Dialog
            open={open}
            scroll="body"
            PaperProps={{
                sx: {
                    borderRadius: "24px",
                    overflow: "visible",
                    background: "transparent",
                },
            }}
        >
            {loading && <Loading />}
            <WidgetWrapper
                sx={{
                    backgroundImage:
                        "linear-gradient(135deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2)), url('/auth.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    maxHeight: "90vh",
                    overflowY: "auto",
                    p: { xs: "2rem", sm: "3rem" },
                    m: "0 auto",
                    borderRadius: "24px",
                    position: "relative",
                    animation: `${fadeIn} 0.4s cubic-bezier(0.4, 0, 0.2, 1)`,
                    "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background:
                            "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%)",
                        zIndex: 1,
                    },
                }}
            >
                <IconButton
                    sx={{
                        position: "absolute",
                        top: "1.2rem",
                        right: "1.2rem",
                        color: "white",
                        backgroundColor: "rgba(255, 255, 255, 0.15)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.25)",
                            transform: "rotate(90deg)",
                            borderColor: "rgba(255, 255, 255, 0.3)",
                        },
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        zIndex: 2,
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    }}
                    onClick={onClose}
                >
                    <Close sx={{ fontSize: "1.5rem" }} />
                </IconButton>
                <Box
                    sx={{
                        position: "relative",
                        zIndex: 2,
                        "& > *": {
                            animation: `${fadeIn} 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.1s both`,
                        },
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: "rgba(255, 255, 255, 0.85)",
                            backdropFilter: "blur(10px)",
                            borderRadius: "16px",
                            padding: { xs: "2rem", sm: "2.5rem" },
                            width: "100%",
                            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                            animation: `${fadeIn} 0.5s ease-out`,
                            "&:hover": {
                                boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
                            },
                            transition: "all 0.3s ease",
                        }}
                    >
                        {components}
                    </Box>
                </Box>
            </WidgetWrapper>
        </Dialog>
    );
};

export default AuthDialogWrapper;
