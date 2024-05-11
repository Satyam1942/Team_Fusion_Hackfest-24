import './App.css';
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import DoctorDashboard from './DoctorDashboard';
import PatientDashboard from './PatientDashboard';
import LabDashboard from './LabDashboard';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function App() {

  
  const theme = createTheme({
    palette: {
      primary: {
        main: '#00796B', 
      },
      secondary: {
        main: '#FF6E40', 
      },
      background: {
        default: '#FFFFFF', 
      },
      text: {
        primary: '#333333', 
        secondary: '#666666', 
      },
      
    },
    
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
