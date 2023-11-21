import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Box, Alert, AlertTitle } from '@mui/material';
import { Address } from '../address/address';
import { ConfirmDetails } from './confirm-details';
import { useLocation, useNavigate } from "react-router-dom";

const steps = ['Items', 'Address', 'ConfirmDetails'];

export const Checkout = () => {
    
    const location = useLocation();
    const checkoutDetails = location.state
    const [activeStep, setActiveStep] = useState(1);
    const [address, setAddress] = useState('');
    const [addressSelected, setAddressSelected] = useState(true);

    const handleNext = () => {
        if(activeStep >= 1 && address == null){
            setAddressSelected(false)
            return
        }
        
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const manageAddress = (data) => {
        if(data === '' && activeStep === 1){
            setAddressSelected(false)
        }else{
            setAddressSelected(true)
            setAddress(data);
        }
    }

    let navigate = useNavigate();

    const handleBack = () => {
        if (activeStep === 1)
            navigate(-1);
        else
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const getStepContent = (step) => {
        switch (step) {
            case 1:
                return <Address manageAddress={manageAddress} />;
            case 2:
                var data = {...checkoutDetails, address}
                return <ConfirmDetails state = {data} />;
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
                {
                    !addressSelected ? <>
                        <Alert severity="warning" style={{
                            justifyContent: 'center', margin: 'auto', marginTop: 20, maxWidth: 750
                        }}>
                            <AlertTitle>Please select or add a address before moving to checkout.    </AlertTitle>
                        </Alert>
                    </> : <></>
                }
            </Box>

            <Box>
                {activeStep === steps.length ? (
                    navigate('/', {state: {'purchaseComplete': true, 'message':'Order placed successfully'}})
                ) : (
                <Box>
                    {getStepContent(activeStep)}
                    <Box sx={{ margin: 5 }}>
                        <Button disabled={activeStep === 0} onClick={handleBack}>
                            Back
                        </Button>
                        <Button variant="contained" onClick={() => handleNext('')}>
                            {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
                        </Button>
                    </Box>
                </Box>
          )}
            </Box>
        </div>
    )
}
