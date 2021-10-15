/** @format */
import "./Header.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { signInWithGoogle, signOut } from "../../firebaseConfig";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Avatar, ButtonBase, Drawer, Stack } from "@mui/material";
import TemporaryDrawer from "./Drawer";
import { Link } from "react-router-dom";

const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {user && <TemporaryDrawer />}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/">Ice Ice Breaker</Link>
          </Typography>
          {user ? (
            <div className="signed-in">
              <Stack direction="row" spacing={2}>
                <p>
                  {/* {user.displayName} */}
                  {user.photoURL && <img src={user.photoURL} alt="" />}
                </p>
                {/* <Avatar alt="" src="" sx={{ width: 24, height: 24 }} /> */}
              </Stack>
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
