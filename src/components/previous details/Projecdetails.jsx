import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import MaterialTable from "material-table";
import dayjs from 'dayjs';
import { Button, createTheme, TextField, ThemeProvider } from '@mui/material'
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Link } from 'react-router-dom';
import axios from 'axios';
const Projecdetails = () => {
    const defaultMaterialTheme = createTheme();
    const [data, setData] = useState([]);
    const [value, setValue] = React.useState(dayjs());
    const handleChange = (newValue) => {
      setValue(newValue);
    };
    const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2ZiMDY5ZjJjN2NkYzQwYWI3ZDQ3NDMiLCJpYXQiOjE2NzczOTU2MTUsImV4cCI6MTY3NzQ4MjAxNX0.oyFYN4ItsvjR8Gnspn9P2s3jLvqlkWXRPGDUukeQ_jE"

    const  alldata =()=>{
      axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/item`,data,
     {headers:{token:`${accessToken}`}})
     .then(response=>{
       console.log('Response',response)
       setData(response.data)
     })
  }

  useEffect(()=>{
  alldata()
},[])
  return (
    <div>
        <Navbar/>
        <div className='lab'>

<Link to="/Projectbrucella"> <p className='' > Project brucella</p></Link> 
      </div>
        <h1 className='text-center my-5 heading'>Project Brucella Previous Details</h1>
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
    <Link to="#">  <center> <Button variant="contained" type='submit' className='my-3'  >Submit</Button></center> </Link>
    </form>
  <center> <p className='my-2'><b>Total=</b></p></center>  
   </div>
        <ThemeProvider theme={defaultMaterialTheme}>
        <MaterialTable
      title="Details"
      columns={[
        { title: 'Name', field: 'name' },
        { title: 'work-order', field: 'workOder' },
        { title: 'Sample', field: 'noofSample'},
        { title: 'Test', field: 'requiredTest'},
        { title: 'Type', field: 'sampleType'},
      { title: 'lab', field: 'lab'},
      { title: 'Date', field: 'date',
      type: 'date',
      dateSetting: {
        format: 'yyyy/mm/dd'
      },
    },
      ]}
 
      data={data}      
      options={{
        exportButton: true,
        pageSize:20,
        pageSizeOptions:[20,100,500,1000],

      }}
    />
      </ThemeProvider>
        </div>
    </div>
  )
}

export default Projecdetails