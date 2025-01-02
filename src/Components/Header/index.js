import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useThemeContext } from "../../ThemeContext"; // Đảm bảo import ThemeContext đúng cách
import { Switch } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Example from "../Cart";
import { useAuth } from "../../AuthWrapper";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const pages = ["Farm", "Shop", "Product"];

const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Header() {

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { darkMode, toggleTheme } = useThemeContext(); // Lấy giá trị darkMode từ context
  const { isAuthenticated, logout,checkAuth } = useAuth();
  
  const navigate = useNavigate();

  checkAuth()
  // console.log("Isauthend: ", isAuthenticated);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="sticky"
      color={darkMode ? "default" : "primary"}
      sx={{ zIndex: 1200 }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AgricultureIcon
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              fontSize: "40px",
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              // fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            SMART FARM
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: "center" }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              // fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <MenuItem key={page} onClick={handleCloseNavMenu}>
                <Link
                  to={`/${page.toLowerCase()}`}
                  style={{ textDecoration: "none", width: "100%" }}
                >
                  <Typography sx={{ textAlign: "center" }}>{page}</Typography>
                </Link>
              </MenuItem>
            ))}
          </Box>

          {/* Nút chuyển đổi chế độ Dark Mode */}
          <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
            {/* Toggle Dark Mode */}
            <Tooltip title="Toggle dark mode">
              <Box sx={{ display: "flex", alignItems: "center", mx: 2 }}>
                {darkMode ? <DarkModeIcon /> : <LightModeIcon />}
                <Switch checked={darkMode} onChange={toggleTheme} />
              </Box>
            </Tooltip>

            {/* Your Account */}
            {isAuthenticated ? (
              <Tooltip title="Your Account">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, mx: 2 }}>
                  <Avatar alt="User" />
                </IconButton>
              </Tooltip>
            ) : (
              <Button 
                variant="outlined" 
                startIcon={<AccountCircleIcon />}
                onClick={() => navigate("/login")}
                sx={{
                  backgroundColor: "white", // Set background to white
                  color: "black", // Text color
                  "&:hover": {
                    backgroundColor: "lightgray", // Optional: Change background on hover
                  },
                }}
              >
                Đăng nhập
              </Button>
            )}

            {/* Shopping Cart */}
            <Tooltip title="">
              <IconButton sx={{ p: 0, mx: 2 }}>
                <Example />
              </IconButton>
            </Tooltip>

            {/* User Menu */}
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => {
                  handleCloseUserMenu();
                  if (setting === "Logout") {
                    logout(); 
                    navigate("/login")
                  }
                }}>
                  <Typography sx={{ textAlign: "center" }}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
