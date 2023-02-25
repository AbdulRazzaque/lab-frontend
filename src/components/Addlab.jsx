import React from 'react'
import Navbar from './Navbar'
import MaterialTable from "material-table";
import '../App.css'
import { Button, createTheme, TextField, ThemeProvider } from '@mui/material'
import { Link } from 'react-router-dom'
const Addlab = () => {
    const defaultMaterialTheme = createTheme();
  return (
    <div>
        <Navbar/>
        <center><h1 className='text-center mt-5 heading'>Add Lab</h1></center>
        <div className="container">
  <center> <TextField className="my-3 mx-2" sx={{width:500}}  variant="outlined" id="outlined-basic" label="Enter Lab Name"  required/></center> 
  <Link to="#">  <center> <Button variant="contained" type='submit' className='my-2'  >Submit</Button></center> </Link>


        </div>
        <ThemeProvider theme={defaultMaterialTheme}>
        <MaterialTable
      title="Lab name"
      columns={[
        { title: 'Name', field: 'name' },
  
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
  )
}

export default Addlab