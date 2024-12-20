import {
  Alert,
  Button,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../../Navbar";
import dayjs from "dayjs";
import date from "date-and-time";
import moment from "moment";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "../../../App.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useNavigate } from "react-router-dom";
import { DataGridPro, useGridApiRef } from "@mui/x-data-grid-pro";
import { useForm } from "react-hook-form";
import UploadFileIcon from "@mui/icons-material/UploadFile";

import EditIcon from "@mui/icons-material/Edit";
import { DataGrid } from "@mui/x-data-grid";
import readXlsxFile from "read-excel-file";
import axios from "axios";
import { DatePicker } from "@mui/x-date-pickers";
const Dna = (props) => {
  const [selectedDate, setSelectedDate] = React.useState(dayjs());
  const [updatedate, setupdatedate] = React.useState(dayjs());
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [alert, setAlert] = useState(false);
  const [value, setValue] = React.useState();
  const [value1, setValue1] = React.useState("");
  const [workOrderDate, setWorkOrderDate] = React.useState("");
  const [mainDate, setMainDate] = React.useState("");
  const [orderBatch, setOrderBatch] = React.useState("M");
  const [count, setCount] = useState(1);
  const [batchArray, setBatchArray] = React.useState();
  const [xldata, setXldata] = React.useState();
  const [excel, setExcel] = React.useState([]);
  const apiRef = useGridApiRef();
  // Form Submition Code Start Here
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2ZiMDY5ZjJjN2NkYzQwYWI3ZDQ3NDMiLCJpYXQiOjE2NzczOTU2MTUsImV4cCI6MTY3NzQ4MjAxNX0.oyFYN4ItsvjR8Gnspn9P2s3jLvqlkWXRPGDUukeQ_jE";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [columns, setColumns] = useState([
    { title: "ID", field: "id", width: 50 },
    {title: "Date",field: "date",width: 150,renderCell: (param) =>moment.parseZone(param.value).local().format("YYYY/MM/DD"),},
    { title: "Name", field: "name", width: 250 },
    { title: "work-order", field: "workOder", width: 150 },
    { title: "Sample", field: "noofSample", width: 150 },
    { title: "Test", field: "RequiredAnalysis", width: 150 },
    { title: "Type", field: "sampleType", width: 100 },
    // { title: "Lab", field: "Lab", width: 100 },
    {
      title: "Action",
      field: "Action",
      width: 100,
      renderCell: () => (
        <Fragment>
          <Button onClick={() => setShowDialog(true)}>
            <EditIcon />
          </Button>
        </Fragment>
      ),
    },
    {
      title: "Delete",
      field: "Delete",
      width: 100,
      renderCell: () => (
        <Fragment>
          <Button color="error" onClick={() => setAlert(true)}>
            <DeleteIcon />
          </Button>
        </Fragment>
      ),
    },
  ]);
       // Here I am Calling All DATA 
       const  alldata =()=>{
  
        axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/itemsDna`,
       {headers:{token:`${accessToken}`}})
       .then(response=>{
        

 
 
        if (response) {
          setWorkOrderDate(date.format(new Date(), "YY-MM"));
          setMainDate(date.format(new Date(), "DD-MM-YY"));
          setCount(parseInt(response.data[0].count) + 1);
          // setOrderBatch(`${response.data[0].count}`)
          let num = response.data[0].workOder;
          let sp = num.split("G-");
          let cp = parseInt(sp[1]) + 1;
          setOrderBatch(`G-${cp}`);
          console.log(cp)
}
        

        let arr = response.data.map((item, index) => ({
          ...item,
          id: index + 1,
        }));
        setData(arr);
      });
  };

  const onSubmit = async (data) => {
    var obj = {
      workOder: `${workOrderDate}-${orderBatch}`,
      sampleType: value,
      RequiredAnalysis: value1,
      date: selectedDate,
      count: count,
      excel,
      ...data,
      ...xldata,
    };
    console.log(obj, "obj");
    try {
       await axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/addDna`,obj,
    {headers:{token:`${accessToken}`}})
    .then(response=>{
      console.log('Response',response)
    })

      setData(data);
    } catch (error) {
      console.log(`Error While Calling add api ${error}`);
    }
    alldata();
  };

      const updateData=(e)=>{
          setUpdate({...update,[e.target.name]:e.target.value})
          console.log(update)
        
      }
     
      const updateRow = async() =>{
        var obj = {
          date:updatedate ,
          ...date,
        } 
    
        const combinedObj = {...update ,...obj};
        console.log(combinedObj)
try {
       
        console.log(update)
  await  axios.put(`${process.env.REACT_APP_DEVELOPMENT}/api/updateDna/${update._id}`,combinedObj,
  {headers:{token:`${accessToken}`}})
  .then(response=>{
    console.log('Response',response)
    apiRef.current.updateRows([update])
  })


  setShowDialog(false)
} catch (error) {
  console.log(error)
} alldata()


 
  }

  const deleteRow = async(update)=>{

   
        try {
   
          await  axios.delete(`${process.env.REACT_APP_DEVELOPMENT}/api/deleteDna/${update._id}`,update,
          // await  axios.delete(`${process.env.REACT_APP_DEVELOPMENT}/api/deletelab/`,
          {headers:{token:`${accessToken}`}})
          .then(response=>{
            console.log('Response',response)
       
           alldata()
          })
          setAlert(false)
        }
        catch (error) {
          console.log(error)
          
        }
  }

  
  const SampletTypechange = (event) => {
    console.log(value, "value");
    setValue(event.target.value);
  };
  const AnalysisTypechange = (event) => {
    console.log(value, "value");
    setValue1(event.target.value);
  };

  const upload = (e) => {
    try {
      console.log("inside upload");
      console.log(e.target.files[0]);
      let array = [];
      readXlsxFile(e.target.files[0]).then((rows) => {
        // console.log(rows)
        // setData(rows)

        rows.map((item, id) => {
          if (id !== 0) {
            let obj = {
              sampleType: item[5],
              RequiredAnalysis: item[4],
              noofSample: item[3],
              date: item[0],
              name: item[1],
              workOder: item[2],
            };
            console.log(item,'item')
            axios
              .post(`${process.env.REACT_APP_DEVELOPMENT}/api/addDna`, obj, {
                headers: { token: `${accessToken}` },
              })
              .then((response) => {
                console.log("Response", response);
                setData(response.data);
                alldata();
              });
              setData(data);
            }
        });

        console.log(array);
        e.target.value = "";
      });
    } catch (error) {
      console.log(error);
    }
  };
 
  const Input = styled("input")({
    display: "none",
  });
  useEffect(() => {
    alldata();
    upload()
  }, []);

  return (
    <div>
      {/* <Navbar/> */}
      <Navbar />

      {/* Thsi Diloag box for Delete Alert  */}
      <Container>
        {alert && (
          <Dialog open={alert} style={{ height: 600 }}>
            <DialogTitle>Delete Row</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are You sure You want to delete this.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" onClick={() => deleteRow(update)}>
                Yes
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  setAlert(false);
                }}
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        )}

        {/* This Dialog box is update  */}
        {update && (
          <Dialog open={showDialog} style={{ height: 600 }}>
            <DialogTitle>Update Data</DialogTitle>
            <DialogContent>
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    className="my-2"
                    sx={{ width: 500 }}
                    variant="outlined"
                    id="outlined-basic"
                    label="Work-order"
                    name="workOder"
                    required
                    value={update.workOder}
                    onChange={updateData}
                  />
                  <TextField
                    className="my-2"
                    sx={{ width: 500 }}
                    variant="outlined"
                    id="outlined-basic"
                    label=" Name"
                    required
                    name="name"
                    value={update.name}
                    onChange={updateData}
                  />
                  <TextField
                    className="my-2"
                    sx={{ width: 500 }}
                    variant="outlined"
                    id="outlined-basic"
                    label="No of Sample"
                    name="noofSample"
                    required
                    value={update.noofSample}
                    onChange={updateData}
                  />

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Basic example"
                      value={updatedate}
                      onChange={(newValue) => {
                        setupdatedate(newValue);
                      }}
                      // onChange={updateData}
                      renderInput={(params) => (
                        <TextField
                          sx={{ width: 500 }}
                          name="date"
                          {...params}
                        />
                      )}
                    />
                  </LocalizationProvider>

                  <br />
                  <br />

                  <b> Sample Type : </b>

                  <TextField
                    className="my-2"
                    name="sampleType"
                    value={update.sampleType}
                    onChange={updateData}
                    sx={{ width: 500 }}
                    variant="outlined"
                    id="outlined-basic"
                    label="option"
                    placeholder="Enter other option"
                  />
                  <br />
                  <br />
                  <b> Required Analysis : </b>

                  <TextField
                    value={update.RequiredAnalysis}
                    onChange={updateData}
                    name="RequiredAnalysis"
                    className="my-2"
                    sx={{ width: 500 }}
                    variant="outlined"
                    id="outlined-basic"
                    label="option"
                    placeholder="Enter other option"
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button type="submit" variant="contained" onClick={updateRow}>
                Update
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  setShowDialog(false);
                }}
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        )}

        <div className="previos">
          <Link to="/Dnadetails">
            {" "}
            <p className="text-right"> previous details</p>
          </Link>
        </div>
      </Container>
      <h1 className="text-center my-3 mb-5 heading">DNA Lab </h1>

      <Box sx={{ flexGrow: 1 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            spacing={1}
            columns={30}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={8}>
              <TextField
                className="my-2"
                sx={{ width: 300 }}
                onChange={(e) => setOrderBatch(e.target.value)}
                value={orderBatch}
                variant="outlined"
                id="outlined-basic"
                required
              />
              <p>
                Work Order:{" "}
                <b>
                  {workOrderDate}-{orderBatch}
                </b>
              </p>
              <TextField
                className="my-2"
                sx={{ width: 300 }}
                variant="outlined"
                id="outlined-basic"
                label=" Name"
                {...register("name")}
                required
              />
              <TextField
                className="my-2"
                sx={{ width: 300 }}
                variant="outlined"
                id="outlined-basic"
                type="number"
                label="No of Sample"
                {...register("noofSample")}
                required
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Basic example"
                  value={selectedDate}
                  onChange={(newValue) => {
                    setSelectedDate(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField sx={{ width: 300 }} {...params} />
                  )}
                />
              </LocalizationProvider>
              <br />
              <br />
            </Grid>
            <Grid item xs={12}>
              <b> Sample Type : </b>
              <FormControl>
                <FormGroup
                  row
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={value}
                  onChange={SampletTypechange}
                >
                  <FormControlLabel
                    value="Blood"
                    control={<Checkbox />}
                    label="Blood"
                  />
                  <FormControlLabel
                    value="Fecal"
                    control={<Checkbox />}
                    label="Fecal"
                  />
                  <FormControlLabel
                    value="Swab"
                    control={<Checkbox />}
                    label="Swab"
                  />
                  <FormControlLabel
                    value="Urine"
                    control={<Checkbox />}
                    label="Urine"
                  />
                  <TextField
                    value={value}
                    className="my-2"
                    sx={{ width: 500 }}
                    variant="outlined"
                    id="outlined-basic"
                    placeholder="Enter other option"
                  />
                </FormGroup>
              </FormControl>
              <br />
              <br />
              <b> Required Analysis : </b>

              <FormControl>
                <FormGroup
                  row
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={value1}
                  onChange={AnalysisTypechange}
                >
                  <FormControlLabel
                    value="Bio"
                    control={<Checkbox />}
                    label="Bio"
                  />
                  <FormControlLabel
                    value="Brucella"
                    control={<Checkbox />}
                    label="Brucella"
                  />
                  <FormControlLabel
                    value="All Vitamins"
                    control={<Checkbox />}
                    label="All Vitamins"
                  />
                  <FormControlLabel
                    value="All Parasite"
                    control={<Checkbox />}
                    label="All Parasite"
                  />
                  <FormControlLabel
                    value="Hemo"
                    control={<Checkbox />}
                    label="Hemo"
                  />
                  <FormControlLabel
                    value="Elisa"
                    control={<Checkbox />}
                    label="Elisa"
                  />
                  <FormControlLabel
                    value="Vitamin B1"
                    control={<Checkbox />}
                    label="Vitamin B1"
                  />
                  <FormControlLabel
                    value="Progesteron"
                    control={<Checkbox />}
                    label="Progesteron"
                  />
                  <FormControlLabel
                    value="Culture"
                    control={<Checkbox />}
                    label="Culture"
                  />
                  <FormControlLabel
                    value="Testesterone"
                    control={<Checkbox />}
                    label="Testesterone"
                  />
                  <FormControlLabel
                    value="DNA"
                    control={<Checkbox />}
                    label="DNA"
                  />

                  <TextField
                    value={value1}
                    className="my-2"
                    sx={{ width: 500 }}
                    variant="outlined"
                    id="outlined-basic"
                    placeholder="Enter other option"
                  />
                </FormGroup>
              </FormControl>
            </Grid>
          </Grid>

          <center>
            {" "}
            <Button variant="contained" type="submit" className="my-4">
              Submit
            </Button>
          </center>
          {/* <center>   <Button variant="contained" className='my-4' endIcon={<UploadFileIcon />}>upload</Button></center>   */}
          <center>
            <label htmlFor="contained-button-file">
              <Input
                onChange={upload}
                accept=".xlsx,.xls,.csv"
                id="contained-button-file"
                type="file"
              />
              <Button
                variant="contained"
                component="span"
                className="my-4"
                endIcon={<UploadFileIcon />}
                type="submit"
              >
                Upload Excel
              </Button>
            </label>
          </center>
        </form>
      </Box>

      <Box sx={{ height: 900, width: "100%" }}>
        <DataGridPro
          onRowClick={(item) => setUpdate(item.row)}
          rows={data}
          columns={columns}
          pageSize={50}
          rowsPerPageOptions={[50]}
          // checkboxSelection
          apiRef={apiRef}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </div>
  );
};

export default Dna