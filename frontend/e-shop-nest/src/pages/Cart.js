import React from 'react';
import {
  Container,Typography,Grid,Card,CardMedia,CardContent,Box,Button,Divider,Snackbar,Alert} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../slices/cartSlice';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [toastOpen, setToastOpen] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState('');

  const handleRemove = (id, name) => {
    dispatch(removeFromCart(id));
    setToastMessage(`Removed ${name} from cart`);
    setToastOpen(true);
  };

  const handleCloseToast = () => setToastOpen(false);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Container sx={{ mt: 6 }}>
   
      <Box mb={2}>
        <Button variant="outlined" color="primary" onClick={() => navigate('/products')}>
          ← Back to Products
        </Button>
      </Box>

    
      <Box textAlign="center" mb={4}>
        <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom>
          Your Cart
        </Typography>
        <Divider
          sx={{
            width: 60,
            mx: 'auto',
            borderBottomWidth: 3,
            borderColor: 'primary.main',
          }}
        />
        <Typography variant="body1" color="text.secondary" mt={1}>
          Review your selected products and manage your cart below.
        </Typography>
      </Box>

      {cartItems.length === 0 ? (
        <Typography textAlign="center" variant="h6" mt={4} color="text.secondary">
          Your cart is empty.
        </Typography>
      ) : (
        <>
          <Grid container spacing={4}>
            {cartItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.id} sx={{ display: 'flex' }}>
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                    width: '100%',
                    height: 420,
                    boxShadow: 3,
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={item.image}
                    alt={item.name}
                    sx={{ height: 180, objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" noWrap>
                      {item.name}
                    </Typography>
                    <Typography color="text.secondary" mt={0.5}>
                      Price: ${item.price.toFixed(2)}
                    </Typography>
                    <Typography color="text.secondary" mt={0.5}>
                      Quantity: {item.quantity}
                    </Typography>
                    <Typography fontWeight="bold" mt={1}>
                      Total: ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2, mt: 'auto' }}>
                    <Button
                      variant="outlined"
                      color="error"
                      fullWidth
                      onClick={() => handleRemove(item.id, item.name)}
                    >
                      Remove
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box textAlign="right" mt={5}>
            <Typography variant="h6">Total Amount: ${totalPrice.toFixed(2)}</Typography>
          </Box>
        </>
      )}

      
      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseToast} severity="info" sx={{ width: '100%' }}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Cart;
