import { Box, ListItemButton, Typography, useTheme, Tooltip } from "@mui/material";

const SidebarItem = ({ route, isSelected, onClick, isNonMobileScreens }: {
  route: {
    path: string;
    label: string;
    icon: React.ReactElement;
  };
  isSelected: boolean;
  onClick: () => void;
  isNonMobileScreens: boolean;
}) => {
  const theme = useTheme();

  return (
    <Tooltip title={!isNonMobileScreens ? route.label : ""} placement="right">
      <ListItemButton
        selected={isSelected}
        onClick={onClick}
        alignItems={"center"}
        sx={{
          my: ".5rem",
          mx: isNonMobileScreens ? "0.5rem" : "0.2rem",
          borderRadius: "8px",
          transition: "all 0.2s ease-in-out",
          "&.Mui-selected": {
            bgcolor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            boxShadow: `0 2px 4px ${theme.palette.primary.main}40`,
          },
          "&.Mui-selected:hover": {
            bgcolor: theme.palette.primary.dark,
            transform: "translateY(-2px)",
          },
          "&:hover": {
            bgcolor: theme.palette.primary.light,
            transform: "translateY(-2px)",
          },
        }}
      >
        <Box 
          m={!isNonMobileScreens ? "auto" : "0"}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.2s",
            "&:hover": {
              transform: "scale(1.1)",
            }
          }}
        >
          {route.icon}
        </Box>
        {isNonMobileScreens && (
          <Typography 
            mx={2} 
            fontSize={"1rem"}
            fontWeight={isSelected ? 600 : 400}
            sx={{
              transition: "color 0.2s",
              color: isSelected ? theme.palette.primary.contrastText : theme.palette.text.primary
            }}
          >
            {route.label}
          </Typography>
        )}
      </ListItemButton>
    </Tooltip>
  );
};

export default SidebarItem;
