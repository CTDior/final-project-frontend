/** @format */

import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import GroupsIcon from "@mui/icons-material/Groups";
import { useHistory } from "react-router";
import HomeIcon from "@mui/icons-material/Home";

type Anchor = "top" | "left" | "bottom" | "right";

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);

  const history = useHistory();

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
    {
      text: "Sample1",
      icon: <GroupsIcon color="secondary" />,
      path: "/",
    },
    {
      text: "Sample2",
      icon: <GroupsIcon color="secondary" />,
      path: "/",
    },
    {
      text: "Sample3",
      icon: <GroupsIcon color="secondary" />,
      path: "/",
    },
  ];

  return (
    <div>
      <IconButton
        size="large"
        edge="end"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={() => setOpen(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor={"left"} open={open} onClose={() => setOpen(false)}>
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
      </Drawer>
    </div>
  );
}
