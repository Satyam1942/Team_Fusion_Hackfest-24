import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import FaceIcon from '@mui/icons-material/Face';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AddIcon from '@mui/icons-material/Add';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import Fab from '@mui/material/Fab';
import  {SmartToy}  from '@mui/icons-material';
import Profile from './PatientProfile';
import History from './PatientHistory';
import LinkNew from './PatientLinkNew';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import Skeleton from '@mui/material/Skeleton';



const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function PatientDashboard(props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [displayProfile, setDisplayProfile] = React.useState(true);
  const [displayHistory, setDisplayHistory] = React.useState(false);
  const [displayLink, setDisplayLink] = React.useState(false);
  const [displaySignOutFragment, setDisplaySignOutFragment] = React.useState(false);
  const [displayChatBotFragment, setDisplayChatBotFragment] = React.useState(false);
  const [responseAI, setResponseAI] = React.useState(false);
  const [response, setResponse] = React.useState('');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = React.useState(false);


  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state);

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClose = () => {
    setDisplaySignOutFragment(false);
  };

  const handleClickOpen = async () => {
    setResponseAI(true);
    setLoading(true);
    const data = await fetchResponse();
    console.log(data);
    setResponse(data);
    setLoading(false);
  };

  const handleDrawerClick = (val) => {
    if (val == 0) {
      setDisplayProfile(true);
      setDisplayHistory(false);
      setDisplayLink(false);
    } else if (val == 1) {
      setDisplayProfile(false);
      setDisplayHistory(true);
      setDisplayLink(false);
    } else if (val == 2) {
      setDisplayProfile(false);
      setDisplayHistory(false);
      setDisplayLink(true);
    } else if (val == 3) {
      setDisplaySignOutFragment(true);

    }
  };
  async function fetchResponse() {
    try {
      const res = await axios.post(' http://localhost:5000/answer', {
        context: `Visit 1: Patient Name: John Doe. Age: 35. Date: May 5, 2024. Diagnosis: Acute Sinusitis. Symptoms: Nasal congestion, facial   pain, headache. Prescription: Amoxicillin, decongestant spray. Visit 2: Patient Name: John Doe.Age: 35.Date: May 12, 2024. Diagnosis: Allergic Rhinitis. Symptoms: Sneezing, runny nose, itchy eyes. Prescription: Loratadine, nasal corticosteroid spray.Visit 3: Patient Name: John Doe.Age: 35.Date: May 19, 2024. Diagnosis: Chronic Sinusitis.Symptoms: Persistent nasal congestion, facial pressure, decreased sense of smell. Prescription: Amoxicillin-clavulanate, saline nasal irrigation. Visit 4: Patient Name: John Doe.Age: 35. Date: May 26, 2024. Diagnosis: Acute Bronchitis.Symptoms: Cough, chest discomfort, fatigue.Prescription: Azithromycin, cough syrup. Visit 5: Patient Name: John Doe. Age: 35. Date: June 2, 2024. Diagnosis: Seasonal Allergic Conjunctivitis. Symptoms: Itchy and red eyes, watery discharge. Prescription: Olopatadine eye drops, artificial tears.`,
        question: prompt
      });
      console.log(res);
      return res.data.answer;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <FaceIcon marginRight={5} />
          Hello {state.patientName}!!
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>

        <Divider />

        <List>
          {['Profile', 'Medical History', 'Link With Doctor', "Sign Out"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => handleDrawerClick(index)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >

                  {index === 0 && <AccountBoxIcon />}
                  {index === 1 && <AssessmentIcon />}
                  {index === 2 && <AddIcon />}
                  {index === 3 && <MeetingRoomIcon />}


                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box sx={{
        '& > :not(style)': { m: 1 }, position: 'fixed',
        bottom: '16px',
        right: '16px',
        zIndex: 1000,
      }}>
        <Fab color="primary" aria-label="add" onClick={()=>{setDisplayChatBotFragment(true)}}>
          <SmartToy />
        </Fab>
      </Box>

      {/*PROFILE*/}
      {displayProfile && <Box component="main" sx={{ flexGrow: 1, p: 3 }}>  <DrawerHeader /> <Profile props={state} /> </Box>}

      {/*History*/}
      {displayHistory && <Box component="main" sx={{ flexGrow: 1, p: 3 }}> <DrawerHeader /> <History /> </Box>}

      {/* DisplayLink */}
      {displayLink && <Box component="main" sx={{ flexGrow: 1, p: 3 }}> <DrawerHeader /> <LinkNew /> </Box>}

      <React.Fragment>
        <Dialog
          open={displaySignOutFragment}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to Sign Out?"}
          </DialogTitle>

          <DialogActions>
            <Button onClick={() => { navigate('/') }}>Yes</Button>
            <Button onClick={handleClose} autoFocus>
              No
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>


      <React.Fragment>
      <Dialog
        open={displayChatBotFragment}
        onClose={()=>{setDisplayChatBotFragment(false)}}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const prompt = formJson.prompt;
            console.log(prompt);
            handleClose();
          },
        }}
      >
        <DialogTitle>SAGE AI</DialogTitle>
        <DialogContent>
          <DialogContentText>
            How may I help you today?
          </DialogContentText>
          {loading && <Box sx={{ width: 300 }}>
              <Skeleton />
              <Skeleton animation="wave" />
              <Skeleton animation={false} />
            </Box>
          }
            { !loading && 
            <DialogContentText id="alert-dialog-description" fontWeight="bold"  sx={{ marginY: '30px' }} >
              {response}
            </DialogContentText>
            }
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="prompt"
            label="Enter Prompt"
            type="message"
            fullWidth
            variant="standard"
            value={prompt}  // Set the value prop to the state variable
            onChange={handlePromptChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{setDisplayChatBotFragment(false)}}>Cancel</Button>
          <Button type="submit" onClick={handleClickOpen}>Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>

    </Box>
  );
}
