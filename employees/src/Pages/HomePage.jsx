import { Button, Dialog, DialogContent } from '@mui/material';
import React, {useState} from 'react'
import EmployeeTable from '../Components/EmployeeTable';
import AddEmployee from '../Components/AddEmployees';

const HomePage = () => {
  const [open,setOpen] = useState(false);

  const handleClickOpen = ()=>{
    setOpen(true)
  }
  const handleClose = ()=>{
    setOpen(false)
  }

  
  
  return (
    <div>
      <h1>ABC Company Employees List</h1>
        <Button onClick={handleClickOpen}>Add Employees</Button>
        <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                     <AddEmployee/>
                </DialogContent>
            </Dialog>
        <EmployeeTable/>
    </div>
  )
}

export default HomePage