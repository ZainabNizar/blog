import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BlogApp
          </Typography>

          <Button
            component={Link}
            to="/"
            sx={{ color: "white", textDecoration: "none" }}
          >
            Home
          </Button>

          <Button
            component={Link}
            to="/add"
            sx={{ color: "white", textDecoration: "none" }}
          >
            Add
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;