import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from './DoctorProfileCard';
import './animations.css';
import doctoravatar from "./images/doctorAvatar.png";
import entavatar from "./images/entAvatar.png";


export default function  DoctorProfile(props) {
  const name = props.props.doctorName;
  const  id =  props.props.doctorId;
  const age  = props.props.doctorAge;
  const gender = props.props.doctorGender;
  const dp = doctoravatar;
  const dp2 = entavatar ;
  const name2 = "ENT Specialist";
  const description1 = "An Ear, Nose, and Throat (ENT) specialist, or otolaryngologist, is a medical doctor specializing in diagnosing and treating disorders of the ear, nose, throat, and related structures. These experts undergo extensive training in areas such as otology, rhinology, laryngology, and head and neck surgery. They provide comprehensive care for a wide range of conditions, from common ailments like ear infections to complex issues such as head and neck cancers. Using their expertise, ENT specialists perform surgeries and collaborate with other healthcare professionals to offer holistic treatment, aiming to improve the quality of life for individuals with disorders affecting the head and neck region."


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
      <Grid item xs={12} md={6} order={{ xs: 2, md: 2 }}  style={{ animation: 'slideInLeft 1s' }}>
        <Card name={name2} id={description1}  dp = {dp2}>
          xs=6 md=4
        </Card>
      </Grid>
    </Grid>
    </Box>
  );
}
