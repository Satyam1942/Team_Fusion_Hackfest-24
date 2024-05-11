import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Table from './PatientHistoryTable';
import retrieveData from './retrieveFile';
import Alert from '@mui/material/Alert';

export default function PatientHistory() {
    const [time, setTime] = React.useState('');
    const [type, setType] = React.useState('');
    const [displayTable, setDisplayTable] = React.useState(false);
    const [submissionFailure, setSubmissionFailure] = React.useState(false);
    const [tableData, setTableData] = React.useState({});

    const handleChange = (event) => {
        setTime(event.target.value);
    };

    const handleTypeChange = (event) => {
        setType(event.target.value);
    };


    React.useEffect(() => {
        console.log(tableData);
    }, [tableData]);


    const onSubmit = async () => {
        
        if(time==='' || type===''){
            setSubmissionFailure(true)
            return;
        }else {
            setSubmissionFailure(false);
        }

        const CID = `bafkreidniwetwo5kyz4gwbq7tflbdxwwamzpl2c7h25nojhoflfoicdsjm`;
        const response = await retrieveData(CID);
        const jsonObject = response;
        setTableData(jsonObject);
        setDisplayTable(true);
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
                <FormControl sx={{ width: 150 }} style={{ animation: 'slideInRight 1s' }} required>
                    <InputLabel id="demo-simple-select-label">Timeline</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={time}
                        label="Timeline"
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value={10}>Last 30 days</MenuItem>
                        <MenuItem value={20}>Last 60 days</MenuItem>
                        <MenuItem value={30}>Last 90  days</MenuItem>
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
                <Button variant="contained" onClick={onSubmit} style={{ animation: 'slideInBottom 1s' }} >Submit</Button>
            </Stack>

            {displayTable && <Table tableData = {tableData}/>}

        </>


    );
}
