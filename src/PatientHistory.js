import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import TableLab from './PatientHistoryTable';
import TableDoctor from './PatientHistoryTable';

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

export default function PatientHistory() {
    const [time, setTime] = React.useState('');
    const [type, setType] = React.useState('');

    const [tableData, setTableData] = React.useState([]);
    const [displayTableLab, setDisplayTableLab] = React.useState(false);
    const [displayTableDoctor, setDisplayTableDoctor] = React.useState(false);

    const [submissionFailure, setSubmissionFailure] = React.useState(false);
    const patientId = 1715445684;

    const handleChange = (event) => {
        setTime(event.target.value);
    };

    const handleTypeChange = (event) => {
        setType(event.target.value);

    };


    React.useEffect(() => {
        console.log(tableData);
    }, [tableData]);



    async function FetchReports(patientId, count) {
        const signer = await ConnectWallet();
        if (signer) {
            const contractAddress = '0x6c19b5e81b43084641E4CA552D068DbCE96abCCD'; // Replace with your contract address
            const contract = new ethers.Contract(contractAddress, HackFestABI, signer);

            try {
                const patientReports = await contract.getAllTheDetails(patientId, 1);
                console.log('Patient details:', patientReports);
                return patientReports;
            }
            catch (error) {
                console.error('Error fetching patient details:', error);
            }
        }
    }

    async function processCIDArray(CIDArray) {
        const responseArray = [];
        for (const obj of CIDArray) {
            const labReport = await retrieveData(obj.Report_Hash);
            responseArray.push({ "labReport": JSON.parse(labReport) });
        }
        return responseArray;
    }

    const onSubmit = async () => {

        if (time === '' || type === '') {
            setSubmissionFailure(true)
            return;
        } else {
            setSubmissionFailure(false);
        }
    
        if (type===1) {
            const res = await FetchReports(patientId);

            const CIDArray = []
            res.forEach((item, index) => {
                const data = { Prescription: item.Prescription, Report_Hash: item.Report_Hash };
                console.log(data);
                CIDArray.push(data);
            });

            console.log(CIDArray);
            const responseArray = await processCIDArray(CIDArray);
            // console.log(responseArray); 
            setTableData(responseArray);
            setDisplayTableLab(true);
        } else  {
            // const res = await FetchPrescription(patientId);

            // const CIDArray = []
            // res.forEach((item, index) => {
            //     const data = { Prescription: item.Prescription };
            //     console.log(data);
            //     CIDArray.push(data);
            // });

            // console.log(CIDArray);
            // const responseArray = await processCIDArray(CIDArray);
            // // console.log(responseArray); 
            // setTableData(responseArray);
            //  setDisplayTableDoctor(true);
        }
    };

    return (
        <>
            <Stack sx={{ width: '100%', marginBottom: 2 }} spacing={2} zIndex={2}>
                {submissionFailure && <Alert severity="error">Fetching Details Failed!!.</Alert>}
            </Stack>

            <Box sx={{
                minWidth: 120, display: 'flex',
                justifyContent: 'center',
            }}>
                <FormControl sx={{ width: 200 }} style={{ animation: 'slideInRight 1s' }} required>
                    <InputLabel id="demo-simple-select-label">Timeline</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={time}
                        label="Timeline"
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value={10}>Last 30 documents</MenuItem>
                        <MenuItem value={20}>Last 60 documents</MenuItem>
                        <MenuItem value={30}>Last 90 documents</MenuItem>
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
                        label="Type"
                        onChange={handleTypeChange}
                        required
                    >
                        <MenuItem value={0}>Prescriptions</MenuItem>
                        <MenuItem value={1}>Report</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Stack spacing={2} direction="row" sx={{
                display: 'flex',
                justifyContent: 'center', marginY: 2
            }} >
                <Button variant="contained" onClick={onSubmit} style={{ animation: 'slideInBottom 1s' }}>Submit</Button>
            </Stack>

            {displayTableLab && <TableLab tableData={tableData} />}
            {displayTableDoctor && <TableDoctor tableData={tableData} />}


        </>


    );
}
