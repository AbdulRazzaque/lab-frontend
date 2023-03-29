
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import '../../App.css'

import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
const Signup = () => {
 
  const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2ZiMDY5ZjJjN2NkYzQwYWI3ZDQ3NDMiLCJpYXQiOjE2NzczOTU2MTUsImV4cCI6MTY3NzQ4MjAxNX0.oyFYN4ItsvjR8Gnspn9P2s3jLvqlkWXRPGDUukeQ_jE"
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const onSubmit= async(data)=>{
    try { 
       await axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/register`,data,
    {headers:{token:`${accessToken}`}})
    .then(response=>{
      console.log('Response',response)
    })
    navigate('/Hospitalbrucella')
    } catch (error) {
      console.log(`Error While Calling Signup api ${error}`)
      
      
    }
  }
  return (
    <div className='container'>
    <h1 className='text-center mt-5 heading'>Signup</h1>

    <form onSubmit={handleSubmit(onSubmit)}>
   <center>  <TextField className="my-3" sx={{width:500}} fullWidth variant="outlined" id="outlined-basic" label="User Name"  required {...register("email", { required: true })} /></center> 
  
   <center> <TextField className="my-3" sx={{width:500}} fullWidth variant="outlined" id="outlined-basic" label="Pasword" required {...register("password", { required: true })} /></center>  
 <br />
  <center> <Button variant="contained" type='submit'  >Submit</Button></center> 
  </form>  

 </div>
  )
}

export default Signup