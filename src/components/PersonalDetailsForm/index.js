import React,{useState} from 'react';
import { useFormik } from 'formik';
import { Container, Typography, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem, InputAdornment } from '@mui/material';
// import { makeStyles } from '@mui/styles';
import PhoneInput from 'react-phone-input-2';

import 'react-phone-input-2/lib/style.css';
import './index.css'


const PersonalDetailsForm = ({ data,onNext }) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}(?:\.[^\s@]+)?$/;
    const [isValidEmail, setIsValidEmail] = useState(null);
    const [isValidphone, setIsValidPhone] = useState(null);
 const [personal,setPersonal]=useState({"FirstName":data.FirstName ||"",
"LastName":data.LastName || "",
"MiddleName":data.MiddleName || "",
"Email": data.Email ||"",
"PhoneNo":data.PhoneNo||""
})
const firstname=(e)=>setPersonal({...personal,FirstName:e.target.value})
const middlename=(e)=>setPersonal({...personal,MiddleName:e.target.value})
const lastname=(e)=>setPersonal({...personal,LastName:e.target.value})
const email=(e)=>{setPersonal({...personal,Email:e.target.value})
setIsValidEmail(emailRegex.test(personal.Email));
}
const phone=(value,country)=>{
    if(value.length!==country.dialCode.length+10){
setIsValidPhone(false)
    }
    else{
        setIsValidPhone(null)
setPersonal({...personal,PhoneNo:value})

}
}


const submit=(e)=>{
    e.preventDefault(); 
  if(isValidphone===false || isValidEmail===false){
    return;
  }
    onNext(personal)
}


  return (
    <>
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom style={{padding:"10px",color:"blue"}}>
        Personal Details
      </Typography>
      <form onSubmit={submit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="firstName"
              name="firstName"
              label="First Name"
              value={personal.FirstName}
              onChange={firstname}
              required
             
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="middleName"
              name="middleName"
              label="Middle Name"
              value={personal.MiddleName}
              onChange={middlename}
              required
             
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              id="lastName"
              name="lastName"
              label="Last Name"
              value={personal.LastName}
              required
             onChange={lastname}
            //   error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            //   helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={personal.Email}
              onChange={email}
              onKeyUp={email}
              required
              
            //   error={formik.touched.email && Boolean(formik.errors.email)}
            //   helperText={formik.touched.email && formik.errors.email}
            />
             {isValidEmail===false && <span className="validemail" style={{ color: 'red' }}>Please enter a valid email address.</span>}
          </Grid>

          {/* Similar TextField components for lastName, middleName, email */}
         
          <Grid item xs={12} sm={12}>
<label>Mobile Number</label>
            <PhoneInput fullWidth
             inputComponent={TextField} 
              country={'in'} // Default country
              value={personal.PhoneNo}
            required
              onChange={phone}
            />
          {isValidphone===false && <span className="validemail" style={{ color: 'red' }}>Please enter a valid mobile number.</span>}
          </Grid>
        </Grid>
        <Button className="personal-button" type="submit" variant="contained" color="primary">
          Next
        </Button>
      </form>
    </Container></>
  );
};

export default PersonalDetailsForm;
