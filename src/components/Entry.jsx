import { Autocomplete, Button, createTheme, Grid, TextField, ThemeProvider } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import Navbar from './Navbar'
import dayjs from 'dayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import '../App.css'
import { Link } from 'react-router-dom'
import MaterialTable from "material-table";
const Entry = () => {
    const [value, setValue] = React.useState(dayjs());

    const handleChange = (newValue) => {
      setValue(newValue);
    };
    const top100Films = [
        { label: 'The Shawshank Redemption', year: 1994 },
        { label: 'The Godfather', year: 1972 },

      ];
      const { useState } = React;
      const defaultMaterialTheme = createTheme();
      const [columns, setColumns] = useState([
        { title: 'Name', field: 'name' },
        { title: 'work-order', field: 'wor-order', initialEditValue: 'initial edit value' },
        { title: 'Sample', field: 'Sample'},
        { title: 'Test', field: 'Test'},
        { title: 'Type', field: 'Type'},
        { title: 'Date', field: 'Date'},
        { title: 'lab', field: 'lab'},
        // { title: 'Birth Year', field: 'birthYear', type: 'numeric' },

      ]);
    
      const [data, setData] = useState([
        { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
        { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
      ]);
  return (
    <div>
        <Navbar/>
        <h1 className='text-center mt-3 mb-5 heading'>Entry Mode</h1>
     <Box sx={{ flexGrow: 1 }}>
     
     <form action="">
      <Grid container spacing={2} columns={25} 
      alignItems="center"
        justifyContent="center"
        
      >
        <Grid item xs={6}>
   
        <TextField className="my-2" sx={{width:300}}  variant="outlined" id="outlined-basic" label=" Name"  required/>
        <TextField className="my-2" sx={{width:300}}  variant="outlined" id="outlined-basic" label="Work-order"  required/>
        <TextField className="my-2" sx={{width:300}}  variant="outlined" id="outlined-basic" label="No of Sample"  required/>
        </Grid>
        <Grid item xs={6}>
        <TextField className="my-2" sx={{width:300}}  variant="outlined" id="outlined-basic" label="Required Test"  required/>
        <TextField className="my-2" sx={{width:300}}  variant="outlined" id="outlined-basic" label="Sample Type"  required/>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
   
        <DesktopDatePicker
        className="my-2"
          label="Date desktop"
          inputFormat="MM/DD/YYYY"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField   sx={{width:300}}{...params} />}
        /> </LocalizationProvider>
        </Grid>

      </Grid>

   <center>
   <Autocomplete className="my-2"
      disablePortal
      id="combo-box-demo"
      options={top100Films}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Select Lab" />}
    /></center>  
        <Link to="/entry">  <center> <Button variant="contained" type='submit'  >Submit</Button></center> </Link> 
      
        </form>
    </Box>
   
    <ThemeProvider theme={defaultMaterialTheme}>
    <MaterialTable
      title="Editable Preview"
      columns={columns}
      data={data}
      editable={{
        onRowAdd: newData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              setData([...data, newData]);
              
              resolve();
            }, 1000)
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              setData([...dataUpdate]);

              resolve();
            }, 1000)
          }),
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataDelete = [...data];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              setData([...dataDelete]);
              
              resolve()
            }, 1000)
          }),
      }}
    />
     </ThemeProvider>
     
    </div>
  )
}

export default Entry