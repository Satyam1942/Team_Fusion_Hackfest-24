import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import uploadReport from './uploadReport';
import uploadFile from './uploadFile';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import { ethers } from 'ethers';
import HackFestABI from './HackFestABI.json';

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

export default function LabNewPatient() {
    const [patientId, setPatientId] = useState('');
    const [patientPrescription, setPatientPrescription] = useState('');
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [uploadFailure, setUploadFailure] = useState(false);
    const [submissionSuccess, setSubmissionSuccess] = useState(false);
    const [submissionFailure, setSubmissionFailure] = useState(false);
    const [displayProgress, setDisplayProgress] = useState(false);

    const [validSubmitButton , setValidSubmitButton] = useState(true);

    const [ipfsHash, setIpfsHash] = useState('');
    const fileInputRef = React.useRef(null);
    const [allowPrescriptionDisplay, setAllowPrescriptionDisplay] = useState(false);    

    const verifyUser = ()=>{
        setAllowPrescriptionDisplay(true);
    }
   
    const labId = "1222864837";

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
    
    const handleFileInputChange = async (event) => {

        setValidSubmitButton(false);

        const files = event.target.files;
        if (files && files.length > 0) {
            setDisplayProgress(true);
            const timestamp = getCurrentTimestamp();
            const file = files[0];
            console.log("Selected file:", file);
            const data = await uploadReport(file,`im:${patientId}+${labId}+${timestamp}`);
            setDisplayProgress(false);
            console.log(data.data.IpfsHash);

            if (data.status == 200) {
                setUploadSuccess(true);
                setIpfsHash(data.data.IpfsHash);
                setValidSubmitButton(true);
            }else {
                setUploadFailure(true);
                setValidSubmitButton(true);
            }
        }
    };

    const connectWalletandUploadLab = async (labId, patientId, imageHash, reportHash) => {
        const signer = await ConnectWallet();
        if (signer) {
            const contractAddress = '0x302847B6F0E0BE40d0065e22FFfd91b82EB9E94A'; // Replace with your contract address
            const contract = new ethers.Contract(contractAddress, HackFestABI, signer);
     
     try{
        await contract.UploadLab(labId,patientId,reportHash,imageHash);
        console.log('succesfully uploaded');
        setSubmissionSuccess(true);
     }catch(error){
        console.error('Error registering patient details:', error);
        setSubmissionFailure(true);
     }
    }
    }

    const uploadReportHandler = async () => {

        setValidSubmitButton(false);
        const timestamp = getCurrentTimestamp();
        setDisplayProgress(true);
        const json = {"patientId": patientId, 'labId': labId, "prescription": patientPrescription, 'timestamp': timestamp, "reportHash": ipfsHash }
        console.log(json);
        const response = await uploadFile(json, `${patientId}+${labId}+${timestamp}`);
        setDisplayProgress(false);
        console.log(response);
        if (response.status == 200) {
            const reportHash = response.data.IpfsHash;
            connectWalletandUploadLab(labId, patientId, ipfsHash,reportHash);
            setValidSubmitButton(true);
        } else {
            setSubmissionFailure(true);
            setValidSubmitButton(true);
        }
    }

    const handlePatientIdChange = (event) => {
        setPatientId(event.target.value);
    };

    const handlePatientPrescriptionChange = (event) => {
        setPatientPrescription(event.target.value);
    };

    return (
        <>
            <Box sx={{ width: '100%', marginBottom: 2 }} zIndex={2} >
                {displayProgress && <LinearProgress />}
            </Box>

            <Stack sx={{ width: '100%', marginBottom: 2 }} spacing={2} zIndex={2}>
                {submissionSuccess && <Alert severity="success">Details Uploaded Successfully.</Alert>}
                {submissionFailure && <Alert severity="error">Uploading Details Failed!!.</Alert>}
                {uploadFailure && <Alert severity="error"> Image uploading Failed!!.</Alert>}
                {uploadSuccess && <Alert severity="success"> Image Uploaded Successfully!!.</Alert>}
            </Stack>

            <Box
                component="form"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    '& > :not(style)': { mt: 2, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField id="outlined-basic" label="Patient Id" variant="outlined" style={{ animation: 'slideInLeft 1s' }} onChange={handlePatientIdChange} />
                
            </Box>
            <Stack spacing={2} direction="row" sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                <Button variant="contained" style={{ animation: 'slideInBottom 1s' }} onClick={verifyUser}>Verify</Button>
            </Stack>

             {       
            allowPrescriptionDisplay && <Box
                component="form"

                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    '& .MuiTextField-root': { m: 1, width: '100ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <TextField
                        id="standard-multiline-static"
                        label="Report"
                        multiline
                        rows={20}
                        variant="standard"
                        style={{ animation: 'slideInRight 1s' }}
                        onChange={handlePatientPrescriptionChange}
                    />
                </div>
            </Box>
            }
            
            {
            allowPrescriptionDisplay && <Stack spacing={2} direction="row" sx={{
                display: 'flex',
                justifyContent: 'center',
            }}  >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileInputChange}
                    style={{ display: 'none' }}
                />
                {validSubmitButton && <Button variant="contained" style={{ animation: 'slideInTop 1s' }} onClick={() => fileInputRef.current.click()}>Upload Report</Button>}
                {validSubmitButton && <Button variant="contained" style={{ animation: 'slideInBottom 1s' }} onClick={uploadReportHandler}>Submit</Button>}
            </Stack>
            }

        </>
    );
}
