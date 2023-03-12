import {  Button, Checkbox, Container,  Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Grid, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { Fragment, useEffect, useState } from 'react';
import Navbar from '../../Navbar';
import dayjs from 'dayjs';
import moment from 'moment'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import '../../../App.css'
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate } from 'react-router-dom'

import { useForm } from 'react-hook-form';

import EditIcon from '@mui/icons-material/Edit';
import { DataGrid } from '@mui/x-data-grid';

import axios from 'axios';
const Projectbrucella = () => {
    // const [value, setValue] = React.useState(dayjs());

    const [selectedDate,setSelectedDate] = React.useState(dayjs())
    const [data, setData] = useState([]);
    const [update,setUpdate]=useState(null)
    const [showDialog,setShowDialog]=useState(false)

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

      
      
console.log(update)
    //  console.log(data)
    
      const [columns, setColumns] = useState([
        { title: 'work-order', field: 'workOder',  width:150, },
        { title: 'Name', field: 'name',  width:150, },
        { title: 'Sample', field: 'noofSample',  width:100,},
        { title: 'Date', field: 'date', valueGetter:(param)=>moment.parseZone(param.value).local().format("DD/MM/YY"),width:200,},
        { title: 'Type', field: 'sampleType',  width:200},
        { title: 'Test', field: 'requiredTest',  width:200,},
        {title:"Action" ,
        field:'Action',
        width:150,
        renderCell:()=>(
          <Fragment>
            <Button  onClick={()=>setShowDialog(true)} ><EditIcon/></Button>
            <Button color='error'><DeleteIcon/></Button>
          </Fragment>
        )
      }

      ]);


     // Here I am Calling All DATA 
    const  alldata =()=>{
          axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/item`,data,
         {headers:{token:`${accessToken}`}})
         .then(response=>{
           console.log('Response',response)
           setData(response.data)
           let arr = response.data.map((item,index)=>({...item,id:index+1}))
           setData(arr)
         
         })
      } 
      const updateData=(e)=>{
          setUpdate({...update,[e.target.name]:e.target.value})
          console.log(update)
        
      }
     
      const updateRow = async() =>{
 
try {
        // const UpdateRows = data.map((item)=>
        //   item._id === update._id?update :item
        // )
  await  axios.put(`${process.env.REACT_APP_DEVELOPMENT}/api/update/${update._id}`,update,
  {headers:{token:`${accessToken}`}})
  .then(response=>{
    console.log('Response',response)
  
  })

  setData(update);
  setShowDialog(false)
} catch (error) {
  console.log(error)
}
 
  }
useEffect(()=>{
  alldata()
},[])
      
  return (
    <div>
        {/* <Navbar/> */}
        <Navbar/>
        {/* This is Dialog box  */}
        <Container>
          { update &&
    <Dialog open={showDialog} style={{height:600}}>
    <DialogTitle>Update Data</DialogTitle>
    <DialogContent>
    <Grid container>
  <Grid item xs={12}>

  <TextField className="my-2" sx={{ width: 500 }}  variant="outlined" id="outlined-basic" label="Work-order" name='workOder' required value={update.workOder} onChange={updateData} />
  <TextField className="my-2" sx={{ width: 500 }}  variant="outlined" id="outlined-basic" label=" Name"  required name='name' value={update.name} onChange={updateData} />
  <TextField className="my-2" sx={{ width: 500 }} variant="outlined" id="outlined-basic" label="No of Sample" name='noofSample'  required value={update.noofSample} onChange={updateData} />


  <LocalizationProvider dateAdapter={AdapterDayjs}>

  <DesktopDatePicker
  className="my-2"
    label="Date"
    inputFormat="DD/MM/YYYY"
   {...register("date", { required: true })}
    value={update.date}
    onChange={handleChange}
    renderInput={(params) => <TextField   sx={{ width: 500 }} {...params}   />}
  /> </LocalizationProvider>
  
   <br />
    <br />
    
<b> Sample Type  : </b>  <FormControlLabel control={<Checkbox defaultChecked />} label="Blood" />
         <FormControlLabel control={<Checkbox  />} label="Fecal" />
         <FormControlLabel control={<Checkbox  />} label="Swab" />
         <FormControlLabel control={<Checkbox  />} label="Urine" />
        <TextField className="my-2" sx={{ width: 500 }} variant="outlined" id="outlined-basic" label="option" placeholder='Enter other option' {...register("workOder", { required: true })} />

         <br />
         <br />
<b> Required Analysis  : </b>  <FormControlLabel control={<Checkbox defaultChecked />} label="Bio" />
         <FormControlLabel control={<Checkbox  />} label="Brucella" />
         <FormControlLabel control={<Checkbox  />} label="All Vitamins" />
         <FormControlLabel control={<Checkbox  />} label="All Parasite" />
         <FormControlLabel control={<Checkbox  />} label="Hemo" />
         <FormControlLabel control={<Checkbox  />} label="Elisa" />
         <FormControlLabel control={<Checkbox  />} label="Vitamin B1" />
         <FormControlLabel control={<Checkbox  />} label="Progeseron" />
         <FormControlLabel control={<Checkbox  />} label="Culture" />
         <FormControlLabel control={<Checkbox  />} label="Testeerone" />
         <FormControlLabel control={<Checkbox  />} label="All Parasite" />
         {/* <FormControlLabel control={<Checkbox  />} label="All Parasite" /> */}
        <TextField className="my-2" sx={{ width: 500 }} variant="outlined" id="outlined-basic" label="option" placeholder='Enter other option' {...register("workOder", { required: true })} />
  </Grid>

</Grid>

    </DialogContent>
    <DialogActions>
      <Button variant='contained' onClick={updateRow}>Update</Button>
      <Button variant='outlined' color='error'
       onClick={()=>{setShowDialog(false)}}>Delete</Button>
    </DialogActions>
    </Dialog>
          }
      
          <div className='previos'>

    <Link to="/Projecdetails">   <p className='text-right' > previous details</p></Link> 
          </div>

        </Container>
        <h1 className='text-center my-3 mb-5 heading'>Project Brucella</h1>
        
     <Box sx={{ flexGrow: 1 }}>
     
     <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={1} columns={30} 
      alignItems="center"
        justifyContent="center"
         
      >
        <Grid item xs={8}>
   
        <TextField className="my-2" sx={{ width: 300 }} variant="outlined" id="outlined-basic" label="Work-order" {...register("workOder", { required: true })} required/>
        <TextField className="my-2" sx={{ width: 300 }}  variant="outlined" id="outlined-basic" label=" Name"  required {...register("name", { required: true })}  onChange={updateData} />
        <TextField className="my-2" sx={{ width: 300 }} variant="outlined" id="outlined-basic" type='number' label="No of Sample"{...register("noofSample", { required: true })}  required/>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
   
        <DesktopDatePicker
        className="my-2"
          label="Date"
          sx={{ width: 500 }}
          // inputFormat="YYYY/MM/DD"
          inputFormat="DD/MM/YYYY"
          {...register("date", { required: true })}
          value={selectedDate}
          onChange={handleChange}
          renderInput={(params) => <TextField   sx={{ width: 300 }} {...params}   />}
        /> </LocalizationProvider>
        <br />
        <br />
        </Grid>
        <Grid item xs={12}>
<b> Sample Type  : </b>  <FormControlLabel control={<Checkbox defaultChecked />} label="Blood" />
         <FormControlLabel control={<Checkbox  />} label="Fecal" />
         <FormControlLabel control={<Checkbox  />} label="Swab" />
         <FormControlLabel control={<Checkbox  />} label="Urine" />
        <TextField className="my-2" sx={{ width: 500 }} variant="outlined" id="outlined-basic" label="option" placeholder='Enter other option' {...register("workOder", { required: true })} />

         <br />
         <br />
<b> Required Analysis  : </b>  <FormControlLabel control={<Checkbox defaultChecked />} label="Bio" />
         <FormControlLabel control={<Checkbox  />} label="Brucella" />
         <FormControlLabel control={<Checkbox  />} label="All Vitamins" />
         <FormControlLabel control={<Checkbox  />} label="All Parasite" />
         <FormControlLabel control={<Checkbox  />} label="Hemo" />
         <FormControlLabel control={<Checkbox  />} label="Elisa" />
         <FormControlLabel control={<Checkbox  />} label="Vitamin B1" />
         <FormControlLabel control={<Checkbox  />} label="Progeseron" />
         <FormControlLabel control={<Checkbox  />} label="Culture" />
         <FormControlLabel control={<Checkbox  />} label="Testeerone" />
         <FormControlLabel control={<Checkbox  />} label="All Parasite" />
         {/* <FormControlLabel control={<Checkbox  />} label="All Parasite" /> */}
        <TextField className="my-2" sx={{ width: 500 }} variant="outlined" id="outlined-basic" label="option" placeholder='Enter other option' {...register("workOder", { required: true })} />

     
        </Grid>

      </Grid> 
   
        <center> <Button variant="contained" type='submit' className='my-4'  >Submit</Button></center>
      
        </form>
    </Box>
   
      <Box sx={{ height: 900, width: '100%' }}>
      <DataGrid
        onRowClick={(item)=>setUpdate(item.row)}
        rows={data}
        columns={columns}
        pageSize={50}
        rowsPerPageOptions={[50]}
       
        // checkboxSelection
     
        experimentalFeatures={{ newEditingApi: true }}
  
      />
    </Box>
     
    </div>
  )
}

export default Projectbrucella