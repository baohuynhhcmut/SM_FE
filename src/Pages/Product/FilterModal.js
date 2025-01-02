


import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Slider,
  TextField,
  Button,
  Grid,
  IconButton,
  Rating,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const brands = {
  A: [
    { label: 'Apple (56)', id: 'apple' },
    { label: 'Asus (97)', id: 'asus' },
    { label: 'Acer (234)', id: 'acer' },
    { label: 'Allview (45)', id: 'allview' },
    { label: 'Atari (176)', id: 'atari' },
    { label: 'AMD (49)', id: 'amd' },
    { label: 'Aruba (16)', id: 'aruba' },
  ],
  B: [
    { label: 'Beats (56)', id: 'beats' },
    { label: 'Bose (97)', id: 'bose' },
    { label: 'BenQ (45)', id: 'benq' },
    { label: 'Bosch (176)', id: 'bosch' },
    { label: 'Brother (176)', id: 'brother' },
    { label: 'Biostar (49)', id: 'biostar' },
    { label: 'Braun (16)', id: 'braun' },
    { label: 'Blaupunkt (45)', id: 'blaupunkt' },
    { label: 'BenQ (23)', id: 'benq2' },
  ],
  // Add other brand categories (C, D, E, F) similarly
};

const colors = [
  { label: 'Blue', color: 'primary.main', id: 'blue' },
  { label: 'Gray', color: 'grey.500', id: 'gray' },
  { label: 'Green', color: 'success.main', id: 'green' },
  { label: 'Pink', color: 'pink.400', id: 'pink' },
  { label: 'Red', color: 'error.main', id: 'red' },
];

const deliveryTypes = [
  { label: 'USA', description: 'Delivery only for USA', id: 'delivery-usa' },
  { label: 'Europe', description: 'Delivery only for Europe', id: 'delivery-europe' },
  { label: 'Asia', description: 'Delivery only for Asia', id: 'delivery-asia' },
  { label: 'Australia', description: 'Delivery only for Australia', id: 'delivery-australia' },
];

const FilterModal = () => {
  const [open, setOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [priceRange, setPriceRange] = useState([300, 3500]);
  const [minDeliveryTime, setMinDeliveryTime] = useState(30);
  const [condition, setCondition] = useState('all');
  const [rating, setRating] = useState(3);
  const [deliveryType, setDeliveryType] = useState('delivery-usa');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleTabChange = (event, newValue) => setTabValue(newValue);

  const handlePriceChange = (event, newValue) => setPriceRange(newValue);
  const handleMinDeliveryChange = (event, newValue) => setMinDeliveryTime(newValue);

  const handleReset = () => {
    setPriceRange([300, 3500]);
    setMinDeliveryTime(30);
    setCondition('all');
    setRating(3);
    setDeliveryType('delivery-usa');
    // Reset other states as needed
  };

  return (
    <>
      <Button variant="outlined" onClick={handleOpen} startIcon={<FilterAltIcon />}>
        Open Filters
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        aria-labelledby="filter-dialog-title"
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Filters
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="filter tabs">
            <Tab label="Brand" />
            <Tab label="Advanced Filters" />
          </Tabs>
          <Box sx={{ mt: 2 }}>
            {tabValue === 0 && (
              <Grid container spacing={2}>
                {Object.keys(brands).map((letter) => (
                  <Grid item xs={12} sm={6} md={4} key={letter}>
                    <Typography variant="h6" gutterBottom>
                      {letter}
                    </Typography>
                    {brands[letter].map((brand) => (
                      <FormControlLabel
                        key={brand.id}
                        control={<Checkbox defaultChecked={brand.id === 'asus' || brand.id === 'atari' || brand.id === 'brother'} />}
                        label={brand.label}
                      />
                    ))}
                  </Grid>
                ))}
              </Grid>
            )}
            {tabValue === 1 && (
              <Box>
                <Grid container spacing={4}>
                  {/* Price Range */}
                  <Grid item xs={12} md={6}>
                    <Typography gutterBottom>Price Range</Typography>
                    <Slider
                      value={priceRange}
                      onChange={handlePriceChange}
                      valueLabelDisplay="auto"
                      min={0}
                      max={7000}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                      <TextField
                        label="Min Price"
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                        inputProps={{ min: 0, max: 7000 }}
                        sx={{ width: '48%' }}
                      />
                      <TextField
                        label="Max Price"
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        inputProps={{ min: 0, max: 7000 }}
                        sx={{ width: '48%' }}
                      />
                    </Box>
                  </Grid>
                  {/* Delivery Time */}
                  <Grid item xs={12} md={6}>
                    <Typography gutterBottom>Min Delivery Time (Days)</Typography>
                    <Slider
                      value={minDeliveryTime}
                      onChange={handleMinDeliveryChange}
                      valueLabelDisplay="auto"
                      min={3}
                      max={50}
                    />
                    <TextField
                      label="Min Delivery Time"
                      type="number"
                      value={minDeliveryTime}
                      onChange={(e) => setMinDeliveryTime(Number(e.target.value))}
                      inputProps={{ min: 3, max: 50 }}
                      fullWidth
                      sx={{ mt: 1 }}
                    />
                  </Grid>
                  {/* Condition */}
                  <Grid item xs={12} md={6}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Condition</FormLabel>
                      <RadioGroup
                        row
                        value={condition}
                        onChange={(e) => setCondition(e.target.value)}
                      >
                        <FormControlLabel value="all" control={<Radio />} label="All" />
                        <FormControlLabel value="new" control={<Radio />} label="New" />
                        <FormControlLabel value="used" control={<Radio />} label="Used" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  {/* Colour */}
                  <Grid item xs={12} md={6}>
                    <Typography gutterBottom>Colour</Typography>
                    <Grid container spacing={1}>
                      {colors.map((color) => (
                        <Grid item xs={6} key={color.id}>
                          <FormControlLabel
                            control={<Checkbox />}
                            label={
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box
                                  sx={{
                                    width: 16,
                                    height: 16,
                                    borderRadius: '50%',
                                    bgcolor: color.color,
                                    mr: 1,
                                  }}
                                />
                                {color.label}
                              </Box>
                            }
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                  {/* Rating */}
                  <Grid item xs={12} md={6}>
                    <Typography gutterBottom>Rating</Typography>
                    <Rating
                      name="rating"
                      value={rating}
                      onChange={(event, newValue) => {
                        setRating(newValue);
                      }}
                    />
                  </Grid>
                  {/* Weight */}
                  <Grid item xs={12} md={6}>
                    <Typography gutterBottom>Weight</Typography>
                    <FormControlLabel control={<Checkbox />} label="Under 1 kg" />
                    <FormControlLabel control={<Checkbox defaultChecked />} label="1-1.5 kg" />
                    <FormControlLabel control={<Checkbox />} label="1.5-2 kg" />
                    <FormControlLabel control={<Checkbox />} label="2.5-3 kg" />
                    <FormControlLabel control={<Checkbox />} label="Over 3 kg" />
                  </Grid>
                  {/* Delivery Type */}
                  <Grid item xs={12}>
                    <Typography gutterBottom>Delivery Type</Typography>
                    <RadioGroup
                      row
                      value={deliveryType}
                      onChange={(e) => setDeliveryType(e.target.value)}
                    >
                      {deliveryTypes.map((type) => (
                        <FormControlLabel
                          key={type.id}
                          value={type.id}
                          control={<Radio />}
                          label={
                            <Box>
                              <Typography variant="subtitle1">{type.label}</Typography>
                              <Typography variant="body2" color="textSecondary">
                                {type.description}
                              </Typography>
                            </Box>
                          }
                        />
                      ))}
                    </RadioGroup>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ padding: '16px' }}>
          <Button variant="contained" color="primary">
            Show 50 results
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleReset}>
            Reset
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FilterModal;
