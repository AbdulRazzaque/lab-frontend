import React from 'react'
import Navbar from './Navbar'
import MaterialTable from "material-table";
import dayjs from 'dayjs';
import { Button, createTheme, TextField, ThemeProvider } from '@mui/material'
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Link } from 'react-router-dom';
const Previousdetails = () => {
    const defaultMaterialTheme = createTheme();
    const [value, setValue] = React.useState(dayjs());
    const handleChange = (newValue) => {
      setValue(newValue);
    };
  return (
    <div>
        <Navbar/>
        <h1 className='text-center mt-5 heading'>Previous Details</h1>
        <div>
          <div className="container">
            <form action="">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
   
   <DesktopDatePicker
   className="my-2 mx-2"
     label="To"
     inputFormat="MM/DD/YYYY"
     value={value}
     onChange={handleChange}
     renderInput={(params) => <TextField   sx={{width:150}}{...params} />}
   /> </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
   
   <DesktopDatePicker
   className="my-2"
     label="From"
     inputFormat="MM/DD/YYYY"
     value={value}
     onChange={handleChange}
     renderInput={(params) => <TextField   sx={{width:150}}{...params} />}
   /> </LocalizationProvider>
    <TextField className="my-2 mx-2" sx={{width:200}}  variant="outlined" id="outlined-basic" label="Name"  required/>
    <TextField className="my-2 mx-2" sx={{width:200}}  variant="outlined" id="outlined-basic" label="Required Test"  required/>
    <TextField className="my-2 mx-2" sx={{width:200}}  variant="outlined" id="outlined-basic" label="Lab sectoin"  required/>
    <Link to="#">  <center> <Button variant="contained" type='submit' className='my-2'  >Submit</Button></center> </Link>
    </form>
  <center> <p className='my-2'><b>Total=</b></p></center>  
   </div>
        <ThemeProvider theme={defaultMaterialTheme}>
        <MaterialTable
      title="Details"
      columns={[
        { title: 'Name', field: 'name' },
        { title: 'work-order', field: 'wor-order', initialEditValue: 'initial edit value' },
        { title: 'Sample', field: 'Sample'},
        { title: 'Test', field: 'Test'},
        { title: 'Type', field: 'Type'},
        { title: 'Date', field: 'Date'},
        { title: 'lab', field: 'lab'},
      ]}
      data={[
        { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
        { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
      ]}        
      options={{
        exportButton: true
      }}
    />
      </ThemeProvider>
        </div>
    </div>
  )
}

export default Previousdetails