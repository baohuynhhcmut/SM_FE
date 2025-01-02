

import React, { useEffect, useState } from 'react';
import HeaderProduct from '../../Components/HeaderProductDetail';
import { Grid, Box } from '@mui/material';
import { useParams } from 'react-router-dom';


const ProductDetail = () => {
  const { id } = useParams()
  const [product,setProduct] = useState({})

  useEffect(()=>{
      const fetchAPI = async () => {
        const response = await fetch(`http://localhost:5000/products/getProductById?id=${id}`,{
          method: 'GET', // or 'POST', etc.
          headers: {
            'Content-Type': 'application/json',
          }})
          
          const data = await response.json()

          setProduct(data)
        // const data = await response.json()
        // setProduct(data)
      }
      fetchAPI()
  },[])

  console.log("Product: ",product)

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={4}>
        {/* Header Section */}
        <Grid item xs={12}>
          <HeaderProduct props={product} />
        </Grid>
      
      </Grid>
    </Box>
  );
};

export default ProductDetail;
