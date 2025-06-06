import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Grid,Card,CardContent,CardMedia,Typography,Rating,CircularProgress,Container,Box,Divider,Button,Stack} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const SearchPage = () => {
  const query = new URLSearchParams(useLocation().search).get('q')?.toLowerCase() || '';
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/api/products', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setProducts(data.products);
        setFiltered(
          data.products.filter((p) =>
            p.name.toLowerCase().includes(query)
          )
        );
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 6 }}>
      <Stack direction="row" mb={2}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </Stack>

      <Box textAlign="center" mb={4}>
        <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom>
          Search Results
        </Typography>
        <Divider sx={{ width: 60, mx: 'auto', borderBottomWidth: 3, borderColor: 'primary.main' }} />
        <Typography variant="body1" color="text.secondary" mt={1}>
          {query
            ? `Results for: "${query}"`
            : 'No search query provided.'}
        </Typography>
      </Box>

      {filtered.length > 0 ? (
        <Grid container spacing={4}>
          {filtered.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <Card sx={{ height: '100%', boxShadow: 3 }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={item.image}
                  alt={item.name}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {item.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    ${item.price.toFixed(2)}
                  </Typography>
                  <Rating
                    value={item.rating}
                    precision={0.1}
                    readOnly
                    sx={{ mt: 1 }}
                  />
                  {!item.inStock && (
                    <Typography color="error" variant="caption" display="block" mt={1}>
                      Out of Stock
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6" textAlign="center" color="text.secondary">
          No products matched your search.
        </Typography>
      )}
    </Container>
  );
};

export default SearchPage;
