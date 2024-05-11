import './App.css';
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import DoctorDashboard from './DoctorDashboard';
import PatientDashboard from './PatientDashboard';
import LabDashboard from './LabDashboard';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function App() {

  // Create your custom theme
  const theme = createTheme({
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

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard/doctor" element={<DoctorDashboard />} />
          <Route path="/dashboard/patient" element={<PatientDashboard />} />
          <Route path="/dashboard/lab" element={<LabDashboard />} />
        </Routes>
      </Router>
    </ThemeProvider>

  );
}

export default App;
