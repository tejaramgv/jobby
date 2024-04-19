// import React from 'react';
// import { useFormik } from 'formik';
// import { Container, Typography, Grid, TextField, Button } from '@mui/material';

// const AddressDetailsForm = ({ onNext, onPrev }) => {
//   const formik = useFormik({
//     initialValues: {
//       state: '',
//       district: '',
//       address: '',
//       pincode: '',
//     },
//     validate: (values) => {
//       const errors = {};
//       if (!values.state) {
//         errors.state = 'Required';
//       }
//       if (!values.district) {
//         errors.district = 'Required';
//       }
//       if (!values.address) {
//         errors.address = 'Required';
//       }
//       if (!values.pincode) {
//         errors.pincode = 'Required';
//       }
//       return errors;
//     },
//     onSubmit: (values) => {
//       onNext(values);
//     },
//   });

//   return (
//     <Container maxWidth="sm">
//       <Typography variant="h5" gutterBottom>
//         Address Details
//       </Typography>
//       <form onSubmit={formik.handleSubmit}>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               id="state"
//               name="state"
//               label="State"
//               value={formik.values.state}
//               onChange={formik.handleChange}
//               error={formik.touched.state && Boolean(formik.errors.state)}
//               helperText={formik.touched.state && formik.errors.state}
//             />
//           </Grid>
//           {/* Similar TextField components for district, address, pincode */}
//         </Grid>
//         <Button variant="outlined" onClick={onPrev}>
//           Previous
//         </Button>
//         <Button type="submit" variant="contained" color="primary">
//           Next
//         </Button>
//       </form>
//     </Container>
//   );
// };

// export default AddressDetailsForm;


import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import "./index.css";

const AddressDetailsForm = ({data, onNext, onPrev }) => {
  const [countries, setCountries] = useState([]);
  const [Address,setAddress]=useState({
    "selectedCountry":data.selectedCountry||"",
    "state":data.state||"",
    "city":data.city||"",
    "pincode":data.pincode||"",
    "address":data.address||""
  })

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => {
        const sortedCountries = data
          .map((country) => ({
            alpha3Code: country.cca3,
            name: country.name.common,
          }))
          .sort((a, b) => a.name.localeCompare(b.name)); // Sort countries alphabetically
        setCountries(sortedCountries);
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
      });
  }, []);

  const handleCountryChange = (e) => {
    setAddress({...Address,selectedCountry:e.target.value})
  };
  const handlePincodeChange = (event) => {
    const value = event.target.value;
    if (/^\d+$/.test(value) || value === '') {
      setAddress({...Address,pincode:value})
    }}

  const handleSubmit = (event) => {
    event.preventDefault();
  
    onNext(Address);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom style={{padding:"10px",color:"blue"}}>
        Address Details
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="countryLabel">Country</InputLabel>
              <Select
                labelId="countryLabel"
                id="country"
                required
                name="country"
                value={Address.selectedCountry}
                onChange={handleCountryChange}
              >
                {countries.map((country) => (
                  <MenuItem key={country.alpha3Code} value={country.alpha3Code}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="state"
              name="state"
              required
              label="State"
              value={Address.state}
              onChange={(e) => setAddress({...Address,state:e.target.value})}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="city"
              name="city"
              required
              label="City"
              value={Address.city}
              onChange={(e) => setAddress({...Address,city:e.target.value})}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="pincode"
              name="pincode"
              required
              label="Pincode"
              value={Address.pincode}
              onChange={handlePincodeChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="Address Line 1"
              name="Address"
              value={Address.address}
              required
              label="Address"
              onChange={(e) => setAddress({...Address,address:e.target.value})}
            />
          </Grid>
        </Grid>
        <Button className="address-button" variant="outlined" onClick={onPrev}>
          Previous
        </Button>
        <Button className="address-button" type="submit" variant="contained" color="primary">
          Next
        </Button>
      </form>
    </Container>
  );
};

export default AddressDetailsForm;
