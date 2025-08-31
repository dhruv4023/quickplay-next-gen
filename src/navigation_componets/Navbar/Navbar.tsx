import { useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import { Menu, Close, LoginRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/Containers/FlexBetween";
import MenuItems from "./Components/MenuItems";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import OwnerMenuItems from "./Components/OwnerMenuItems";
import PlayerMenuItems from "./Components/PlayerMenuItems";
import { getSubdomain } from "../../utils/getSubdomain";
import { setActiveDialog } from "../../state/slices/authSlice";

export const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const isNonMobileScreens = useMediaQuery("(min-width: 660px)");
  const token = useSelector((state: RootState) => state.auth.token);
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();

  const buttonStyles = {
    color: "whitesmoke",
    fontSize: "1rem",
    textTransform: "capitalize",
    "&:hover": {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.contrastText,
    },
  };

  const subdomain = getSubdomain();
  const isPlayerRoute = subdomain === "player";
  const isOwnerRoute = subdomain === "owner";
  return (
    <>
      <FlexBetween
        boxShadow={`${theme.shadows[0]}`}
        sx={{ backgroundColor: theme.palette.background.default }}
        zIndex={1000}
      >
        <FlexBetween>
          {!isNonMobileScreens && (
            <Box sx={{ m: 'auto', zIndex: "100" }}>
              <IconButton
                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
              >
                {isMobileMenuToggled ? (
                  <Close sx={{ color: "primary" }} />
                ) : (
                  <Menu sx={{ color: "primary" }} />
                )}
              </IconButton>
            </Box>
          )}
          <FlexBetween gap={1} paddingRight={1} >
            <FlexBetween
              onClick={(event) => {
                event.preventDefault();
                navigate("/");
                setTimeout(() => {
                  document.body.scrollTop = 0;
                  document.documentElement.scrollTop = 0;
                }, 100);
              }}
              alignItems={"center"}
              justifyContent={"center"}
              textAlign={"center"}
              gap={1}
            >
              <Typography
                color={theme.palette.primary.main}
                fontSize={"2rem"}
                my={"auto"}
                sx={{
                  marginLeft:"1rem",
                  "&:hover": {
                    color: theme.palette.primary.light,
                    cursor: "pointer",
                  },
                 }}
                fontWeight={"bold"}
              >
                QuickPlay
              </Typography>
            </FlexBetween>
          </FlexBetween>
        </FlexBetween>

        <FlexBetween gap={"1rem"} height={"7vh"} alignItems={"center"}>
          {isNonMobileScreens && (
            isPlayerRoute ? <PlayerMenuItems /> : isOwnerRoute ? <OwnerMenuItems /> : <MenuItems />
          )}
        </FlexBetween>
        {
          !token && (
            <FlexBetween>
              {isOwnerRoute && (
                <Button
                  onClick={() => dispatch(setActiveDialog({ activeDialog: "ownerLogin" }))}
                  sx={{ ...buttonStyles, marginRight: 1, my:2 }}
                >
                  <FlexBetween gap={1}>
                    <LoginRounded sx={{ cursor: "pointer", color: "whitesmoke" }} />
                    {isNonMobileScreens && <Box>Owner Log In</Box>}
                  </FlexBetween>
                </Button>
              )}

              {isPlayerRoute && (
                <Button
                  onClick={() => dispatch(setActiveDialog({ activeDialog: "playerLogin" }))}
                  sx={{ ...buttonStyles, marginRight: 1,my:2 }}
                >
                  <FlexBetween gap={1}>
                    <LoginRounded sx={{ cursor: "pointer", color: "whitesmoke" }} />
                    {isNonMobileScreens && <Box>Player Log In</Box>}
                  </FlexBetween>
                </Button>
              )}
            </FlexBetween>
          )}
        {!isNonMobileScreens && (
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: isMobileMenuToggled ? "70%" : "0",
              height: "100%",
              backgroundColor: "rgba(10,10,10,0.8)",
              boxShadow: isMobileMenuToggled
                ? `-5px 0px 15px rgba(0, 0, 0, 0.2)`
                : "none",
              zIndex: 10,
              overflow: "hidden",
              transition: "width 0.3s ease-in-out",
            }}
          >
            <Box display="flex" justifyContent="flex-end" p="1rem">
              <IconButton onClick={() => setIsMobileMenuToggled(false)}>
                <Close />
              </IconButton>
            </Box>
            <FlexBetween
              flexDirection="column"
              alignItems="center"
              gap="2rem"
              padding="1rem"
              sx={{
                opacity: isMobileMenuToggled ? 1 : 0,
                transition: "opacity 0.3s ease-in-out",
              }}
            >
              {isPlayerRoute ? <PlayerMenuItems /> : isOwnerRoute ? <OwnerMenuItems /> : <MenuItems />}
            </FlexBetween>
          </Box>
        )}
      </FlexBetween>
    </>
  );
};
