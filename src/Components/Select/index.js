import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const FilterLocation = ({ cities, selectedCity, onCityChange }) => {
    return (
        <div>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select City</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedCity}
                    label="City"
                    onChange={(e) => onCityChange(e.target.value)}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {cities.map((city, index) => (
                        <MenuItem key={index} value={city}>
                            {city}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default FilterLocation;
