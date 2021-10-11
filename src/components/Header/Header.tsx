import "./Header.css";
import { Link } from "react-router-dom";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { signInWithGoogle, signOut } from "../../firebaseConfig";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ButtonBase, Drawer } from "@mui/material";
import TemporaryDrawer from "./Drawer";

const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            App Name
          </Typography>
          {user ? (
            <div className="signed-in">
              <p>Welcome {user.displayName}</p>
              <ButtonBase onClick={signOut}>Sign Out</ButtonBase>
            </div>
          ) : (
            <div className="signed-out">
              <ButtonBase onClick={signInWithGoogle}>Login</ButtonBase>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
