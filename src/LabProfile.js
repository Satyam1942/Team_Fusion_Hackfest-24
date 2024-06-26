import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from './DoctorProfileCard';
import LabAvatar from './images/labPhoto.png'
import LabChart from './images/chart.png';

export default function  LabProfile(props) {
  const name = props.props.labName;
  const  id =  props.props.labId;
  // const dp = props.props.dp;

  const name2 = "ENT Specialist";
  const name3 = "";
  const name4 = "";

  const description1 = "As a doctor, I am entrusted with the responsibility of safeguarding and promoting the health and well-being of my patients. Every day, I walk into the hospital or clinic with a sense of purpose and dedication to provide the best possible care to those who entrust me with their health.";
  const description2 = "5 star rated by more than thousand patients";
  const description3 = "";
  const description4 = "";

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid container spacing={2}>
          {/* First Grid (Left on small screens, Right on larger screens) */}
          <Grid item xs={12} md={6} order={{ xs: 1, md: 1 }} style={{ animation: 'slideInRight 1s' }}>
            <Card name={"Shubham"}  id={"Lab Id: 1715486676"} dp = {LabAvatar}>
              xs=6 md=4
            </Card>
          </Grid>

          {/* Second Grid (Right on small screens, Left on larger screens) */}
          <Grid item xs={12} md={6} order={{ xs: 2, md: 2 }} marginTop={2} style={{ animation: 'slideInLeft 1s' }}>
            <Card id={"A pathology lab serves as a crucial diagnostic hub, analyzing tissue samples, blood, and bodily fluids to detect diseases and monitor health. Through cutting-edge technology and expert analysis, pathology labs provide accurate diagnoses, guiding treatment decisions and improving patient outcomes with precision and efficiency."} dp={LabChart}>
              xs=6 md=4
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
