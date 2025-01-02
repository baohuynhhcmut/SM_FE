

import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Button from '@mui/material/Button';

export default function MenuAddCart() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button variant="contained" color="success" startIcon={<CheckCircleIcon />} sx={{fontSize:"10px"}} onClick={handleClick}>
            Already in your cart
        </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Bỏ giỏ hàng</MenuItem>
        <MenuItem onClick={handleClose}>Thanh toán</MenuItem>
        <MenuItem onClick={handleClose}>Nông trại</MenuItem>
      </Menu>
    </div>
  );
}