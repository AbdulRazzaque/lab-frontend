import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import MaterialTable from "material-table";
import { Button, createTheme, TextField, ThemeProvider } from '@mui/material'
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import { useForm } from 'react-hook-form';
import date from 'date-and-time';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
const Maindetails = () => {
    const defaultMaterialTheme = createTheme();
    const [data, setData] = useState([]);
    const [value, setValue] = React.useState(null);
    const [value1, setValue1] = React.useState(null); 
    const [flag,setFlag] = React.useState(false)
    const { register, handleSubmit,reset, } = useForm();
  
    const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2ZiMDY5ZjJjN2NkYzQwYWI3ZDQ3NDMiLCJpYXQiOjE2NzczOTU2MTUsImV4cCI6MTY3NzQ4MjAxNX0.oyFYN4ItsvjR8Gnspn9P2s3jLvqlkWXRPGDUukeQ_jE"
 
    const  alldata =()=>{
      axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/itemsMain`,data,
     {headers:{token:`${accessToken}`}})
     .then(response=>{
       console.log('Response',response)
       setData(response.data)
     })
  }
  const onSubmit = (stock) =>{
    let obj={
     value,
     value1,
     ...stock 

    }

   console.log(obj);

   axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/getPrevStockMain`,{from:date.format(value,'YYYY/MM/DD'),to:date.format(value1,'YYYY/MM/DD'), ...obj},)
      .then(response=>{
       
        setData(response.data.pre,'response.data')
        

      })
 } 

console.log(data.pre,'data')
  useEffect(()=>{
  alldata()
},[flag])
  return (
    <div>
        <Navbar/>
        <div className='lab'>

        <Link to="/Mainlab"> <p className='' > Main Lab</p></Link>  
      </div>
      <h1 className='text-center my-5 heading'>Main Lab Previous Details</h1>
        <div>
          <div className="container">
          <form onSubmit={handleSubmit(onSubmit)}>
   
          <LocalizationProvider 
        
        dateAdapter={AdapterDateFns} >
        <DesktopDatePicker
        label="Start Date"
        inputFormat="dd/MM/yyyy"
        value={value}
        onChange={(newValue) => {
          console.log(newValue)
          setValue(newValue)
        }}
        renderInput={(params) => <TextField sx={{width:200}} {...params} />}
      />
      </LocalizationProvider>

      <LocalizationProvider 
        
        dateAdapter={AdapterDateFns} >
        <DesktopDatePicker
        label="End Date"
        inputFormat="dd/MM/yyyy"
        value={value1}
        onChange={(newValue) => {
          console.log(newValue)
          setValue1(newValue)
        }}
        renderInput={(params) => <TextField sx={{width:200}} {...params} />}
      />
      </LocalizationProvider>
     <TextField className="mx-2" sx={{width:200}} {...register("name", { required: true, maxLength: 20 })} variant="outlined" id="outlined-basic" label="Name"  required/>
    <TextField className=" mx-2" sx={{width:200}} {...register("sampleType", { required: true, maxLength: 20 })} variant="outlined" id="outlined-basic" label="sampleType"  required/>
    {/* <TextField className="my-2 mx-2" sx={{width:200}}  variant="outlined" id="outlined-basic" label="Lab sectoin"  required/> */}
     <center> <Button variant="contained" type='submit' className='my-3'  >Submit</Button></center> 
     <center> <Button variant="contained"  className='' onClick={()=>{
    setData([])
   setFlag(!flag)
   setValue(null)
   setValue1(null)
   reset({
    name: "",
    sampleType: "",
  })
     }} 
     
     
     >Cleare
     </Button>
     </center>  
    </form>
  {/* <center> <p className='my-2'><b>Total=</b></p></center>   */}
   </div>
        <ThemeProvider theme={defaultMaterialTheme}>
        <MaterialTable
      title="Main Lab Previous Details"
      columns={[
        { title: 'Name', field: 'name' },
        { title: 'work-order', field: 'workOder' },
        { title: 'Sample NO', field: 'noofSample'},
        { title: 'Sample Type', field: 'sampleType'},
        { title: 'Required Analysis', field: 'RequiredAnalysis'},
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

export default Maindetails