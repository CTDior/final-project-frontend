/** @format */
import * as React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import GroupsIcon from "@mui/icons-material/Groups";
import { useHistory } from "react-router";
import HomeIcon from "@mui/icons-material/Home";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import LogoutIcon from "@mui/icons-material/Logout";

type Anchor = "top" | "left" | "bottom" | "right";

export default function TemporaryDrawer() {
  const [state, setState] = React.useState(false);

  const history = useHistory();

  // const toggleDrawer = (open) => (event) => {
  //   setState(open);
  // };

  const closeOnSelection = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setState(false);
  };

  const drawerItems = [
    {
      text: "Home",
      icon: <HomeIcon color="secondary" />,
      path: "/",
    },
    {
      text: "New Group",
      icon: <AddIcon color="secondary" />,
      path: "/group/create",
    },
    // {
    //   text: "My Profile",
    //   icon: <EmojiPeopleIcon color="secondary" />,
    //   path: "/", // need to figure out how to link id
    // },
    // {
    //   text: "All Groups",
    //   icon: <GroupsIcon color="secondary" />,
    //   path: "/",
    // },
    // {
    //   text: "Logout",
    //   icon: <LogoutIcon color="secondary" />,
    //   path: "/",
    // },
  ];

  return (
    <div>
      <IconButton
        size="large"
        edge="end"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={() => setState(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor={"left"} open={state} onClose={() => setState(false)}>
        <div onClick={closeOnSelection} onKeyDown={closeOnSelection}>
          {/* List Links */}
          <List>
            {drawerItems.map((item) => (
              <ListItem
                button
                key={item.text}
                onClick={() => history.push(item.path)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </div>
  );
}
