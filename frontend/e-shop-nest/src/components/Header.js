import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const [searchExpanded, setSearchExpanded] = useState(false);

  useEffect(() => {
    // Check token on every route change
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [location.pathname]);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      navigate(`/search?q=${encodeURIComponent(e.target.value)}`);
      if (isMobile) setSearchExpanded(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
    handleMobileMenuClose();
  };

  const handleCartClick = () => {
    navigate('/cart');
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const toggleSearch = () => {
    setSearchExpanded(!searchExpanded);
  };

  return (
    <AppBar position="static" color="primary" elevation={3}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h5" component="div" sx={{ flexGrow: isMobile && searchExpanded ? 0 : 1 }}>
          TechTrove
        </Typography>

        {!isMobile ? (
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search for electronics, accessories..."
            onKeyDown={handleSearch}
            sx={{
              backgroundColor: 'white',
              borderRadius: 1,
              width: 400,
              mx: 2,
            }}
          />
        ) : searchExpanded ? (
          <TextField
            autoFocus
            variant="outlined"
            size="small"
            placeholder="Search..."
            onKeyDown={handleSearch}
            sx={{
              backgroundColor: 'white',
              borderRadius: 1,
              width: 180,
              mx: 1,
            }}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => setSearchExpanded(false)}
                  size="small"
                  sx={{ p: 0 }}
                >
                  <SearchIcon fontSize="small" />
                </IconButton>
              ),
            }}
          />
        ) : null}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {isMobile && !searchExpanded && (
            <IconButton
              color="inherit"
              onClick={toggleSearch}
              size="small"
            >
              <SearchIcon fontSize="small" />
            </IconButton>
          )}

          {!isMobile && isLoggedIn && (
            <>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<ShoppingCartIcon />}
                onClick={handleCartClick}
                size="small"
              >
                Cart
              </Button>
              <Button
                variant="contained"
                color="error"
                startIcon={<ExitToAppIcon />}
                onClick={handleLogout}
                size="small"
              >
                Logout
              </Button>
            </>
          )}

          {isMobile && isLoggedIn && !searchExpanded && (
            <>
              <IconButton
                color="inherit"
                onClick={handleMobileMenuOpen}
                size="small"
              >
                <MenuIcon fontSize="small" />
              </IconButton>
              <Menu
                anchorEl={mobileMenuAnchor}
                open={Boolean(mobileMenuAnchor)}
                onClose={handleMobileMenuClose}
              >
                <MenuItem onClick={handleCartClick}>
                  <ShoppingCartIcon sx={{ mr: 1, fontSize: '1rem' }} />
                  <Typography variant="body2">Cart</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ExitToAppIcon sx={{ mr: 1, fontSize: '1rem' }} />
                  <Typography variant="body2">Logout</Typography>
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
