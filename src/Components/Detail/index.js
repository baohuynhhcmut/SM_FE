import React from 'react';
import { useParams } from 'react-router-dom';

const Details = () => {
    const { id } = useParams(); // Lấy ID từ URL
    return <h1>Detail Page for Item ID: {id}</h1>;
};

export default Details;