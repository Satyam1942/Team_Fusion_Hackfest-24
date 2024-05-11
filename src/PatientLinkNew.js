import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

function PatientLinkNew() {
    const [doctorType , setDoctorType] = React.useState('');
    const [doctorId, setDoctorId] = React.useState('');
    const [submissionFailure, setSubmissionFailure] = React.useState(false);

    const handleChange = (event) => {
        setDoctorType(event.target.value);
    };

    const handleDoctorIdChange = (event) => {
        setDoctorId(event.target.value);
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
                <TextField id="outlined-basic" label="Doctor/Lab Id" variant="outlined" required style={{ animation: 'slideInLeft 1s' }} onChange={handleDoctorIdChange} />

            </Box>

            <Box sx={{
                minWidth: 120, display: 'flex',
                justifyContent: 'center',
            }}>
                <FormControl sx={{ width: 150 }} style={{ animation: 'slideInRight 1s' }} required>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={doctorType}
                        label="Type"
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value={0}>Doctor</MenuItem>
                        <MenuItem value={1}>Lab</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Stack width={10} sx={{
                alignItems: 'center',
                marginY: 2,
                marginX: 90

            }} >
                <Button variant="contained"  style={{ animation: 'slideInTop 1s' }} >Connect</Button>
            </Stack>
        </>
    );
}

export default PatientLinkNew;