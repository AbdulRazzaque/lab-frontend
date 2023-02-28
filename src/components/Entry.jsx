import { Autocomplete, Button, createTheme, Grid, TextField, ThemeProvider } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import dayjs from 'dayjs';
import moment from 'moment'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import '../App.css'
import { Link, useNavigate } from 'react-router-dom'
import MaterialTable from "material-table";
import { useForm } from 'react-hook-form';
import axios from 'axios';
const Entry = () => {
    // const [value, setValue] = React.useState(dayjs());
    const [selectedDate,setSelectedDate] = React.useState(dayjs())
    const defaultMaterialTheme = createTheme();
    const [data, setData] = useState([]);
    // Form Submition Code Start Here 
    const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2ZiMDY5ZjJjN2NkYzQwYWI3ZDQ3NDMiLCJpYXQiOjE2NzczOTU2MTUsImV4cCI6MTY3NzQ4MjAxNX0.oyFYN4ItsvjR8Gnspn9P2s3jLvqlkWXRPGDUukeQ_jE"
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const onSubmit= async(data)=>{

    var obj = {
      date:selectedDate,
      ...data
    }
    try {
       await axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/add`,data,
    {headers:{token:`${accessToken}`}})
    .then(response=>{
      console.log('Response',response)
    })
    navigate('/entry')
    setData(data)
    } catch (error) {
      console.log(`Error While Calling add api ${error}`)
      
      
    }
    alldata()
  }

 
    const handleChange = (newValue) => {
      // setValue(newValue);
      setSelectedDate(newValue);
    };
    const top100Films = [
        { label: 'The Shawshank Redemption', year: 1994 },
        { label: 'The Godfather', year: 1972 },

      ];
      
      

    //  console.log(data)
    
      const [columns, setColumns] = useState([
        { title: 'Name', field: 'name' },
        { title: 'work-order', field: 'workOder' },
        { title: 'Sample', field: 'noofSample'},
        { title: 'Test', field: 'requiredTest'},
        { title: 'Type', field: 'sampleType'},
        { title: 'Date', field: 'date',
        type: 'date',
        dateSetting: {
          format: 'dd/MM/yyyy'
        },
      },
        { title: 'lab', field: 'lab'},
        // { title: 'Birth Year', field: 'birthYear', type: 'numeric' },

      ]);
    const  alldata =()=>{
          axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/item`,data,
         {headers:{token:`${accessToken}`}})
         .then(response=>{
           console.log('Response',response)
           setData(response.data)
         })
      }

      
  const  ondelete = (id)=>{
    axios.delete(`${process.env.REACT_APP_DEVELOPMENT}/api/delete/${id}`,
    {headers:{token:`${accessToken}`}})
    .then(response=>{
      
      setData(response.data)
    })
    alldata()
    
  }
  const  onupdate = (id)=>{
    axios.put(`${process.env.REACT_APP_DEVELOPMENT}/api/update/${id}`,data,
    {headers:{token:`${accessToken}`}})
    .then(response=>{
      // console.log('Response',response)
      setData(response.data)
    })
    alldata()
    
  }
   

useEffect(()=>{
  alldata()
},[])
      
  return (
    <div>
        <Navbar/>
        <h1 className='text-center mt-3 mb-5 heading'>Entry Mode</h1>
     <Box sx={{ flexGrow: 1 }}>
     
     <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} columns={25} 
      alignItems="center"
        justifyContent="center"
         
      >
        <Grid item xs={6}>
   
        <TextField className="my-2" sx={{width:300}}  variant="outlined" id="outlined-basic" label=" Name"  required {...register("name", { required: true })}/>
        <TextField className="my-2" sx={{width:300}}  variant="outlined" id="outlined-basic" label="Work-order" {...register("workOder", { required: true })} required/>
        <TextField className="my-2" sx={{width:300}}  variant="outlined" id="outlined-basic" label="No of Sample"{...register("noofSample", { required: true })}  required/>
        </Grid>
        <Grid item xs={6}>
        <TextField className="my-2" sx={{width:300}}  variant="outlined" id="outlined-basic" label="Required Test" {...register("requiredTest", { required: true })}  required/>
        <TextField className="my-2" sx={{width:300}}  variant="outlined" id="outlined-basic" label="Sample Type" {...register("sampleType", { required: true })}  required/>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
   
        <DesktopDatePicker
        className="my-2"
          label="Date"
          inputFormat="MM/DD/YYYY"
         {...register("date", { required: true })}
          value={selectedDate}
          onChange={handleChange}
          renderInput={(params) => <TextField   sx={{width:300}}{...params}   />}
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
        <center> <Button variant="contained" type='submit'  >Submit</Button></center>
      
        </form>
    </Box>
   
    <ThemeProvider theme={defaultMaterialTheme}>
    <MaterialTable
      title="Lab Details"
      columns={columns}
      data={data}
      editable={{
        onRowAdd:(newRow)=>new Promise((resolve,reject)=>{
          const updatedRows=[...data,{...newRow}]
          setData(updatedRows)
          resolve()
          // console.log(newRow)
        }),
 
        onRowDelete:selectedRow=>new Promise((resolve,reject)=>{
         const index=selectedRow._id
         const updatedRows =[...data]
         updatedRows.splice(index,1)
         setTimeout(()=>{
          setData(updatedRows)
          console.log(updatedRows)
          resolve()
        },2000)
        ondelete(selectedRow._id)
     
        }),
      onRowUpdate:(updatedRow,oldRow)=>new Promise((resolve,reject)=>{
        const index =oldRow._id;
        const updatedRows=[...data]
        updatedRows[index]=updatedRow
        setData(updatedRows)
        resolve()
        console.log(updatedRows)
        onupdate(oldRow._id)
      })
    
      }}
      options={{
        actionsColumnIndex:-1,
        addRowPosition:"first",
        pageSize:20,
     
        exportButton: true
      }}
    />
     </ThemeProvider>
     
    </div>
  )
}

export default Entry