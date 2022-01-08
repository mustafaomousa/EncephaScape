import {
  Box,
  Button,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import * as sessionActions from "../../../store/session";

const UserButton = ({ sessionUser }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [anchor, setAnchor] = useState(null);
  const open = Boolean(anchor);

  const handleClick = (e) => {
    setAnchor(e.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    await dispatch(sessionActions.logout());
    return history.push("/");
  };

  return (
    <Box>
      <Button
        color="secondary"
        variant="contained"
        size="small"
        id="user-button"
        onClick={handleClick}
        aria-controls={open ? "user-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        {sessionUser.username}
      </Button>
      <Menu
        id="user-menu"
        anchorEl={anchor}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            background: "#fff",
            mt: 1.5,
            width: 200,
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "#fff",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
      >
        <MenuItem
          onClick={() => history.push("/profile")}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          Profile
          <ListItemIcon>
            <PersonIcon color="secondary" />
          </ListItemIcon>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={handleLogout}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          Log out
          <ListItemIcon>
            <LogoutIcon color="secondary" />
          </ListItemIcon>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserButton;
