import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import uploadFile from './uploadFile';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import { ethers } from 'ethers';
import HackFestABI from './HackFestABI.json';
const FormData = require('form-data');


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

export default function DoctorNewPatient() {
    const [patientId, setPatientId] = useState('');
    const [patientPrescription, setPatientPrescription] = useState('');
    const [submissionSuccess, setSubmissionSuccess] = useState(false);
    const [submissionFailure, setSubmissionFailure] = useState(false);
    const [displayProgress, setDisplayProgress] = useState(false);
    const [allowPrescriptionDisplay, setAllowPrescriptionDisplay] = useState(false);
    const [validSubmitButton, setValidSubmitButton] = useState(true);

    const verifyUser = () => {
        setAllowPrescriptionDisplay(true);
    }

    const handlePatientIdChange = (event) => {
        setPatientId(event.target.value);
    };

    const handlePatientPrescriptionChange = (event) => {
        setPatientPrescription(event.target.value);
    };
    const doctorId = "23567673";

    const getCurrentTimestamp = () => {
        const currentDate = new Date();

        // Extract individual components of the timestamp
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const seconds = currentDate.getSeconds();
        const milliseconds = currentDate.getMilliseconds();
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1; // Month is zero-indexed, so we add 1
        const year = currentDate.getFullYear(); // Get last two digits of the year

        // Format the components with leading zeros if necessary
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');
        const formattedMilliseconds = milliseconds.toString().padStart(3, '0');
        const formattedDay = day.toString().padStart(2, '0');
        const formattedMonth = month.toString().padStart(2, '0');
        const formattedYear = year.toString().padStart(2, '0');

        // Construct the formatted timestamp string
        const timestamp = `${formattedHours}:${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds},${formattedDay} ${formattedMonth} ${formattedYear}`;

        return timestamp;
    }

    const connectWalletandUploadPrescription = async (doctorId, patientId, reportHash) => {
        const signer = await ConnectWallet();
        if (signer) {
            const contractAddress = '0x6c19b5e81b43084641E4CA552D068DbCE96abCCD'; // Replace with your contract address
            const contract = new ethers.Contract(contractAddress, HackFestABI, signer);

            try {
                await contract.UploadPrescription(patientId, doctorId, reportHash);
                console.log('succesfully uploaded');
                setSubmissionSuccess(true);
            } catch (error) {
                console.error('Error registering patient details:', error);
                setSubmissionFailure(true);
            }
        }
    }

    const submitPrescription = async () => {
        const timestamp = getCurrentTimestamp();
        const doctorId = "123";

        setDisplayProgress(true);
        // const oldData = await 
        const json = { "patientId": patientId, 'doctorId': doctorId, "prescription": patientPrescription, 'timestamp': timestamp }

        const response = await uploadFile(json, `${patientId}+${doctorId}`);

        setDisplayProgress(false);
        if (response.status == 200) {
            setSubmissionSuccess(true);
            connectWalletandUploadPrescription( patientId, doctorId, response.data.IpfsHash);
            setValidSubmitButton(true);
        } else if (response.status == 400) {
            setSubmissionFailure(true);
        }
    }

    return (
        <>
            <Box sx={{ width: '100%', marginBottom: 2 }} zIndex={2} >
                {displayProgress && <LinearProgress />}
            </Box>

            <Stack sx={{ width: '100%', marginBottom: 2 }} spacing={2} zIndex={2}>
                {submissionSuccess && <Alert severity="success">Details Uploaded Successfully.</Alert>}
                {submissionFailure && <Alert severity="error">Uploading Details Failed!!.</Alert>}
            </Stack>

            <Box
                component="form"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField id="outlined-basic" label="Patient Id" variant="outlined" style={{ animation: 'slideInRight 1s' }} onChange={handlePatientIdChange} />
            </Box>

            <Stack spacing={2} direction="row" sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                <Button variant="contained" style={{ animation: 'slideInBottom 1s' }} onClick={verifyUser}>Verify</Button>
            </Stack>

            {allowPrescriptionDisplay && <Box
                component="form"
                sx={{
                    display: 'flex', justifyContent: 'center',
                    '& .MuiTextField-root': { m: 1, width: '100ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <TextField
                        id="standard-multiline-static"
                        label="Prescription"
                        multiline
                        rows={15}
                        variant="standard"
                        style={{ animation: 'slideInLeft 1s' }}
                        onChange={handlePatientPrescriptionChange}
                    />
                </div>
            </Box>
            }

            {allowPrescriptionDisplay && <Stack spacing={2} direction="row" sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                <Button variant="contained" style={{ animation: 'slideInBottom 1s' }} onClick={submitPrescription}>Submit</Button>
            </Stack>
            }


        </>


    );
}
