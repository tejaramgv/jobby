import React,{useState} from 'react';
import { useFormik } from 'formik';
import { Container, Typography, Grid,IconButton, TextField, Button } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';


const EducationForm = ({data, onNext, onPrev }) => {
    const [education,setEducation]=useState({
        "degree":data.degree||"",
        "fieldOfStudy":data.fieldOfStudy||"",
        "institutionName":data.institutionName||"",
        "location":data.location||"",
        "graduationYear":data.graduationYear||"",
        "gpa":data.gpa||"",
        "resume":data.resume|| null

    })
    const changeeducation=(e)=>setEducation({...education,degree:e.target.value})
    const changefield=(e)=>setEducation({...education,fieldOfStudy:e.target.value})
    const changeinstitution=(e)=>setEducation({...education,institutionName:e.target.value})
    const changelocation=(e)=>setEducation({...education,location:e.target.value})
    const changegraduation=(e)=>{
        const value = e.target.value;
        if (/^\d+$/.test(value) || value === '') {
setEducation({...education,graduationYear:value})}}
    const changegpa=(e)=>{
        const value = e.target.value;
       
      
        
        setEducation({...education,gpa:value})}
const filechange=(e)=>{
  const file=e.currentTarget.files[0]
  if(file&& file.type==='application/pdf'){
setEducation({...education,resume:file})
  }
}

   const submit=(e)=>{
    e.preventDefault()
    onNext(education)
   }     
 
  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom style={{padding:"10px",color:"blue"}}>
        Education
      </Typography>
      <form onSubmit={submit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              id="degree"
              name="degree"
              label="Degree/Certificate"
              value={education.degree}
              onChange={changeeducation}
           
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="fieldOfStudy"
              name="fieldOfStudy"
              label="Field of Study/Major"
              value={education.fieldOfStudy}
              onChange={changefield}
           
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              id="institutionName"
              name="institutionName"
              label="Institution Name"
              value={education.institutionName}
              onChange={changeinstitution}
           
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              id="location"
              name="location"
              label="Location"
              value={education.location}
              onChange={changelocation}
              
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="graduationYear"
              name="graduationYear"
              label="Graduation Year"
              value={education.graduationYear}
              onChange={changegraduation}
           
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="gpa"
              name="gpa"
              label="GPA (Grade Point Average)"
              value={education.gpa}
              onChange={changegpa}
             
            />
          </Grid>
          <Grid item xs={12}>
            <label>Add Resume (.pdf format only)</label>
          <IconButton
                      component="label"
                      htmlFor="resumeUpload"
                      aria-label="upload resume"
                      color="primary"
                    >
                      <CloudUpload />
                      <input
                        id="resumeUpload"
                        name="resumeUpload"
                        accept="application/pdf"
                        type="file"
                        style={{ display: 'none' }}
                        onChange={filechange}
                      />
                    </IconButton>
                    {education.resume && (
                      <Typography variant="body2" color="textSecondary">
                        {education.resume.name}
                      </Typography>
                    )}

          </Grid>
         
       
        </Grid>
        <Button style={{margin:"10px 0 0 0"}} variant="outlined" onClick={onPrev}>
          Previous
        </Button>
        <Button
          disabled={education.resume===null}
        style={{margin:"10px 0 0 10px"}} type="submit" variant="contained" color="primary">
          Next
        </Button>
      </form>
    </Container>
  );
};

export default EducationForm;
