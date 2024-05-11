import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Table from './DoctorHistoryTable';
import retrieveData from './retrieveFile';
import Alert from '@mui/material/Alert';

export default function DoctorHistory() {
    const [time, setTime] = React.useState('');
    const [type, setType] = React.useState('');
    const [patientId, setPatientId] = React.useState('');
    const [displayTable, setDisplayTable] = React.useState(false);
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

    const onSubmit = async () => {
        if(time=='' || patientId=='' || type==''){
            setSubmissionFailure(true)
            return;
        }else {
            setSubmissionFailure(false);
        }

        /* get hash from block chain */
        const CID = `bafkreidniwetwo5kyz4gwbq7tflbdxwwamzpl2c7h25nojhoflfoicdsjm`
        const response = await retrieveData(CID);
        const jsonObject = response;

        setTableData(jsonObject);
        setDisplayTable(true);
        
        // } else {
        //     console.log(response);
        //     setSubmissionFailure(true);
        // }
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
                        <MenuItem value={10}>Last 10 prescriptions</MenuItem>
                        <MenuItem value={20}>Last 20 prescriptions</MenuItem>
                        <MenuItem value={30}>Last 30 prescriptions</MenuItem>
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

            {displayTable && <Table  tableData = {tableData}/>}

        </>


    );
}
