import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from './DoctorProfileCard';
<<<<<<< HEAD
import './animations.css';
import Chart from './images/chart.png';
=======
>>>>>>> 00af297ca046f2495d6305c42e0646a91418fdf0

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function PatientProfile(props) {
  const { patientId, patientName, patientAge, patientGender, dp } = props.props;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid container spacing={2}>
          {/* First Grid (Left on small screens, Right on larger screens) */}
          <Grid item xs={12} md={6} order={{ xs: 1, md: 1 }} style={{ animation: 'slideInRight 1s' }}>
            <Card name={patientName} age={patientAge} id={patientId} gender={patientGender} dp = {dp} >
              xs=6 md=4
            </Card>
          </Grid>

          {/* Second Grid (Right on small screens, Left on larger screens) */}
          <Grid item xs={12} md={6} order={{ xs: 2, md: 2 }} marginTop={35} style={{ animation: 'slideInLeft 1s' }}>
            <Card  dp={Chart}>
              xs=6 md=4
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
