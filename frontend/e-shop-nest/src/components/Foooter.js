import React from 'react';
import { Box, Container, Grid, Typography, Link, Divider } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: 'grey.900',
        color: 'grey.100',
        mt: 6,
        pt: 6,
        pb: 3,
      }}
      component="footer"
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              TechTrove
            </Typography>
            <Typography variant="body2" color="grey.400">
              Your one-stop shop for trending tech gadgets and accessories.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Company
            </Typography>
            <Link href="#" underline="hover" color="inherit" display="block">
              About Us
            </Link>
            <Link href="#" underline="hover" color="inherit" display="block">
              Careers
            </Link>
            <Link href="#" underline="hover" color="inherit" display="block">
              Blog
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Support
            </Typography>
            <Link href="#" underline="hover" color="inherit" display="block">
              Contact Us
            </Link>
            <Link href="#" underline="hover" color="inherit" display="block">
              Shipping & Returns
            </Link>
            <Link href="#" underline="hover" color="inherit" display="block">
              FAQs
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Link href="#" underline="hover" color="inherit" display="block">
              Instagram
            </Link>
            <Link href="#" underline="hover" color="inherit" display="block">
              Facebook
            </Link>
            <Link href="#" underline="hover" color="inherit" display="block">
              Twitter
            </Link>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'grey.700' }} />

        <Typography variant="body2" color="grey.500" align="center">
          &copy; {new Date().getFullYear()} TechTrove. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
