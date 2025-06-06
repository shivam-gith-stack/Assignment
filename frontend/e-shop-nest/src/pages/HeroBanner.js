import React from 'react';
import { Box, Grid, Typography, Button, useTheme, useMediaQuery } from '@mui/material';

const HeroBanner = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        position: 'relative',
        mt: { xs: 2, md: 4 },
        mx: { xs: 2, md: 4 },
        mb: { xs: 3, md: 6 },
        height: { xs: '45vh', md: '55vh' },
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
     
      <Box
        sx={{
          backgroundImage: `url("https://static.vecteezy.com/system/resources/previews/002/179/541/large_2x/sale-offer-banner-with-hand-holding-phone-vector.jpg")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}
      />

     
      <Grid
        container
        alignItems="center"
        sx={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
          px: { xs: 2, md: 6 },
        }}
      >
        <Grid item xs={12} md={6}>
          <Typography variant={isMobile ? 'h4' : 'h3'} fontWeight="bold" color="#fff" gutterBottom>
            FLASH SALE
          </Typography>
          <Typography variant="h6" color="#fff" paragraph>
            Up to 70% off on top trending electronics. Limited time only!
          </Typography>
          <Button variant="contained" color="error" size="large">
            Shop Now
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HeroBanner;
