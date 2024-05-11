import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from './DoctorProfileCard';
import './animations.css';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function PatientProfile(props) {
  const {patientId, patientName, patientAge, patientGender} = props.props;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6} md={4} style={{ animation: 'slideInRight 1s' }}>
          <Card name = {patientName} age = {patientAge} gender  = {patientGender}  id = {patientId} >xs=6 md=8</Card>
        </Grid>
        <Grid item xs={6} md={4} style={{ animation: 'slideInLeft 1s' }}>
          <Card >xs=6 md=4</Card>
        </Grid>
        <Grid item xs={6} md={4} style={{ animation: 'slideInBottom 1s' }}>
          <Card >xs=6 md=4</Card>
        </Grid>
        <Grid item xs={6} md={4} style={{ animation: 'slideInTop 1s' }}>
          <Card >xs=6 md=8</Card>
        </Grid>
      </Grid>
    </Box>
  );
}
