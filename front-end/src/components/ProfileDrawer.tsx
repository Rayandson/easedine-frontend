import React, { useContext } from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { UserContext } from "../contexts/UserContext";
import { TokenContext } from "../contexts/TokenContext";
import { IoPersonOutline } from "react-icons/io5";
import { RiLogoutBoxLine, RiFileList3Line } from "react-icons/ri";
import { PageContext } from "../contexts/PageContext";
import { useNavigate } from "react-router-dom";

type ProfileDrawerProps = {
  open: boolean;
  onClose: () => void;
};

const ProfileDrawer = ({ open, onClose }: ProfileDrawerProps) => {
  const userContext = useContext(UserContext);
  const tokenContext = useContext(TokenContext);
  const pageContext = useContext(PageContext);
  const navigate = useNavigate();

  function handleItemClick(item: string) {
    if (item === "Sair") signOut();
    else if (item === "Conta") conta();
    else if (item === "Pedidos") goToHistory();
  }

  function signOut() {
    localStorage.removeItem("userData");
    userContext?.setUser(undefined);
    tokenContext?.setToken("");
  }

  function goToHistory() {
    pageContext?.setPage('orders');
    navigate('/history');
}

  function conta() {
    console.log("clicou em conta");
  }

  const list = (
    <Box sx={{ width: 250 }} role="presentation" onClick={onClose} onKeyDown={onClose}>
      <List>
        {[{title: "Conta", icon: IoPersonOutline}, {title: "Pedidos", icon: RiFileList3Line}].map((item, index) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton onClick={() => handleItemClick(item.title)}>
              <ListItemIcon sx={{ fontSize: 18, color: "black" }}><item.icon/></ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  sx: {
                    fontFamily: "Inter",
                    fontSize: "15px",
                    color: "black",
                  },
                }}
                primary={item.title}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {[{title: "Sair", icon: RiLogoutBoxLine}].map((item, index) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton onClick={() => handleItemClick(item.title)}>
              <ListItemIcon sx={{ fontSize: 18, color: "black" }}>
                <item.icon />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  sx: {
                    fontFamily: "Inter",
                    fontSize: "15px",
                    color: "black",
                  },
                }}
                primary={item.title}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      {list}
    </Drawer>
  );
};

export default ProfileDrawer;
