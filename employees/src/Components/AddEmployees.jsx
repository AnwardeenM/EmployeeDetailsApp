import * as React  from 'react';
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees,addEmployee } from '../Redux/action';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


export default function AddEmployee() {
  const dispatch =useDispatch();
  const datas = useSelector((store)=>store.employees);
  const [userdata,setUserData] = useState({})
  // const [firstName,setFirstName] = useState("")
  // const [lastName,setLastName] = useState("");
  // const [value, setValue] = useState(dayjs('2022-04-07'));
  // const [selectedDate,setSelectedDate] = useState(dayjs('11-06-2022'))
  // const [email,setEmail] = useState('')
  // const [phone,setPhone] = useState('')
  // const [gender,setGender] = useState(""); 
  // const [hobbies,setHobbies] = useState([])
 

  const handlechange=(e)=>{
    const{name,value}=e.target
    setUserData({...userdata,[name]:value})
  }
  const handleSubmit = ()=>{
    
  //  if(firstName&&lastName&&value&&email&&phone&&gender&&hobbies){
  //   const payload = {
  //      first_name:firstName,
  //      last_name:lastName,
  //      dob:value,
  //      email:email,
  //      phone_number:phone,
  //      gender:gender,
  //      hobbies:hobbies
  //   }
    // console.log(payload);
    console.log(userdata);
    dispatch(addEmployee(userdata)).then(()=>dispatch(getEmployees()))
    setTimeout(()=>{
      alert("registeration successfull")
    },1000)    
  // else{
  //   alert("Fill the missing details")
  // }
}

// console.log("datas",datas);

// useEffect(()=>{
//   dispatch(getEmployees())
// },[])

  
  return (
    <Box>
         <form  >
            <Stack spacing={3} borderRadius="5px" width="500px" margin="auto" mt={5} p={4}>
               <Box><Typography fontWeight="bolder">REGISTERATION FORM</Typography></Box>
                <Stack direction="row" justifyContent="center" spacing={3}>
                  <TextField id='outlined-name'label="Firstname" name="first_name"  onChange={handlechange}/>
                  <TextField id='outlined-name'label="Lastname" name="last_name"  onChange={handlechange}/>
                </Stack>
                <Stack direction="row" justifyContent="center" spacing={8} alignItems="center">
                <Box>
                    {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                          disableFuture
                          label="Responsive"
                          openTo="year"
                          views={['year', 'month', 'day']}
                          name="selectedDate"
                          value={value}
                          onChange={(newValue) => {
                            setValue(newValue);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                        
                    </LocalizationProvider> */}
                    <input type="date" name="dob" onChange={handlechange}></input>
                </Box>
                <Box>
                    <FormControl>
                      <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"        
                          onChange={handlechange}
                        >
                          <FormControlLabel value="Male" control={<Radio />} name="gender" label="Male" />
                          <FormControlLabel value="Female" control={<Radio />} name="gender" label="Female" />
                        </RadioGroup>
                      </FormControl>
                </Box>
                </Stack>
                <Stack direction="row" justifyContent="center" spacing={3}>
                  <Box><TextField id='outlined-name'label="Email" type="email" name="email"  onChange={handlechange}/></Box>
                  <Box><TextField id='outlined-name'label="Phone number" type="text" name="phone_number" onChange={handlechange}/></Box>
                </Stack>
                <Box>
                  <FormLabel>Hobbies</FormLabel>
                  <FormGroup sx={{width:"200px", margin:"auto"}} onChange={handlechange}>
                      <FormControlLabel value="Travelling" name="hobbies" control={<Checkbox/>} label="Travelling"/>
                      <FormControlLabel value="Atheletics" name="hobbies" control={<Checkbox/>} label="Atheletics"/>
                      <FormControlLabel value="Yoga" name="hobbies" control={<Checkbox/>} label="Yoga"/>
                  </FormGroup>
                </Box>
                <Box><Button variant='contained' onClick={handleSubmit}>Submit</Button></Box>
            </Stack>
         </form>
    </Box>
  );
}