import { Box, List, useTheme } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import SidebarItem from "./SidebarItem";
import { ContentPaste, LocationCity, SportsEsports } from "@mui/icons-material";
interface SidebarProps {
  isNonMobileScreens: boolean;
  sidebarOn: boolean;
}

const Sidebar = ({ isNonMobileScreens, sidebarOn }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const routes = [
    {
      path: "/owner/dashboard",
      label: "Dashboard",
      icon: (
        <DashboardIcon
          sx={{
            color: theme.palette.primary.contrastText,
            fontSize: "1.5rem"
          }}
        />
      ),
    },
    {
      path: "/owner/locations",
      label: "Locations",
      icon: (
        <LocationCity
          sx={{
            color: theme.palette.primary.contrastText,
            fontSize: "1.5rem"
          }}
        />
      ),
    },
    {
      path: "/owner/session/templates",
      label: "Session Templates",
      icon: (
        <ContentPaste
          sx={{
            color: theme.palette.primary.contrastText,
            fontSize: "1.5rem"
          }}
        />
      ),
    },
    {
      path: "/owner/sessions",
      label: "Sessions",
      icon: (
        <SportsEsports
          sx={{
            color: theme.palette.primary.contrastText,
            fontSize: "1.5rem"
          }}
        />
      ),
    },
    {
      path: "/owner/analysis",
      label: "Analysis",
      icon: (
        <BarChartIcon
          sx={{
            color: theme.palette.primary.contrastText,
            fontSize: "1.5rem"
          }}
        />
      ),
    },
  ];

  return (
    <>
      <Box
        width={isNonMobileScreens ? "250px" : "70px"}
        display={isNonMobileScreens ? (sidebarOn ? "flex" : "none") : "none"}
        flexDirection="column"
        borderRadius={theme.shape.borderRadius}
        bgcolor={theme.palette.background.paper}
        overflow="auto"
        color={theme.palette.text.primary}
        py={2}
        m={2}
        sx={{
          transition: "width 0.3s ease-in-out",
        }}
      >
        <List sx={{ width: '100%' }}>
          {routes.map((route) => (
            <SidebarItem
              isNonMobileScreens={isNonMobileScreens}
              key={route.path}
              route={route}
              isSelected={location.pathname === route.path}
              onClick={() => navigate(route.path)}
            />
          ))}
        </List>
      </Box>
      {!isNonMobileScreens && (
        <Box
          width="100%"
          position="fixed"
          bottom={0}
          display={!isNonMobileScreens ? (sidebarOn ? "flex" : "none") : "none"}
          justifyContent="space-evenly"
          bgcolor={theme.palette.background.default}
          boxShadow="rgba(0, 0, 0, 0.15) 0px -2px 8px"
          color={theme.palette.text.primary}
          borderTop={`1px solid ${theme.palette.divider}`}
          py={1}
          sx={{
            transition: "transform 0.3s ease-in-out",
            animation: sidebarOn ? "slideUp 0.3s ease-in-out" : "none",
            "@keyframes slideUp": {
              from: { transform: "translateY(100%)", opacity: 0 },
              to: { transform: "translateY(0)", opacity: 1 }
            }
          }}
        >
          {routes.map((route) => (
            <SidebarItem
              isNonMobileScreens={isNonMobileScreens}
              key={route.path}
              route={route}
              isSelected={String(location.pathname).startsWith(route.path)}
              onClick={() => navigate(route.path)}
            />
          ))}
        </Box>
      )}
    </>
  );
};

export default Sidebar;
