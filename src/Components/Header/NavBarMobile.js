import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-scroll";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useLocation, Link as RouterLink } from "react-router-dom";

export default function NavBarMobile(props) {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(open);
  };

  const match = useLocation();

  return (
    <>
      <Button onClick={toggleDrawer(true)}>
        <MenuIcon />
      </Button>
      <Drawer anchor={"right"} open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 250,
            height: "100%",
            bgcolor: "text.primary",
            color: "white",
          }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {match.pathname === "/" ? (
              props.links.map((link, i) => (
                <Link
                  key={i}
                  to={link.to}
                  activeClass="active"
                  spy={true}
                  smooth={true}
                  offset={-100}
                  onSetInactive={() => setOpen(false)}
                >
                  <ListItem button key={link.label}>
                    <ListItemText primary={link.label} />
                  </ListItem>
                </Link>
              ))
            ) : (
              <div className="p-4">
                <RouterLink to={"/"}>BACK TO COLLECTION</RouterLink>
              </div>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
