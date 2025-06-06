import React, { useEffect, useState } from 'react';
import {
  Grid,Card,CardContent,CardMedia,Typography,Rating,CircularProgress,Container,Box,Divider,Button,Snackbar,Alert,useMediaQuery,useTheme} 
  from '@mui/material';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import HeroBanner from './HeroBanner';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        console.error('Failed to fetch products:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    setToastMessage(`Added ${item.name} to cart`);
    setToastOpen(true);
  };

  const handleCloseToast = () => {
    setToastOpen(false);
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <>
      <HeroBanner />
      <Container sx={{ mt: isMobile ? 3 : 5, px: isMobile ? 1 : 4 }}>
        <Box textAlign="center" mb={isMobile ? 3 : 4}>
          <Typography variant={isMobile ? 'h5' : 'h4'} fontWeight="bold" gutterBottom>
            Our Trending Products
          </Typography>
          <Divider
            sx={{
              width: 60,
              mx: 'auto',
              borderBottomWidth: 3,
              borderColor: 'primary.main',
            }}
          />
          <Typography variant="body2" color="text.secondary" mt={1} px={isMobile ? 1 : 0}>
            Discover our handpicked collection of bestsellers and tech favorites.
          </Typography>
        </Box>

        <Grid container spacing={isMobile ? 2 : 4} justifyContent="center">
          {products.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id} sx={{ display: 'flex' }}>
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  width: '100%',
                  height: { xs: 370, sm: 400, md: 430 },
                  boxShadow: 3,
                  borderRadius: 2,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: isMobile ? 'none' : 'translateY(-5px)',
                    boxShadow: isMobile ? 3 : 6,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={item.image}
                  alt={item.name}
                  sx={{
                    height: isMobile ? 140 : 180,
                    objectFit: 'cover',
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                  }}
                />
                <CardContent sx={{ flexGrow: 1, p: isMobile ? 1.5 : 2 }}>
                  <Typography variant={isMobile ? 'subtitle1' : 'h6'} fontWeight="600" noWrap>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${item.price.toFixed(2)}
                  </Typography>
                  <Rating
                    value={item.rating}
                    precision={0.1}
                    readOnly
                    size={isMobile ? 'small' : 'medium'}
                    sx={{ mt: 1 }}
                  />
                  {!item.inStock && (
                    <Typography color="error" variant="caption" display="block" mt={1}>
                      Out of Stock
                    </Typography>
                  )}
                </CardContent>
                <Box
                  sx={{
                    p: isMobile ? 1 : 2,
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: 1,
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => navigate(`/products/${item.id}`)}
                    size={isMobile ? 'small' : 'medium'}
                  >
                    View
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    disabled={!item.inStock}
                    onClick={() => handleAddToCart(item)}
                    size={isMobile ? 'small' : 'medium'}
                  >
                    Cart
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Snackbar
          open={toastOpen}
          autoHideDuration={3000}
          onClose={handleCloseToast}
          anchorOrigin={{ vertical: isMobile ? 'top' : 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseToast} severity="success" sx={{ width: '100%' }}>
            {toastMessage}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default Products;
