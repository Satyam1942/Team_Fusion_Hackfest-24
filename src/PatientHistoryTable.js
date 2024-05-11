import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import axios from 'axios';
import Skeleton from '@mui/material/Skeleton';



const columns = [
  { id: 'doctorId', label: 'Doctor Id', minWidth: 170 },
  { id: 'summary', label: 'Summary', minWidth: 100 },
  {
    id: 'date',
    label: 'Date of Visit',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'time',
    label: 'Time of Visit',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'prescription',
    label: 'Prescription',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(doctorId, timestamp, prescription) {
  const date = timestamp.split(",")[1];
  const time = timestamp.split(",")[0];
  return { doctorId, date, time, prescription };
}


export default function PatientHistoryTable(props) {
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const [summary, setSummary] = React.useState('');
  const summaryGeneratingAPIURL = "http://localhost:5000/predict";


  async function fetchSummary() {
    try {
      const res = await axios.post(summaryGeneratingAPIURL, {
        cid: "ejkfhkj",
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [open, setOpen] = React.useState(false);
  const [openPrescription, setOpenPrescription] = React.useState(false);

  const openPrescriptionHandler = () => {
    setOpenPrescription(true);
  }

  const closePrescriptionHandler = () => {
    setOpenPrescription(false);
  }

  const handleClickOpen = async () => {
    setOpen(true);
    setLoading(true);
    const data = await fetchSummary();
    console.log(data);
    setSummary(data.prediction);
    setLoading(false);

  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (!props.tableData) return; // Do nothing if tableData is not available
    const data = JSON.parse(props.tableData);
    const newRow = createData(data.doctorId, data.timestamp, data.prescription);
    setRows(prevRows => [...prevRows, newRow]);
  }, [props.tableData]);

  if (!props.tableData) {
    // Render a placeholder or loading state
    console.log(props.tableData);
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );

  }

  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }} marginTop={20}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column, index) => {
                        const value = row[column.id];
                        if (index == 1) {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <Button variant="outlined" onClick={handleClickOpen}>
                                AI
                              </Button>
                            </TableCell>
                          );
                        } else if (index == 4) {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <Button variant="outlined" onClick={openPrescriptionHandler}>
                                Open Prescription
                              </Button>
                            </TableCell>
                          );
                        } else {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        }
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"AI generated Summary"}
          </DialogTitle>
          <DialogContent>
            {loading && <Box sx={{ width: 300 }}>
              <Skeleton />
              <Skeleton animation="wave" />
              <Skeleton animation={false} />
            </Box>}
            { !loading && 
            <DialogContentText id="alert-dialog-description">
              {summary}
            </DialogContentText>
            }
          </DialogContent>
          <DialogActions>

          </DialogActions>
        </Dialog>
      </React.Fragment>

      <React.Fragment>
        <Dialog
          open={openPrescription}
          onClose={closePrescriptionHandler}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Prescription"}
          </DialogTitle>
          <DialogContent>     
            <DialogContentText id="alert-dialog-description">
              {JSON.parse(props.tableData).prescription}
            </DialogContentText>
            
          </DialogContent>
          <DialogActions>

          </DialogActions>
        </Dialog>
      </React.Fragment>

    </>


  );
}
