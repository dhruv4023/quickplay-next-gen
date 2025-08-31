import { useState } from "react";
import PropTypes from "prop-types";
import { Tooltip, Menu, MenuItem, Button, Box, useTheme } from "@mui/material";
import { ArrowDropDown, Logout } from "@mui/icons-material";
import { setActiveDialog } from "../../../state/slices/authSlice";
import { useDispatch } from "react-redux";
import FlexBetween from "../../../components/Containers/FlexBetween";
import { Owner, Player } from "../../../schemas/AuthUser/User.schema";


const UserProfileDropdown = ({ user, handleLogout }: { user: Owner | Player, handleLogout: () => void }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const { palette } = useTheme();
  return (
    <FlexBetween
      height={"100%"}
      alignItems={"center"}
      p={1}
    >
      <Tooltip title={`${user.firstName} ${user.lastName}`}>
        <Box sx={{ fontWeight: 700 }} color={palette.primary.main}>
          <Button onClick={handleClick}>
            <FlexBetween gap={1} alignItems={"center"}>
              <Box>
                Welcome
              </Box>
              <Box>{`${user.firstName} ${user.lastName}`}</Box>
              <ArrowDropDown />
            </FlexBetween>
          </Button>
        </Box>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            dispatch(setActiveDialog({ activeDialog: "owenerForgotPassword" }));
            handleClose();
          }}
        >
          Change Password
        </MenuItem>
        {/* Logout option */}
        <MenuItem
          onClick={() => {
            handleLogout();
            handleClose();
          }}
        >
          <Logout /> Logout
        </MenuItem>
      </Menu>
    </FlexBetween>
  );
};

UserProfileDropdown.propTypes = {
  user: PropTypes.shape({
    userName: PropTypes.string.isRequired,
  }).isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default UserProfileDropdown;
