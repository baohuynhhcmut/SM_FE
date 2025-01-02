import React, { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchWithEnter = ({setItem}) => {
  const [value, setValue] = useState("");
  const top100Films = [
    { title: "Gà" },
    { title: "Chó" },
    { title: "Mèo" },
    // Thêm các phim khác nếu cần
  ];

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
        console.log("Entered value:", value); 
        const response = await fetch(`http://localhost:5000/products/searchProduct?keyword=${value}`)
        const result = await response.json()
        setItem(result.data)
    }
  };

  return (
    <Autocomplete
      freeSolo
      id="free-solo-2-demo"
      disableClearable
      sx={{ width: 500 }}
      options={top100Films.map((option) => option.title)}
      onInputChange={(event, newValue) => setValue(newValue)} // Theo dõi giá trị nhập
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search input"
          sx={{
            "& .MuiInputBase-root": { height: 40 }, // Đặt chiều cao cho TextField
          }}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <SearchIcon sx={{ marginRight: 1, color: "gray" }} />
            ),
          }}
          onKeyDown={handleKeyDown} // Lắng nghe sự kiện Enter
        />
      )}
    />
  );
};

export default SearchWithEnter;
