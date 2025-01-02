import React from "react";
import Slider from "react-slick";
import { Box, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
    const settings = {
        dots: true, // Hiển thị các chỉ số slide
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 960, // Responsive cho màn hình nhỏ hơn 960px
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600, // Responsive cho màn hình nhỏ hơn 600px
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
    };

    return (
        <Box sx={{ width: "100%", position: "relative", overflow: "hidden" }}>
            <Slider {...settings}>
                {[1, 2, 3, 4, 5].map((item, index) => (
                    <Box
                        key={index}
                        sx={{
                            height: { xs: "200px", md: "400px" },
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            background: "#ccc",
                        }}
                    >
                        <img
                            src={`/images/carousel-${item}.svg`}
                            alt={`Slide ${item}`}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />
                    </Box>
                ))}
            </Slider>
        </Box>
    );
};

const PrevArrow = ({ onClick }) => (
    <IconButton
        onClick={onClick}
        sx={{
            position: "absolute",
            top: "50%",
            left: "10px",
            transform: "translateY(-50%)",
            zIndex: 10,
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.9)" },
        }}
    >
        <ArrowBack />
    </IconButton>
);

const NextArrow = ({ onClick }) => (
    <IconButton
        onClick={onClick}
        sx={{
            position: "absolute",
            top: "50%",
            right: "10px",
            transform: "translateY(-50%)",
            zIndex: 10,
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.9)" },
        }}
    >
        <ArrowForward />
    </IconButton>
);

export default Carousel;