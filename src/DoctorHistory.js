import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import TableLab from './DoctorHistoryTable';
import TableDoctor from './DoctorHistoryTableDoctor';
import retrieveData from './retrieveFile';
import Alert from '@mui/material/Alert';
import { ethers } from 'ethers';
import { useState } from 'react';
import HackFestABI from './HackFestABI.json'

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

export default function DoctorHistory() {
    const [time, setTime] = React.useState('');
    const [type, setType] = React.useState('');
    const [patientId, setPatientId] = React.useState('');
    const [displayTableLab, setDisplayTableLab] = React.useState(false);
    const [displayTableDoctor, setDisplayTableDoctor] = React.useState(false);
    const [submissionFailure, setSubmissionFailure] = React.useState(false);
    const [tableData,setTableData] = React.useState({});

    const handleChange = (event) => {
        setTime(event.target.value);
    };

    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    const handlePatientIdChange = (event) => {
        setPatientId(event.target.value);
    };

    React.useEffect(() => {
        console.log(tableData);
      }, [tableData]);

      async function FetchReports(patientId, count) {
        const signer = await ConnectWallet();
        if (signer) {
            const contractAddress = '0x38eaA27bE9563BdC69863f779a0202E73Cbe29d5'; // Replace with your contract address
            const contract = new ethers.Contract(contractAddress, HackFestABI, signer);

            try {
                const patientReports = await contract.getAllTheDetails(patientId, 2);
                console.log('Patient details:', patientReports);
                return patientReports;
            }
            catch (error) {
                console.error('Error fetching patient details:', error);
            }
        }
    }

    async function FetchPrescription(patientId, count) {
        const signer = await ConnectWallet();
        if (signer) {
            const contractAddress = '0x38eaA27bE9563BdC69863f779a0202E73Cbe29d5'; // Replace with your contract address
            const contract = new ethers.Contract(contractAddress, HackFestABI, signer);

            try {
                const patientReports = await contract.FetchPrescription(patientId, 2);
                console.log('Patient details:', patientReports);
                return patientReports;
            }
            catch (error) {
                console.error('Error fetching patient details:', error);
            }
        }
    }

    async function processCIDArrayLab(CIDArray) {
        const responseArray = [];
        for (const obj of CIDArray) {
            const labReport = await retrieveData(obj.Report_Hash);
            responseArray.push({ "labReport": JSON.parse(labReport) });
        }
        return responseArray;
    }

    async function processCIDArrayDoctor(CIDArray) {
        const responseArray = [];
        for (const obj of CIDArray) {
            const labReport = await retrieveData(obj.Prescription);
            responseArray.push({ "labReport": JSON.parse(labReport) });
        }
        return responseArray;
    }

    const onSubmit = async () => {
        
        if(time=='' || patientId=='' || type===''){
            setSubmissionFailure(true)
            return;
        }else {
            setSubmissionFailure(false);
        }

        if (type==1) {
            const res = await FetchReports(patientId);

            const CIDArray = []
            res.forEach((item, index) => {
                const data = { Prescription: item.Prescription, Report_Hash: item.Report_Hash };
                console.log(data);
                CIDArray.push(data);
            });

            console.log(CIDArray);
            const responseArray = await processCIDArrayLab(CIDArray);
            // console.log(responseArray); 
            setTableData(responseArray);
            setDisplayTableLab(true);
        } else  {
            const res = await FetchPrescription(patientId);
            
            const CIDArray = []
            res.forEach((item, index) => {
                const data = { Prescription: item.PrescriptionHash };
                console.log(data);
                CIDArray.push(data);
            });

            console.log(CIDArray);
            const responseArray = await processCIDArrayDoctor(CIDArray);
            // console.log(responseArray); 
            setTableData(responseArray);
             setDisplayTableDoctor(true);
        }
    };

    return (
        <>
            <Stack sx={{ width: '100%', marginBottom: 2 }} spacing={2} zIndex={2}>
             {submissionFailure && <Alert severity="error">Fetching Details Failed!!.</Alert>}
            </Stack>
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    '& > :not(style)': { mb: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"

            >
                <TextField id="outlined-basic" label="Patient Id" variant="outlined" required style={{ animation: 'slideInLeft 1s' }}  onChange={handlePatientIdChange}/>

            </Box>

            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                marginY: 2
            }}>
                <FormControl sx={{ width: 250 }} style={{ animation: 'slideInRight 1s' }}>
                    <InputLabel id="demo-simple-select-label">Timeline</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={time}
                        label="Timeline"
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value={10}>Last 10 documents</MenuItem>
                        <MenuItem value={20}>Last 20 documents</MenuItem>
                        <MenuItem value={30}>Last 30 documents</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                marginY: 2
            }}>
                <FormControl sx={{ width: 200 }} style={{ animation: 'slideInRight 1s' }}>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        label="Timeline"
                        onChange={handleTypeChange}
                        required
                    >
                        <MenuItem value={0}>Prescriptions</MenuItem>
                        <MenuItem value={1}>Report</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            
            <Stack width={10} sx={{
                alignItems: 'center',
                marginY: 2,
                marginX: 90

            }} >
                <Button variant="contained" onClick={onSubmit} style={{ animation: 'slideInTop 1s' }} >Submit</Button>
            </Stack>

            {displayTableLab && <TableLab tableData={tableData} />}
            {displayTableDoctor && <TableDoctor tableData={tableData} />}

        </>


    );
}
