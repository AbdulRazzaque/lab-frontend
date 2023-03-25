import {  Button, Checkbox, Container,  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, Grid, TextField } from '@mui/material';
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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import date from 'date-and-time';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useForm } from 'react-hook-form';
import FormGroup from '@mui/material/FormGroup';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid } from '@mui/x-data-grid';

import axios from 'axios';

const Projectbrucella = (props) => {
    // const [value, setValue] = React.useState(dayjs());

    const [selectedDate,setSelectedDate] = React.useState('')
    const [data, setData] = useState([]);
    const [update,setUpdate]=useState([])
    const [showDialog,setShowDialog]=useState(false)
    const [alert,setAlert]=useState(false)
    const [value, setValue] = React.useState();
    const [value1, setValue1] = React.useState('');
    const [workOrderDate,setWorkOrderDate]=React.useState("")
    const [mainDate,setMainDate]=React.useState("")
    const [orderBatch,setOrderBatch]=React.useState("B")
    const [count, setCount] = useState(1);
    const handleChangee = (event) => {
      console.log(value,'value')
      setValue(event.target.value) 
    
     
    };
    const handleChangeee = (event) => {
       
      setValue1(event.target.value);
    }; 
    // Form Submition Code Start Here 
    const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2ZiMDY5ZjJjN2NkYzQwYWI3ZDQ3NDMiLCJpYXQiOjE2NzczOTU2MTUsImV4cCI6MTY3NzQ4MjAxNX0.oyFYN4ItsvjR8Gnspn9P2s3jLvqlkWXRPGDUukeQ_jE"
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();


  const onSubmit= async(data)=>{

    var obj = {
      
      workOder :  `${workOrderDate}-${orderBatch}`,
        sampleType: value ,
       RequiredAnalysis: value1 ,
       date:selectedDate,
       count: count  ,
        ...data,
    }
    console.log(obj,'obj')
    try {
       await axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/addProjectbrucella`,obj,
    {headers:{token:`${accessToken}`}})
    .then(response=>{
      console.log('Response',response)
    })
    // navigate('/entry')
    setData(data)
    } catch (error) {
      console.log(`Error While Calling add api ${error}`)
      
      
    }
    alldata()
  }

 
    const handleChange = (event) => {
    
      setSelectedDate(event.target.value);
      updateData()
    };

      

    
      const [columns, setColumns] = useState([
       
        { title: 'work-order', field: 'workOder',  width:150, },
        { title: 'Name', field: 'name',  width:150, },
        { title: 'Sample', field: 'noofSample',  width:100,},
        { title: 'Date', field: 'date', width:200,renderCell:(param)=>moment.parseZone(param.value).local().format("DD/MM/YY")
      // valueGetter:(param)=>moment.parseZone(param.value).local().format("DD/MM/YY"),width:200,
      },
        { title: 'Type', field: 'sampleType',  width:200},
        { title: 'Test', field: 'RequiredAnalysis',  width:200,},
        {title:"Action" ,
        field:'Action',
        width:150,
        renderCell:()=>(
          <Fragment>
            <Button  onClick={()=>setShowDialog(true)} ><EditIcon/></Button>
           
          </Fragment>
        )
      },
      {title:"Delete" ,
        field:'Delete',
        width:150,
        renderCell:(params)=>(
          <Fragment>
           
           <Button color='error' onClick={()=>deleteRow(params.row)}> <DeleteIcon/></Button>
          </Fragment>
        )
      }

      ]);


     // Here I am Calling All DATA 
    const  alldata =()=>{
      
          axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/itemsProjectbrucella`,
         {headers:{token:`${accessToken}`}})
         .then(response=>{
          

   
          if(response){
            setWorkOrderDate(date.format(new Date(), 'YY-MM'))
            setMainDate(date.format(new Date(), 'DD-MM-YY'))
              
            response.data.map((item)=>{
              setCount(item.count +1)
              setOrderBatch(`B${item.count}` )
            })
            
          }
          
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
        data.map((item)=>
          item._id === update._id?update :item
        )
        console.log(update)
  await  axios.put(`${process.env.REACT_APP_DEVELOPMENT}/api/updateProjectbrucella/${update._id}`,update,
  {headers:{token:`${accessToken}`}})
  .then(response=>{
    console.log('Response',response)
  
  })

  setData([update]);
  setShowDialog(false)
} catch (error) {
  console.log(error)
} alldata()


 
  }


  
  
  const deleteRow = async(rowData)=>{
  try {
    {setAlert(true)}
    await  axios.delete(`${process.env.REACT_APP_DEVELOPMENT}/api/deleteProjectbrucella/${rowData._id}`,update,
    // await  axios.delete(`${process.env.REACT_APP_DEVELOPMENT}/api/deletelab/`,
    {headers:{token:`${accessToken}`}})
    .then(response=>{
      console.log('Response',response)
     alldata()
    })
  }
  catch (error) {
    console.log(error)
    
  }


    console.log("Hello and welcome")
  }

  
  
useEffect(()=>{
  alldata()



 
    

},[])
      
  return (
    <div>
        {/* <Navbar/> */}
        <Navbar/>

        {/* This is Dialog box For update */}
        <Container>

          {
            alert && 
            <Dialog open={alert} style={{height:600}}>
              <DialogTitle>Delete Row</DialogTitle>
              <DialogContent>
              <DialogContentText id="alert-dialog-description">
            Are You sure You want to delete this.
          </DialogContentText>
              </DialogContent>
              <DialogActions>
      <Button variant='contained' onClick={deleteRow}>Yes</Button>
      <Button variant='outlined' color='error'
       onClick={()=>{setAlert(false)}}>Cancel</Button>
    </DialogActions>
            </Dialog>
          }
          { update &&
    <Dialog open={showDialog} style={{height:600}}>
    <DialogTitle>Update Data</DialogTitle>
    <DialogContent>
    <Grid container>
  <Grid item xs={12}>

  <TextField className="my-2" sx={{ width: 500 }}  variant="outlined" id="outlined-basic" label="Work-order" name='workOder' required value={update.workOder} onChange={updateData} />
  <TextField className="my-2" sx={{ width: 500 }}  variant="outlined" id="outlined-basic" label=" Name"  required name='name' value={update.name} onChange={updateData} />
  <TextField className="my-2" sx={{ width: 500 }} variant="outlined" id="outlined-basic" label="No of Sample" name='noofSample'  required value={update.noofSample} onChange={updateData} />


  <LocalizationProvider dateAdapter={AdapterDayjs}
 
  >
   
        <DesktopDatePicker
                  label="Date"
                  inputFormat="dd/MM/yyyy"
                  value={  update.selectedDate } onChange={updateData}
                 
                  renderInput={(params) => <TextField fullWidth {...params} />}/>
         </LocalizationProvider>
  
   <br />
    <br />
    
<b> Sample Type  : </b>
  {/* <FormControl onChange={updateData}  value={update.sampleType}>
 <FormGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
           value={value}
           onChange={handleChangee}
          
        >
        <FormControlLabel name='Blood' value="Blood" control={<Checkbox  />} label="Blood" />
         <FormControlLabel   name='Fecal' value="Fecal" control={<Checkbox  />} label="Fecal" />
         <FormControlLabel   name='Swab'  value="Swab" control={<Checkbox  />} label="Swab" />
         <FormControlLabel   name='Urine' value="Urine" control={<Checkbox  />} label="Urine" />
         
    
        </FormGroup>
    </FormControl> */}
        <TextField className="my-2" name='sampleType'
               
               value={  update.sampleType } onChange={updateData}   sx={{ width: 500 }} 
             variant="outlined" id="outlined-basic" label="option" placeholder='Enter other option'  />
         <br />
         <br />
<b> Required Analysis  : </b> 
         {/* <FormControlLabel control={<Checkbox  />} label="Bio" />
         <FormControlLabel control={<Checkbox  />} label="Brucella" />
         <FormControlLabel control={<Checkbox  />} label="All Vitamins" />
         <FormControlLabel control={<Checkbox  />} label="All Parasite" />
         <FormControlLabel control={<Checkbox  />} label="Hemo" />
         <FormControlLabel control={<Checkbox  />} label="Elisa" />
         <FormControlLabel control={<Checkbox  />} label="Vitamin B1" />
         <FormControlLabel control={<Checkbox  />} label="Progeseron" />
         <FormControlLabel control={<Checkbox  />} label="Culture" />
         <FormControlLabel control={<Checkbox  />} label="Testeerone" />
         <FormControlLabel control={<Checkbox  />} label="All Parasite" /> */}
         {/* <FormControlLabel control={<Checkbox  />} label="All Parasite" /> */}
         
        <TextField  value={  update.requiredTest } onChange={updateData}  className="my-2" sx={{ width: 500 }} variant="outlined" id="outlined-basic" label="option" placeholder='Enter other option'  />
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
        
     <Box sx={{ flexGrow:1}}>
     
     <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={1} columns={30} 
      alignItems="center"
        justifyContent="center"
         
      >
        <Grid item xs={8}>
   
        <TextField className="my-2" sx={{ width: 300 }} onChange={(e)=>setOrderBatch(e.target.value)} value={orderBatch} variant="outlined" id="outlined-basic" label="Work-order"  required/>
        <p>Work Order: <b>{workOrderDate}-{orderBatch}</b></p>
        <TextField className="my-2" sx={{ width: 300 }}  variant="outlined" id="outlined-basic" label=" Name"  required {...register("name", { required: true })}  onChange={updateData} />
        <TextField className="my-2" sx={{ width: 300 }} variant="outlined" id="outlined-basic" type='number' label="No of Sample"{...register("noofSample", { required: true })}  required/>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
   
        <DesktopDatePicker
                  label="Date"
                  inputFormat="dd/MM/yyyy"
                  value={selectedDate}
                  onChange={(newValue) => {
                    console.log(newValue.format("DD/MM/YY"));
                    setSelectedDate(newValue);
                  }}
                  renderInput={(params) => <TextField fullWidth {...params} />}/>
         </LocalizationProvider>
        <br />
        <br />
        </Grid>
        <Grid item xs={12}>

<b> Sample Type  : </b> 
        <FormControl>
        
<FormGroup row
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChangee}
      >
      
           <FormControlLabel value= "Blood"  control={<Checkbox />} label="Blood" />
         <FormControlLabel  value="Fecal" control={<Checkbox  />} label="Fecal" />
         <FormControlLabel  value="Swab"  control={<Checkbox  />} label="Swab" />
         <FormControlLabel  value="Urine" control={<Checkbox  />} label="Urine" />
        <TextField   value={value} className="my-2" sx={{ width: 500 }} variant="outlined" id="outlined-basic"  placeholder='Enter other option'  />

       
      </FormGroup> 
    </FormControl>

         <br />
<b> Required Analysis  : </b><FormControl>
        
      <FormGroup row
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value1}
        onChange={handleChangeee}
        
      >

          <FormControlLabel  value="Bio"  control={<Checkbox />} label="Bio" />
         <FormControlLabel  value="Brucella"  control={<Checkbox  />} label="Brucella" />
         <FormControlLabel  value="All Vitamins"   control={<Checkbox  />} label="All Vitamins" />
         <FormControlLabel  value="All Parasite"  control={<Checkbox  />} label="All Parasite" />
         <FormControlLabel  value="Hemo"   control={<Checkbox  />} label="Hemo" />
         <FormControlLabel  value="Elisa"  control={<Checkbox  />} label="Elisa" />
         <FormControlLabel  value="Vitamin B1"  control={<Checkbox  />} label="Vitamin B1" />
         <FormControlLabel  value="Progeseron"  control={<Checkbox  />} label="Progeseron" />
         <FormControlLabel  value="Culture"  control={<Checkbox  />} label="Culture" />
         <FormControlLabel  value="Testeerone"  control={<Checkbox  />} label="Testeerone" />
         <FormControlLabel  value="All Parasite"  control={<Checkbox  />} label="All Parasite" />
      
        <TextField   value={value1} className="my-2" sx={{ width: 500 }} variant="outlined" id="outlined-basic" label="option" placeholder='Enter other option'  />
        </FormGroup>
    </FormControl>
     
        </Grid>

      </Grid> 
   
     <center> <Button variant="contained" type='submit' className='my-4'  >Submit</Button></center>
      
        </form>
    </Box>
   
      <Box sx={{ height: 900, width: '100%' }}>
      <DataGrid
        onRowClick={(item)=>{setUpdate(item.row) }}
          // onCellClick={(item)=> handleDeleteRow(item.row)}
        rows={data}
        columns={columns}
     
        pageSize={50}
        rowsPerPageOptions={[50]}
       
        // onDelete={(item)=> handleDeleteRow(item.row)}
          // checkboxSelection
     
        // experimentalFeatures={{ newEditingApi: true }}
    
      />
    </Box>
     
    </div>
  )
}

export default Projectbrucella