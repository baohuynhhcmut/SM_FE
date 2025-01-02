import React, { createContext, useState, useMemo, useContext } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './theme'; // Import file cấu hình theme

// Tạo context để quản lý trạng thái theme
const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  // Hàm chuyển đổi theme
  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  const value = useMemo(() => ({ darkMode, toggleTheme }), [darkMode]);

  // Chọn theme dựa trên trạng thái darkMode
  const appliedTheme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={appliedTheme}>
        <CssBaseline /> {/* Đặt màu nền và font mặc định của MUI */}
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

// Hook sử dụng ThemeContext
export const useThemeContext = () => useContext(ThemeContext);
