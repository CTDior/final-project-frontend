/** @format */
import "./Header.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
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
          {user && <TemporaryDrawer />}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <a href="/">Ice Ice Breaker</a>
          </Typography>
          {user ? (
            <div className="signed-in">
              <p>Welcome {user.displayName}</p>
            </div>
          ) : (
            <div className="signed-out"></div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
