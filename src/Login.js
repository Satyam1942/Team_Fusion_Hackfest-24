import React, { useState } from 'react';
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
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import { ethers } from "ethers";
import nacl from 'tweetnacl';
import HackFestABI from './HackFestABI.json'
import BackgroundSlideshow from './BackgroundSlideshow';
const { soliditySha3 } = require('web3-utils');


async function ConnectWallet() {
  if (!window.ethereum) {
    console.error('No Ethereum provider found. Make sure MetaMask is installed.');
    return;
  }

  try {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  } catch (error) {
    console.error('Error requesting accounts:', error);
    return;
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return signer;
}


function LoginForm() {
  const [personType, setPersonType] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUserId(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleChange = (event) => {
    setPersonType(event.target.value);
  };

  const handleLoginClick = async () => {

    let input2 ; 
    if(personType==0)
      input2 = await FetchReportsDoctor(userId);
    else if(personType==1)
      input2 = await FetchReportsPatient(userId);
    else
      input2 = await FetchReportsLab(userId);

    if (input2 === null) return; // Handle error or null case

    const keyPair = nacl.sign.keyPair();
    const privateKey = keyPair.secretKey;
    const publicKey = keyPair.publicKey;

    const web3 = new Web3();

    function hash(data) {
      return data;
    }
    async function FetchReportsPatient(userId) {
      const signer = await ConnectWallet();
      if (!signer) return null;

      const contractAddress = '0x302847B6F0E0BE40d0065e22FFfd91b82EB9E94A'; // Replace with your contract address
      const contract = new ethers.Contract(contractAddress, HackFestABI, signer);

      try {
        const password = await contract.getPassword(userId);
        return password;
      } catch (error) {
        console.error('Error fetching patient details:', error);
        return null;
      }
    }
    async function FetchReportsDoctor(userId) {
      const signer = await ConnectWallet();
      if (!signer) return null;

      const contractAddress = '0x302847B6F0E0BE40d0065e22FFfd91b82EB9E94A'; // Replace with your contract address
      const contract = new ethers.Contract(contractAddress, HackFestABI, signer);

      try {
        const password = await contract.getDoctorPassword(userId);
        return password;
      } catch (error) {
        console.error('Error fetching patient details:', error);
        return null;
      }
    }
    async function FetchReportsLab(userId) {
      const signer = await ConnectWallet();
      if (!signer) return null;

      const contractAddress = '0x302847B6F0E0BE40d0065e22FFfd91b82EB9E94A'; // Replace with your contract address
      const contract = new ethers.Contract(contractAddress, HackFestABI, signer);

      try {
        const password = await contract.getLabPassword(userId);
        return password;
      } catch (error) {
        console.error('Error fetching patient details:', error);
        return null;
      }
    }

   
    const data = password; // User's input password
   
    const hash1 = data;
    const hashedInput1 = hash(hash1);
    const hashedInput2 = hash(input2);
    console.log(hashedInput1);
    console.log(hashedInput2);

    function generateProof(privateKey, input1, input2) {
      return {
        proof: "dummyProof",
        publicSignals: [input1, input2]
      };
    }

    function verifyProof(publicKey, proof, hashedInput1, hashedInput2) {
      return hashedInput1 === hashedInput2;
    }

    const proof = generateProof(privateKey, hash1, input2);
    const isValid = verifyProof(publicKey, proof, hashedInput1, hashedInput2);
   
    setAuthenticated(isValid);

    if (isValid) {
      if (personType === '0') {
        navigate('/dashboard/doctor', { state: { doctorId: "Doctor ID: 372487", doctorName: "Rohan Dagar", doctorAge: "Age: 38", doctorGender: "Gender: Male" } });
      } else if (personType === '1') {
        navigate('/dashboard/patient', { state: { patientId: "User ID: 372487", patientName: "Satyam", patientAge: "Age: 23", patientGender: "Gender: Male" } });
      } else if (personType === '2') {
        navigate('/dashboard/lab', { state: { labId: "User ID: 372487", labName: "Satyam" } });
      }
    }
  };

  return (

    <div>
      <BackgroundSlideshow />
      <Card sx={{ alignSelf: 'center', marginX: 50, marginY: 10, backgroundColor: 'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(5px)', borderRadius: 5 }} elevation={3} >
        <CardContent>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            <Stack marginTop={2}>
              <Avatar alt="Logo" src={logo} sx={{ width: 100, height: 100 }} />
            </Stack>

            <Typography variant="h2" gutterBottom marginTop={3} color="#004A61">
              Login
            </Typography>

            <Box marginTop={3}>
              <TextField id="outlined-basic" label="Username" variant="outlined" required onChange={handleUsernameChange} />
            </Box>

            <Box marginTop={2}>
              <TextField id="outlined-basic" label="Password" variant="outlined" required type="password" onChange={handlePasswordChange} />
            </Box>

            <Box marginTop={2}>
              <FormControl required sx={{ width: '150px' }}>
                <InputLabel id="demo-simple-select-label">Who are you?</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={personType}
                  label="Who are you?"
                  onChange={handleChange}
                >
                  <MenuItem value={'0'}>Doctor</MenuItem>
                  <MenuItem value={'1'}>Patient</MenuItem>
                  <MenuItem value={'2'}>Lab</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Stack marginTop={2}>
              <Button variant="outlined" onClick={handleLoginClick} sx={{
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
