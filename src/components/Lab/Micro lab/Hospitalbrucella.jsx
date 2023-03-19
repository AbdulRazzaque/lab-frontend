import {  Button, Checkbox, Container,  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, Grid, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { Fragment, useEffect, useState } from 'react';
import Navbar from '../../Navbar';
import dayjs from 'dayjs';
import date from 'date-and-time';
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
const Hospitalbrucella = (props) => {
    // const [value, setValue] = React.useState(dayjs());
    const [orderBatch,setOrderBatch]=React.useState("B1")
    const [workOrderDate,setWorkOrderDate]=React.useState("")
    const [selectedDate,setSelectedDate] = React.useState(dayjs())
    const [data, setData] = useState([]);
    const [update,setUpdate]=useState([])
    const [showDialog,setShowDialog]=useState(false)
    const [open,setOpen]=useState(false)
    // Form Submition Code Start Here 
    const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2ZiMDY5ZjJjN2NkYzQwYWI3ZDQ3NDMiLCJpYXQiOjE2NzczOTU2MTUsImV4cCI6MTY3NzQ4MjAxNX0.oyFYN4ItsvjR8Gnspn9P2s3jLvqlkWXRPGDUukeQ_jE"
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

// console.log(selectedDate)
  // console.log(data)
 
    const handleChange = (newValue) => {
      // setValue(newValue);
      setSelectedDate(newValue);
    };


      // console.log(workOrderDate)
// console.log(update)
    //  console.log(data)
    
      const [columns, setColumns] = useState([
        { title: 'work-order', field: 'workOder',  width:150, },
        { title: 'Name', field: 'name',  width:150, },
        { title: 'Sample', field: 'noofSample',  width:100,},
        { title: 'Date', field: 'date', valueGetter:(param)=>moment.parseZone(param.value).local().format("YYYY/MM/DD"),width:200,},
        { title: 'Type', field: 'sampleType',  width:200},
        { title: 'Test', field: 'requiredTest',  width:200,},
        {title:"Action" ,
        field:'Action',
        width:150,
        renderCell:(params)=>(
          <Fragment>
            <Button  onClick={()=>setShowDialog(true)} ><EditIcon/></Button>
            <Button color='error' onClick={()=>deleteRow(params.row)}><DeleteIcon/></Button>
          </Fragment>
        )
      }

      ]);

      //here i am adding  all Data 
      const onSubmit= async(data)=>{

        var obj = {
          date:selectedDate,
          workOder:`${workOrderDate}`,
          ...data
        }
     
        try {
           await axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/add`,data,
        {headers:{token:`${accessToken}`}})
        .then(response=>{
          console.log('Response',response)
        })
       console.log(data)
        setData(data)
    
        } catch (error) {
          console.log(`Error While Calling add api ${error}`)
          
          
        }
        setWorkOrderDate(date.format(new Date(), 'YY-MM'))
        alldata()
      }

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
      
      // update All data 
      console.log(update)
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
  console.log(update)
  setShowDialog(false)
  alldata()
} catch (error) {
  console.log(error)
}
 
  }


  const deleteRow = async(rowData)=>{
    // console.log(rowData)
    // confirm("Are You Sure you want to delete ")
if(deleteRow){
   
  try {

    await  axios.delete(`${process.env.REACT_APP_DEVELOPMENT}/api/delete/${rowData._id}`,update,
    // await  axios.delete(`${process.env.REACT_APP_DEVELOPMENT}/api/deletelab/`,
    {headers:{token:`${accessToken}`}})
    .then(response=>{
      console.log('Response',response)
    //  response.data.map((item,index)=>setRowdelete(item) )
      
    
  
      
     alldata()
    })
  }
  catch (error) {
    console.log(error)
    
  }
}

    console.log("Hello and welcome")
  }
  // console.log(update._id)
useEffect(()=>{
  alldata()
},[])
      
  return (
   
    <div>
        {/* <Navbar/> */}
        <Navbar/>

        {/* Thsi Diloag box for Delete Alert  */}
        <Container>
        {/* <Dialog open={open}>
        <DialogTitle>Delete Report</DialogTitle>
      handleSubmit={handleSubmit}
      <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Are You Sure Your Want To Delete This Reoprt
          </DialogContentText>
        </DialogContent>
      </Dialog> */}



{/* This Dialog box is update  */}
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
    inputFormat="YYYY/MM/DD"
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

    <Link to="/Brucelladetails">   <p className='text-right' > previous details</p></Link> 
          </div>

        </Container>
        <h1 className='text-center my-3 mb-5 heading'>Hospital Brucella fsdaf</h1>
        
     <Box sx={{ flexGrow: 1 }}>
     
     <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={1} columns={30} 
      alignItems="center"
        justifyContent="center"
         
      >
        <Grid item xs={8}>
   
        <TextField className="my-2" sx={{ width: 300 }} variant="outlined" id="outlined-basic" label="Work-order" {...register("workOder")} />
        <TextField className="my-2" sx={{ width: 300 }}  variant="outlined" id="outlined-basic" label=" Name"   {...register("name")} required  />
        <TextField className="my-2" sx={{ width: 300 }} variant="outlined" id="outlined-basic" type='number' label="No of Sample"{...register("noofSample")}  required/>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
   
        <DesktopDatePicker
        className="my-2"
          label="Date"
          sx={{ width: 500 }}
          // inputFormat="YYYY/MM/DD"
          inputFormat="YYYY/MM/DD"
          {...register("date", { required: true })}
          value={selectedDate}
          onChange={handleChange}
          renderInput={(params) => <TextField   sx={{ width: 300 }} {...params}   />}
        /> </LocalizationProvider>
        <br />
        <br />
        </Grid>
        <Grid item xs={12}>
<b> Sample Type  : </b>  <FormControlLabel control={<Checkbox defaultChecked />} label="Blood" value="Blood"  {...register("sampleType")}  />
         <FormControlLabel control={<Checkbox  />} label="Fecal" value="Fecal"{...register("sampleType")} />
         <FormControlLabel control={<Checkbox  />} label="Swab" value="Swab"{...register("sampleType")}  />
         <FormControlLabel control={<Checkbox  />} label="Urine" value="Urine"{...register("sampleType")}  />
        <TextField className="my-2" sx={{ width: 500 }} variant="outlined" id="outlined-basic" label="option" placeholder='Enter other option' />

         <br />
         <br />
<b> Required Analysis  : </b>  <FormControlLabel control={<Checkbox defaultChecked />} label="Bio" value="Bio"{...register("requiredTest")}  />
         <FormControlLabel control={<Checkbox  />} label="Brucella" value="Brucella"{...register("requiredTest")} />
         <FormControlLabel control={<Checkbox  />} label="All Vitamins"  value="All Vitamins"{...register("requiredTest")}/>
         <FormControlLabel control={<Checkbox  />} label="All Parasite" value="All Parasite"{...register("requiredTest")} />
         <FormControlLabel control={<Checkbox  />} label="Hemo" value="Hemo"{...register("requiredTest")} />
         <FormControlLabel control={<Checkbox  />} label="Elisa" value="Elisa"{...register("requiredTest")}  />
         <FormControlLabel control={<Checkbox  />} label="Vitamin B1"  value="Vitamin B1"{...register("requiredTest")} />
         <FormControlLabel control={<Checkbox  />} label="Progeseron" value="Progeseron"{...register("requiredTest")}  />
         <FormControlLabel control={<Checkbox  />} label="Culture" value="Culture"{...register("requiredTest")} />
         <FormControlLabel control={<Checkbox  />} label="Testeerone" value="Testeerone"{...register("requiredTest")} />
         <FormControlLabel control={<Checkbox  />} label="All Parasite" value="All Parasite"{...register("requiredTest")}/>
         {/* <FormControlLabel control={<Checkbox  />} label="All Parasite" /> */}
        <TextField className="my-2" sx={{ width: 500 }} variant="outlined" id="outlined-basic" label="option" placeholder='Enter other option'  />

     
        </Grid>

      </Grid> 
 
        <center> <Button variant="contained" type='submit' className='my-4'  >Submit</Button></center>
      
        </form>
    </Box>
   
      <Box sx={{ height: 900, width: '100%' }}>
      <DataGrid
        onRowClick={(item)=>setUpdate(item.row) }
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

export default Hospitalbrucella