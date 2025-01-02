import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Rating,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

const ProductCard = () => {
  return (
    <Card className="w-full max-w-sm rounded-lg shadow-md">
      {/* Product Image */}
      <CardMedia
        component="img"
        height="200"
        image="/docs/images/products/apple-watch.png"
        alt="product image"
        className="rounded-t-lg p-8"
      />
      {/* Card Content */}
      <CardContent className="px-5 pb-5">
        {/* Title */}
        <Typography
          variant="h6"
          component={Link} 
          to="/product/1" 
          className="text-gray-900 dark:text-white no-underline hover:underline"
        >
          Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
        </Typography>
        {/* Rating */}
        <Box className="flex items-center mt-2.5 mb-5">
          <Rating name="product-rating" value={4} readOnly size="small" />
          <span className="ml-3 text-xs font-semibold text-blue-800 bg-blue-100 rounded px-2.5 py-0.5">
            5.0
          </span>
        </Box>
        {/* Price and Action */}
        <Box className="flex items-center justify-between">
          <Typography
            variant="h5"
            component="span"
            className="text-gray-900 dark:text-white font-bold"
          >
            $599
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className="text-sm px-5 py-2.5"
            href="#"
          >
            Add to cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
