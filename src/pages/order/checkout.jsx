import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Box } from '@mui/material';
import { Address } from '../address/address';
import { ConfirmDetails } from './confirm-details';
import { useNavigate, useLocation } from "react-router-dom";

const steps = ['Items', 'Address', 'ConfirmDetails'];

export const Checkout = () => {
    
    const location = useLocation();
    const details = location.state
    const [activeStep, setActiveStep] = useState(1);
    const [addressDetails, setAddreddDetails] = useState(null);

    const handleNext = (data) => {
        console.debug('data:', data)
        setAddreddDetails(data);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    let navigate = useNavigate();

    const handleBack = () => {
        console.debug('activeStep: ', activeStep)
        if (activeStep === 1)
            navigate(-1);
        else
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const getStepContent = (step) => {
        switch (step) {
            case 1:
                return <Address onNext={handleNext} />;
            case 2:
                let checkoutDetails = {
                    ...details,
                    'address': addressDetails
                }
                console.debug(checkoutDetails)
                return <ConfirmDetails data={checkoutDetails}/>;
            default:
                return '';
        }
    };

    return (
        <div style={{ marginRight: 'auto', marginLeft: 'auto', marginTop: '3em', marginBottom: '3em', maxWidth: '80%' }}>
            <Stepper activeStep={activeStep} alternativeLabel style={{ backgroundColor: 'white', paddingTop: '2em', paddingBottom: '0.5em', marginBottom: '1em', borderRadius: '2px' }}>
                {steps.map((label, index) => (
                    <Step key={index}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <Box>
                {activeStep === steps.length ? (
                    navigate('/home?success=true')
                ) : (
                <Box>
                    {getStepContent(activeStep)}
                    <Box sx={{ margin: 5 }}>
                        <Button disabled={activeStep === 0} onClick={handleBack}>
                            Back
                        </Button>
                        <Button variant="contained" onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
                        </Button>
                    </Box>
                </Box>
          )}
            </Box>
        </div>
    )
}
