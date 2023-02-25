import React from 'react'
import TextField from '@mui/material/TextField';
import { Button, Grid } from '@mui/material';
import '../App.css'
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
const Login = () => {

  return (
    <div className='container maindive'>
       <h1 className='text-center mt-5 heading'>Login</h1>

       <form >
      <center>  <TextField className="my-3" sx={{width:500}} fullWidth variant="outlined" id="outlined-basic" label="User Name"  required/></center> 
     
      <center> <TextField className="my-3" sx={{width:500}} fullWidth variant="outlined" id="outlined-basic" label="Pasword" required /></center>  
    <br />
    <Link to="/entry">  <center> <Button variant="contained" type='submit'  >Submit</Button></center> </Link>
 <Link to="/signup" >  <center><p className='text-primary text-sm'><small><u> Click Here To Sign-UP</u> </small></p></center></Link> 
     </form>  
   
    </div>
  )
}

export default Login