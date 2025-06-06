import React, { useState, useEffect } from 'react';
import { 
  Container, Grid, CardMedia, Typography, Box, Button, Chip, Rating,
  Tabs, Tab, Paper, Breadcrumbs, Link, Snackbar, Alert, useMediaQuery, 
  useTheme, CircularProgress 
} from '@mui/material';
import { ShoppingCart, Favorite, FavoriteBorder, Share, ArrowBack } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [tabValue, setTabValue] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

useEffect(() => {
  const fetchProduct = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch product data');
      }

      const data = await response.json();

     
      if (!data.images || !Array.isArray(data.images)) {
        if (data.image) {
          data.images = [data.image];
        } else {
          data.images = ['https://via.placeholder.com/600x400?text=No+Image+Available'];
        }
      }

      setProduct(data);
      setSelectedImage(0);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  fetchProduct();
}, [id]);


  const handleAddToCart = () => {
    if (!product) return;
    dispatch(addToCart(product));
    setSnackbarMessage(`${product.name} added to cart`);
    setSnackbarOpen(true);
  };

  const handleBuyNow = () => {
    if (!product) return;
    dispatch(addToCart(product));
    navigate('/checkout');
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ textAlign: 'center', mt: 10 }}>
        <Typography variant="h6" color="error">{error}</Typography>
        <Button variant="outlined" sx={{ mt: 2 }} onClick={() => navigate('/products')}>
          Back to Products
        </Button>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container sx={{ textAlign: 'center', mt: 10 }}>
        <Typography variant="h6">Product not found</Typography>
        <Button variant="outlined" sx={{ mt: 2 }} onClick={() => navigate('/products')}>
          Back to Products
        </Button>
      </Container>
    );
  }


  const {
    name = 'Product',
    images = ['https://via.placeholder.com/600x400?text=No+Image+Available'],
    price = 0,
    rating = 0,
    reviews = 0,
    description = 'No description available',
    colors = [],
    inStock = false,
    discount = null,
    originalPrice = price,
    features = [],
    specifications = {}
  } = product;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
        <Link color="inherit" href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
          Home
        </Link>
        <Link color="inherit" href="/products" onClick={(e) => { e.preventDefault(); navigate('/products'); }}>
          Products
        </Link>
        <Typography color="text.primary">{name}</Typography>
      </Breadcrumbs>

      <Grid container spacing={4}>
        {/* Product Images */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Paper elevation={3} sx={{ mb: 2, borderRadius: 2, overflow: 'hidden' }}>
              <CardMedia
                component="img"
                image={images[selectedImage]}
                alt={name}
                sx={{
                  width: '100%',
                  height: isMobile ? '300px' : '450px',
                  objectFit: 'cover'
                }}
              />
            </Paper>
          </Box>
        </Grid>

        
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {name}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={rating} precision={0.1} readOnly />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                ({reviews} reviews)
              </Typography>
            </Box>

            {discount ? (
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5" color="error" sx={{ mr: 2 }}>
                  ${price.toFixed(2)}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                  ${originalPrice.toFixed(2)}
                </Typography>
                <Chip 
                  label={`${discount}% OFF`} 
                  color="error" 
                  size="small" 
                  sx={{ ml: 2 }}
                />
              </Box>
            ) : (
              <Typography variant="h5" sx={{ mb: 2 }}>
                ${price.toFixed(2)}
              </Typography>
            )}

            <Typography variant="body1" paragraph sx={{ mb: 3 }}>
              {description}
            </Typography>

            {colors.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Colors
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {colors.map((color) => (
                    <Chip 
                      key={color}
                      label={color}
                      variant="outlined"
                      sx={{ 
                        border: `1px solid ${theme.palette.divider}`,
                        '&:hover': {
                          borderColor: theme.palette.primary.main
                        }
                      }}
                    />
                  ))}
                </Box>
              </Box>
            )}

            <Box sx={{ mb: 3 }}>
              {inStock ? (
                <Chip label="In Stock" color="success" variant="outlined" />
              ) : (
                <Chip label="Out of Stock" color="error" variant="outlined" />
              )}
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<ShoppingCart />}
                onClick={handleAddToCart}
                disabled={!inStock}
                sx={{ flex: 1 }}
              >
                Add to Cart
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                onClick={handleBuyNow}
                disabled={!inStock}
                sx={{ flex: 1 }}
              >
                Buy Now
              </Button>
            </Box>

          
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="text"
                color="inherit"
                startIcon={isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
                onClick={() => setIsFavorite(!isFavorite)}
              >
                {isFavorite ? 'Saved' : 'Save for later'}
              </Button>
              <Button
                variant="text"
                color="inherit"
                startIcon={<Share />}
              >
                Share
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ mt: 6 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          variant="fullWidth"
          sx={{ mb: 3 }}
        >
          <Tab label="Features" />
          <Tab label="Specifications" />
          <Tab label="Reviews" />
        </Tabs>

        <Paper elevation={2} sx={{ p: 3 }}>
          {tabValue === 0 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Product Features
              </Typography>
              {features.length > 0 ? (
                <ul style={{ paddingLeft: '20px' }}>
                  {features.map((feature, index) => (
                    <li key={index}>
                      <Typography variant="body1">{feature}</Typography>
                    </li>
                  ))}
                </ul>
              ) : (
                <Typography variant="body1">No features listed</Typography>
              )}
            </Box>
          )}

          {tabValue === 1 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Technical Specifications
              </Typography>
              {Object.keys(specifications).length > 0 ? (
                <Grid container spacing={2}>
                  {Object.entries(specifications).map(([key, value]) => (
                    <React.Fragment key={key}>
                      <Grid item xs={12} sm={4}>
                        <Typography variant="subtitle1" color="text.secondary">
                          {key}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={8}>
                        <Typography variant="body1">{value}</Typography>
                      </Grid>
                    </React.Fragment>
                  ))}
                </Grid>
              ) : (
                <Typography variant="body1">No specifications available</Typography>
              )}
            </Box>
          )}

          {tabValue === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Customer Reviews
              </Typography>
              <Typography variant="body1">
                {reviews > 0 
                  ? `Read ${reviews} customer reviews`
                  : 'No reviews yet. Be the first to review this product!'}
              </Typography>
            </Box>
          )}
        </Paper>
      </Box>

      {isMobile && (
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={() => navigate(-1)}
          >
            Back to Products
          </Button>
        </Box>
      )}

 
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProductDetails;