import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import logo from './images/healthLogo.png';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import BackgroundSlideshow from './BackgroundSlideshow';
import Typography from '@mui/material/Typography';
import { ethers } from "ethers";
import {useNavigate} from 'react-router-dom';

import Alert from '@mui/material/Alert';



function LoginForm() {
  const [personType, setPersonType] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [failure, setFailure] = React.useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setPersonType(event.target.value);
  };

  const handleLoginClick = (personType) => {
    if (personType == 0) {
      navigate('/dashboard/doctor', {state:{doctorId:"Doctor ID: 372487" ,doctorName:"Rohan Dagar",  doctorAge:"Age: 38", doctorGender:"Gender: Male" }});
    } else if (personType == 1) {
      navigate('/dashboard/patient', {state:{patientId:"User ID: 372487" ,patientName:"Satyam",  patientAge:"Age: 23", patientGender:"Gender: Male" }});
    } else if (personType == 2) {
      navigate('/dashboard/lab', {state:{labId:"User ID: 372487" ,labName:"Satyam"}});
    }
  }

  return (
    <div >
      <BackgroundSlideshow />
      
      {failure && <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="error">Invalid Credentials</Alert>
      </Stack>
      }

      <Card sx={{ alignSelf: 'center', marginX: 50, marginY: 10, backgroundColor: 'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(5px)', borderRadius: 5 }} elevation={3} >
        <CardContent>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            <Stack marginTop={5} style={{ animation: 'slideInTop 1s' }}>
              <Avatar alt="Logo" src={logo} sx={{ width: 100, height: 100 }} />
            </Stack>

            <Typography variant="h2" gutterBottom marginTop={3} color="#004A61">
              Login
            </Typography>

            {/* <Divider variant="middle" color='black'/> */}

            <Box marginTop={3} style={{ animation: 'slideInRight 1s' }}>
              <TextField id="outlined-basic" label="Address" variant="outlined" required />
            </Box>

            {/* <Box marginTop={2} style={{ animation: 'slideInLeft 1s' }}>
              <TextField id="outlined-basic" label="Password" variant="outlined" required type="password" />
            </Box> */}

            <Box marginTop={2} style={{ animation: 'slideInRight 1s' }}>
              <FormControl required sx={{ width: '150px' }}>
                <InputLabel id="demo-simple-select-label">Who are you?</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={personType}
                  label="Who are you?"
                  onChange={handleChange}
                >
                  <MenuItem value={0}>Doctor</MenuItem>
                  <MenuItem value={1}>Patient</MenuItem>
                  <MenuItem value={2}>Lab</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Stack marginTop={2} style={{ animation: 'slideInBottom 1s' }}>
              <Button variant="outlined" onClick={() => handleLoginClick(personType)} sx={{
                '&:hover': {
                  backgroundColor: '#009096', // Change background color on hover
                  color: 'white'
                },
              }}>Login</Button>
            </Stack>

          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginForm;
