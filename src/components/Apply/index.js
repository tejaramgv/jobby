import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PersonalDetailsForm from '../PersonalDetailsForm';
import AddressDetailsForm from '../AddressDetailsForm';
import EducationForm from '../EducationForm';
import Header from '../Header';

import PreviewForm from '../PreviewForm';
import { LinearProgress, Step, StepLabel, Stepper, Typography } from '@mui/material';
import './Apply.css'

const steps = ['Personal Details', 'Address Details', 'Education', 'Preview'];

const Apply = (props) => {
  const {match} = props
  const {params} = match
  const {title} = params
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});

  const handleNext = (data) => {
    console.log(data)
    setFormData({ ...formData, ...data });
    setStep(step + 1);

  };
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    // Implement your form submission logic here
    console.log(formData);
  };

  return (
    <> <Header/>
    <div className="apply-form">
     
      <Stepper activeStep={step} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <LinearProgress variant="determinate" value={(step / (steps.length - 1)) * 100} />
      {/* <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
        {steps[step]}
      </Typography> */}
      {step === 0 && <PersonalDetailsForm data={formData} onNext={handleNext} />}
      {step === 1 && <AddressDetailsForm data={formData}  onNext={handleNext} onPrev={handlePrev} />}
      {step === 2 && <EducationForm data={formData} onNext={handleNext} onPrev={handlePrev} />}
      {step === 3 && <PreviewForm job={title} data={formData} onNext={handleNext}  onPrev={handlePrev} />}
    </div></>
  );
};  

export default Apply;
