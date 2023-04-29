import React, { useContext } from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { GrMail } from "react-icons/gr";
import { UserContext } from "../contexts/UserContext";
import { TokenContext } from "../contexts/TokenContext";

type ProfileDrawerProps = {
  open: boolean;
  onClose: () => void;
};

const ProfileDrawer = ({ open, onClose }: ProfileDrawerProps) => {
    const userContext = useContext(UserContext);
    const tokenContext = useContext(TokenContext);

  function handleItemClick(item: string) {
    if (item === "Sair") signOut();
    else if(item === "Conta") conta();
  }

  function signOut() {
    localStorage.removeItem("userData");
    userContext?.setUser(undefined);
    tokenContext?.setToken("");
  }

  function conta() {
    console.log("clicou em conta");
  }

  const list = (
    <Box sx={{ width: 250 }} role="presentation" onClick={onClose} onKeyDown={onClose}>
      <List>
        {["Conta", "Pedidos"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleItemClick(text)}>
              <ListItemIcon>
                <GrMail />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  sx: {
                    fontFamily: "Inter",
                    fontSize: "15px",
                    color: "black",
                  },
                }}
                primary={text}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["Sair"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleItemClick(text)}>
              <ListItemIcon>
                <GrMail />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  sx: {
                    fontFamily: "Inter",
                    fontSize: "15px",
                    color: "black",
                  },
                }}
                primary={text}
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
