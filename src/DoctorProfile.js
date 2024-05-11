import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from './DoctorProfileCard';
<<<<<<< HEAD
import './animations.css';
import doctoravatar from "./images/doctorAvatar.png";
import entavatar from "./images/entAvatar.png";
=======

>>>>>>> 00af297ca046f2495d6305c42e0646a91418fdf0

export default function  DoctorProfile(props) {
  const name = props.props.doctorName;
  const  id =  props.props.doctorId;
  const age  = props.props.doctorAge;
  const gender = props.props.doctorGender;
  const dp = doctoravatar;
  const dp2 = entavatar ;
  const name2 = "ENT Specialist";
  const name3 = "";
  const name4 = "";

  const description1 = "";
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
      {/* First Grid (Left on small screens, Right on larger screens) */}
      <Grid item xs={12} md={6} order={{ xs: 1, md: 1 }}  style={{ animation: 'slideInRight 1s' }}>
        <Card name={name} age={age} id={id} gender={gender} dp = {dp}>
          xs=6 md=4
        </Card>
      </Grid>

      {/* Second Grid (Right on small screens, Left on larger screens) */}
      <Grid item xs={12} md={6} order={{ xs: 2, md: 2 }} marginTop ={35} style={{ animation: 'slideInLeft 1s' }}>
        <Card name={name2} description={description1}  dp = {dp2}>
          xs=6 md=4
        </Card>
      </Grid>
    </Grid>
    </Box>
  );
}
