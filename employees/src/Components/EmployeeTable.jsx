import { Box,Button, Checkbox, Dialog, DialogContent, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { editEmployee, getEmployees } from '../Redux/action';
import { useSelector,useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import AddEmployee from './AddEmployees';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function EmployeeTable() {

  const rows =useSelector((store)=>store.employees);
  const [open, setOpen] = useState(false);
  const [firstName,setFirstName] = useState('')
  const [lastName,setLastName] = useState("");
  const [selectedDate,setSelectedDate] = useState(dayjs('04-07-2022'))
  const [email,setEmail] = useState('')
  const [phone,setPhone] = useState('')
  const [gender,setGender] = useState(""); 
  const [selectHobbies,setSelectHobbies] = useState([])
  const [currentId,setCurrentId] = useState('');
  const dispatch = useDispatch();
  // console.log(rows);
  
  const handleClickOpen = (id) => {
    setCurrentId(id)   
    // console.log(currentId)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (e)=>{
    e.preventDefault();
    if(firstName&&lastName&&selectedDate&&email&&phone&&gender&&selectHobbies){
        const payload = {
           first_name:firstName,
           last_name:lastName,
           dob:selectedDate,
           email:email,
           phone:phone,
           gender:gender,
           hobbies:selectHobbies
        }
        dispatch(editEmployee(currentId,payload))
        .then(()=>{
          console.log("After adding Data")
            dispatch(getEmployees())
        })
     }
}

  useEffect(() => {
    if (rows.length>=0) {
      dispatch(getEmployees());
    }
    // dispatch(getEmployees())
  }, []);
  // console.log(rows);




  return (
    <>
      <Typography p={3} variant="h4">EMPLOYEE DETAILS</Typography>
      {/* <Box textAlign="end" p={3}>
        <Button onClick={handleClickOpen} variant='contained'>ADD DATA</Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogContent>
                <AddEmployee/>
            </DialogContent>
        </Dialog>
      </Box> */}
      <Box>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Employee Names</StyledTableCell>
            <StyledTableCell align="right">DOB</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Phone</StyledTableCell>
            <StyledTableCell align="right">Gender</StyledTableCell>
            <StyledTableCell align="right">Hobbies</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) =>{
          return <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.first_name}{row.last_name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.dob}</StyledTableCell>
              <StyledTableCell align="right">{row.email}</StyledTableCell>
              <StyledTableCell align="right">{row.phone}</StyledTableCell>
              <StyledTableCell align="right">{row.gender}</StyledTableCell>
              <StyledTableCell align="right">{row.hobbies}</StyledTableCell>
              <StyledTableCell align="right">
                <Button onClick={handleClickOpen} variant="contained">Edit</Button>
              <Dialog open={open} onClose={handleClose}>
                        <DialogContent>
                          <form onSubmit={handleEdit}>
                            <Stack
                              spacing={3}
                              borderRadius="5px"
                              width="500px"
                              margin="auto"
                              mt={5}
                              p={4}
                            >
                              <Box>
                                <Typography fontWeight="bolder">
                                  REGISTERATION FORM
                                </Typography>
                              </Box>
                              <Stack
                                direction="row"
                                justifyContent="center"
                                spacing={3}
                              >
                                <TextField
                                  id="outlined-name"
                                  label="Firstname"
                                  value={firstName}
                                  onChange={(e) => setFirstName(e.target.value)}
                                />
                                <TextField
                                  id="outlined-name"
                                  label="Lastname"
                                  value={lastName}
                                  onChange={(e) => setLastName(e.target.value)}
                                />
                              </Stack>
                              <Stack
                                direction="row"
                                justifyContent="center"
                                spacing={8}
                                alignItems="center"
                              >
                                <Box>
                                  <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                  >
                                    <MobileDatePicker
                                      label="Date picker"
                                      inputFormat="MM/DD/YYYY"
                                      value={selectedDate}
                                      onChange={(newValue) =>
                                      setSelectedDate(newValue)
                                      }
                                      renderInput={(params) => (
                                        <TextField {...params} />
                                      )}
                                    />
                                  </LocalizationProvider>
                                </Box>
                                <Box>
                                  <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">
                                      Gender
                                    </FormLabel>
                                    <RadioGroup
                                      row
                                      aria-labelledby="demo-row-radio-buttons-group-label"
                                      name="row-radio-buttons-group"
                                      value={gender}
                                      onChange={(e) =>
                                        setGender(e.target.value)
                                      }
                                    >
                                      <FormControlLabel
                                        value="male"
                                        control={<Radio />}
                                        label="male"
                                      />
                                      <FormControlLabel
                                        value="female"
                                        control={<Radio />}
                                        label="Female"
                                      />
                                    </RadioGroup>
                                  </FormControl>
                                </Box>
                              </Stack>
                              <Stack
                                direction="row"
                                justifyContent="center"
                                spacing={3}
                              >
                                <Box>
                                  <TextField
                                    id="outlined-name"
                                    label="Email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                  />
                                </Box>
                                <Box>
                                  <TextField
                                    id="outlined-name"
                                    label="Phone number"
                                    type="text"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                  />
                                </Box>
                              </Stack>
                              <Box>
                                <FormLabel>Hobbies</FormLabel>
                                <FormGroup
                                  sx={{ width: "200px", margin: "auto" }}
                                  value={selectHobbies}
                                  onChange={(e) =>
                                    setSelectHobbies(e.target.value)
                                  }
                                >
                                  <FormControlLabel
                                    value="Travelling"
                                    control={<Checkbox />}
                                    label="Travelling"
                                  />
                                  <FormControlLabel
                                    value="Atheletics"
                                    control={<Checkbox />}
                                    label="Atheletics"
                                  />
                                  <FormControlLabel
                                    value="Yoga"
                                    control={<Checkbox />}
                                    label="Yoga"
                                  />
                                </FormGroup>
                              </Box>
                              <Box>
                                <Button type="submit" variant='contained'>submit</Button>
                              </Box>
                            </Stack>
                          </form>
                        </DialogContent>
                      </Dialog>
              </StyledTableCell>

            </StyledTableRow>
          })}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
    </>
  );
}
