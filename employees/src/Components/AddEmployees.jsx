import * as React  from 'react';
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useState} from "react";
import { useDispatch } from 'react-redux';
import { getEmployees,addEmployee } from '../Redux/action';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


export default function AddEmployee() {

  const [firstName,setFirstName] = useState("")
  const [lastName,setLastName] = useState("");
  const [value, setValue] = useState(dayjs('2022-04-07'));
  const [selectedDate,setSelectedDate] = useState(dayjs('11-06-2022'))
  const [email,setEmail] = useState('')
  const [phone,setPhone] = useState('')
  const [gender,setGender] = useState(""); 
  const [hobbies,setHobbies] = useState("")
  const dispatch =useDispatch();

  const handleSubmit = (e)=>{
    e.preventDefault();
  if(firstName&&lastName&&selectedDate&&email&&phone&&gender&&hobbies){
    const payload = {
       first_name:firstName,
       last_name:lastName,
       dob:selectedDate,
       email:email,
       phone_number:phone,
       gender:gender,
       hobbies:hobbies
    }
    dispatch(addEmployee(payload))
    .then(()=>{
      dispatch(getEmployees())
    })
    setTimeout(()=>{
      alert("registeration successfull")
    },1000)
    
  }
  else{
    alert("Fill the missing details")
  }
}



  
  return (
    <Box>
         <form onSubmit={handleSubmit} >
            <Stack spacing={3} borderRadius="5px" width="500px" margin="auto" mt={5} p={4}>
               <Box><Typography fontWeight="bolder">REGISTERATION FORM</Typography></Box>
                <Stack direction="row" justifyContent="center" spacing={3}>
                  <TextField id='outlined-name'label="Firstname" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
                  <TextField id='outlined-name'label="Lastname" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
                </Stack>
                <Stack direction="row" justifyContent="center" spacing={8} alignItems="center">
                <Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                          disableFuture
                          label="Responsive"
                          openTo="year"
                          views={['year', 'month', 'day']}
                          value={value}
                          onChange={(newValue) => {
                            setValue(newValue);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Box>
                <Box>
                    <FormControl>
                      <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          value={gender}
                          onChange={(e)=>setGender(e.target.value)}
                        >
                          <FormControlLabel value="Male" control={<Radio />} label="Male" />
                          <FormControlLabel value="Female" control={<Radio />} label="Female" />
                        </RadioGroup>
                      </FormControl>
                </Box>
                </Stack>
                <Stack direction="row" justifyContent="center" spacing={3}>
                  <Box><TextField id='outlined-name'label="Email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/></Box>
                  <Box><TextField id='outlined-name'label="Phone number" type="text" value={phone} onChange={(e)=>setPhone(e.target.value)}/></Box>
                </Stack>
                <Box>
                  <FormLabel>Hobbies</FormLabel>
                  <FormGroup sx={{width:"200px", margin:"auto"}} value={hobbies} onChange={(e)=>setHobbies(e.target.value)}>
                      <FormControlLabel value="Travelling" control={<Checkbox/>} label="Travelling"/>
                      <FormControlLabel value="Atheletics" control={<Checkbox/>} label="Atheletics"/>
                      <FormControlLabel value="Yoga" control={<Checkbox/>} label="Yoga"/>
                  </FormGroup>
                </Box>
                <Box><Button type="submit">submit</Button></Box>
            </Stack>
         </form>
    </Box>
  );
}