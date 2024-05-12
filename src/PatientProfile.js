import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from './DoctorProfileCard';
import './animations.css';
import Chart from './images/chart.png';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function PatientProfile(props) {
  const { patientId, patientName, patientAge, patientGender, dp } = props.props;
  const description = ' A patient, within the context of healthcare, refers to an individual receiving medical care or treatment from a healthcare provider. Patients seek medical attention for various reasons, including routine check-ups, diagnosis and treatment of illnesses or injuries, and management of chronic conditions.'
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
          <Grid item xs={12} md={6} order={{ xs: 2, md: 2 }} marginTop={5} style={{ animation: 'slideInLeft 1s' }}>
            <Card  dp={Chart} id={description}>
              xs=6 md=4
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
