import { IconButton, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../../../state/slices/authSlice";
import UserProfileDropdown from "./UserProfileDropDown";
import { RootState } from "../../../state/store";
import { Owner } from "../../../schemas/AuthUser/User.schema";
import { Player } from "../../../schemas/AuthUser/User.schema"; 

const MenuItems = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const owner = useSelector((state: RootState) => state.auth.owner);
  const player = useSelector((state: RootState) => state.auth.player);

  const buttonStyles = {
    color: "whitesmoke",
    fontSize: "1rem",
    textTransform: "capitalize",
    "&:hover": {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.contrastText,
    },
  };

  const handleLogout = async () => {
    dispatch(setLogout());
    navigate("/");
  };
  
  const renderIconButton = (icon: React.ReactNode, onClick: () => void, tooltip: string) => (
    <IconButton onClick={onClick} sx={buttonStyles} title={tooltip}>
      {icon}
    </IconButton>
  );

  return (
    <>

    </>
  );
};

export default MenuItems;
