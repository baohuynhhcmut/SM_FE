import React, { useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const SortDropdown = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        variant="outlined"
        startIcon={<SortIcon />}
        endIcon={<ArrowDropDownIcon />}
        onClick={handleClick}
        sx={{
          fontSize: "14px",
          textTransform: "none",
        }}
      >
        Sort
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 200,
          },
        }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemText primary="The most popular" />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemText primary="Newest" />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemText primary="Increasing price" />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemText primary="Decreasing price" />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemText primary="No. reviews" />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemText primary="Discount %" />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default SortDropdown;