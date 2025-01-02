import React from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Typography, Box } from '@mui/material';
import Carousel from '../../Components/Slide';
import ProductCard from '../../Components/Product';

const FarmDetail = () => {
    const { id } = useParams();
    console.log(id);
    
    return (
        <Box sx={{ flexGrow: 1, p: 2 }}>
            <Grid container spacing={2}>
                {/* Carousel Section */}
                <Grid item xs={12} md={8}>
                    <Carousel />
                </Grid>
                {/* Details Section */}
                <Grid item xs={12} md={4}>
                    <Box sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
                        <Typography variant="h4" gutterBottom>
                            Farm Details
                        </Typography>
                        <Typography variant="body1">
                            Farm ID: {id}
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 2 }}>
                            Here you can add more detailed information about the farm. Customize this section as needed.
                        </Typography>
                    </Box>
                </Grid>
            </Grid>

            <Box sx={{ mt: 4 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                        <ProductCard />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default FarmDetail;
