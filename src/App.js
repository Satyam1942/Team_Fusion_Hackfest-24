import './App.css';
import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import DoctorDashboard from './DoctorDashboard';
import PatientDashboard from './PatientDashboard';
import LabDashboard from './LabDashboard';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MousePointer from './MousePointer.js';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  // Create your custom theme
  const lightTheme = createTheme({
    palette: {
      primary: {
        main: '#00796B', // Teal for a sense of calmness and balance
      },
      secondary: {
        main: '#FF6E40', // Coral for warmth and energy
      },
      background: {
        default: '#FFFFFF', // White background for cleanliness and clarity
      },
      text: {
        primary: '#333333', // Dark gray for primary text
        secondary: '#666666', // Light gray for secondary text
      },
      // You can add more custom palette colors if needed
    },
    // Add other theme options like typography, spacing, etc.
  });

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#ff8694', // Coral accent color
      },
      secondary: {
        main: '#0091bf', // Teal accent color
      },
      background: {
        default: '#000000', // Dark background color
        // paper: '#ffffff', // Dark surface color
      },
      text: {
        primary: '#cccccc', // White primary text color
        secondary: '#999999', // Light gray secondary text color
      },
      // Add more custom palette colors if needed
    },
    // Add other theme options like typography, spacing, etc.
  });

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      {/* <MousePointer/> */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard/doctor" element={<DoctorDashboard />} />
          <Route path="/dashboard/patient" element={<PatientDashboard />} />
          <Route path="/dashboard/lab" element={<LabDashboard />} />
        </Routes>
      </Router>
      {/* <Button
        onClick={toggleDarkMode}
        startIcon={<DarkModeIcon  style={{ color: 'white' }} /> }
        style={{ position: 'fixed', top: '20px', right: '20px' , zIndex:9999 }}
      >
      </Button> */}
    </ThemeProvider>
  );
}

export default App;
