import { Autocomplete, Button, Container, createTheme, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, ThemeProvider } from '@mui/material'
import { Box } from '@mui/system'
import React, { Fragment, useEffect, useState } from 'react'
import Navbar from './Navbar'
import dayjs from 'dayjs';
import moment from 'moment'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import '../App.css'
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom'
import MaterialTable from "material-table";
import { useForm } from 'react-hook-form';

import EditIcon from '@mui/icons-material/Edit';
import { DataGrid } from '@mui/x-data-grid';

import axios from 'axios';
const Entry = () => {
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
        { title: 'Name', field: 'name',  width:150, },
        { title: 'work-order', field: 'workOder',  width:150, },
        { title: 'Sample', field: 'noofSample',  width:100,},
        { title: 'Test', field: 'requiredTest',  width:150,},
        { title: 'Type', field: 'sampleType',},
        { title: 'lab', field: 'lab',  width:150},
        { title: 'Date', field: 'date', valueGetter:(param)=>moment.parseZone(param.value).local().format("DD/MM/YY"),width:200,},
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


      const top100Films = [
        { label: 'The Shawshank Redemption', year: 1994 },
        { label: 'The Godfather', year: 1972 },

      ];

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
        <Navbar/>
        {/* This is Dialog box  */}
        <Container>
          { update &&
    <Dialog open={showDialog} style={{height:600}}>
    <DialogTitle>Update Data</DialogTitle>
    <DialogContent>
    <Grid container>
  <Grid item xs={6}>

  <TextField className="my-2" sx={{width:200}}  variant="outlined" id="outlined-basic" label=" Name"  required name='name' value={update.name} onChange={updateData} />
  <TextField className="my-2" sx={{width:200}}  variant="outlined" id="outlined-basic" label="Work-order" name='workOder' required value={update.workOder} onChange={updateData} />
  <TextField className="my-2" sx={{width:200}}  variant="outlined" id="outlined-basic" label="No of Sample" name='noofSample'  required value={update.noofSample} onChange={updateData} />
  </Grid>
  <Grid item xs={6}>
  <TextField className="my-2" sx={{width:200}}  variant="outlined" id="outlined-basic" label="Required Test"  name='requiredTest' required value={update.requiredTest} onChange={updateData} />
  <TextField className="my-2" sx={{width:200}}  variant="outlined" id="outlined-basic" label="Sample Type"  name='sampleType' required value={update.sampleType} onChange={updateData} />
  <LocalizationProvider dateAdapter={AdapterDayjs}>

  <DesktopDatePicker
  className="my-2"
    label="Date"
    inputFormat="DD/MM/YYYY"
   {...register("date", { required: true })}
    value={update.date}
    onChange={handleChange}
    renderInput={(params) => <TextField   sx={{width:200}}{...params}   />}
  /> </LocalizationProvider>
  </Grid>

</Grid>
<center>
<Autocomplete className="my-2"
disablePortal
id="combo-box-demo"
options={top100Films}
// sx={{ width: 300 }}
fullWidth
renderInput={(params) => <TextField {...params} label="Select Lab" />}
/></center>
    </DialogContent>
    <DialogActions>
      <Button variant='contained' onClick={updateRow}>Update</Button>
      <Button variant='outlined' color='error'
       onClick={()=>{setShowDialog(false)}}>Delete</Button>
    </DialogActions>
    </Dialog>
          }
      
        </Container>
        <h1 className='text-center mt-3 mb-5 heading'>Entry Mode</h1>
     <Box sx={{ flexGrow: 1 }}>
     
     <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} columns={25} 
      alignItems="center"
        justifyContent="center"
         
      >
        <Grid item xs={6}>
   
        <TextField className="my-2" sx={{width:300}}  variant="outlined" id="outlined-basic" label=" Name"  required {...register("name", { required: true })}  onChange={updateData} />
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
          // inputFormat="YYYY/MM/DD"
          inputFormat="DD/MM/YYYY"
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
   
    {/* <ThemeProvider theme={defaultMaterialTheme}>
    <MaterialTable
      title="Lab Details"
      columns={columns}
      data={data}
  
      // key={data.length}
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
      pageSizeOptions:[20,100,500,1000],
        exportButton: true
      }}
    />

 
     </ThemeProvider> */}
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

export default Entry