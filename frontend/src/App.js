import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Home from './pages/Home';
import FurniturePreview from './components/FurniturePreview';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

// Sample furniture data for testing
const sampleFurniture = {
  name: 'Modern Sofa',
  description: 'A sleek modern grey sofa with clean lines and comfortable cushions',
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Home />
        <Container>
          <FurniturePreview furniture={sampleFurniture} />
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
