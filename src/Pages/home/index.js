import React, { useState } from 'react';
import { Grid, Box, Card, CardContent, Typography } from '@mui/material';
import MapFarm from '../../Components/Map';
import SearchBar from '../../Components/Search Map';
import FilterLocation from '../../Components/Select'; // Import the FilterLocation component
import Chatbot from '../../Components/Chatbox';

const HomePage = () => {
    const [selectedFarm, setSelectedFarm] = useState(null);
    const [selectedCity, setSelectedCity] = useState(""); // Store the selected city

    const farms = [
        { id: 1, x: 14.0583, y: 108.2772, name: 'Your Farm', city: 'Unknown City' },
        { id: 2, x: 16.0471, y: 108.2068, name: 'Da Nang Farm', city: 'Da Nang' },
        { id: 3, x: 10.8231, y: 106.6297, name: 'Ho Chi Minh Farm', city: 'Ho Chi Minh City' },
        { id: 4, x: 21.0285, y: 105.8542, name: 'Hanoi Farm', city: 'Hanoi' },
    ];

    // Get unique list of cities
    const cities = [...new Set(farms.map(farm => farm.city))];

    // Filter farms based on the selected city
    const filteredFarms = selectedCity
        ? farms.filter(farm => farm.city === selectedCity)
        : farms;

    const handleSelectFarm = (farm) => {
        setSelectedFarm(farm);
    };

    const handleCityChange = (city) => {
        setSelectedCity(city); // Update selected city
    };

    return (
        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            {/* Main Grid for MapFarm */}
            <Grid container spacing={2}>
            
                <Grid item xs={12} md={12}>
                    <Box
                        sx={{
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <SearchBar onSelectFarm={handleSelectFarm} />
                    </Box>
                </Grid>
                {/* Map Grid */}
                <Grid item xs={12} md={12}>
                    <Box sx={{ height: { xs: '200px', sm: '300px', md: '400px' }, width: '100%', minHeight: '200px' }}>
                        <MapFarm selectedFarm={selectedFarm} farms={filteredFarms} />
                    </Box>
                </Grid>
            </Grid>

            {/* Grid for the Card */}
            <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%', minHeight: '200px', display: 'flex', flexDirection: 'column' }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                            Card Title
                        </Typography>
                        <Typography variant="body2">
                            This is a sample card that follows the map component. The card adjusts based on screen size.
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Chatbot />
        </Grid>
    );
};

export default HomePage;
