import { createTheme } from '@mui/material/styles';
import '@fontsource/poppins';  
// Cấu hình theme Light Mode
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#ffffff',
      paper: '#f5f5f5',
    },
    text: {
      primary: '#000000',
      secondary: '#555555',
    },
  },
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif', 
  },
});

// Cấu hình theme Dark Mode
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#aaaaaa',
    },
  },
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',  
  },
});
