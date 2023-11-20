import React, { useEffect, useState, useRef } from 'react';
import { Box, Typography, TextField, Button, Alert, AlertTitle } from '@mui/material'
import { useForm } from 'react-hook-form';
import { LOCAL, ENDPOINTS } from '../../common/utils';
import axios from 'axios';
import { selectUserId, selectUserToken } from '../../common/role-manager';
import { useSelector } from 'react-redux';

export const Address = ({ onNext }) => {
    const userId = useSelector(selectUserId);
    const userToken = useSelector(selectUserToken);
    const { register, handleSubmit } = useForm();
    const [address, setAddress] = useState(null);
    const [isDatasetLoading, setIsDatasetLoading] = useState(true);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const selectedAddressReference = useRef('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [success, setSuccess] = useState(false);

    const onSubmit = (data) => {
        let saveAddressURL = LOCAL.SERVER_PATH + ENDPOINTS.ADDRESS;
        let addressDetails = {
            ...data,
            user: userId
        }
        console.debug(addressDetails)
        axios.post(saveAddressURL, JSON.stringify(addressDetails), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userToken
            },
        }).then(response => {
            setError(false)
            setSuccess(true)
            setSelectedAddress(response.data)
        }).catch(error => {
            setError(true)
            setSuccess(false)
            setErrorMessage(error.data)
            console.debug(error)
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            let getAddreddURL = LOCAL.SERVER_PATH + ENDPOINTS.ADDRESS;
            axios.get(getAddreddURL, {
                headers: { 
                    'Authorization': 'Bearer ' + userToken,
                },
            }).then(response => {
                    setAddress(response.data);
                    setIsDatasetLoading(false)
            }).catch(error => {
                    console.debug(error)
                    setIsDatasetLoading(false)
            });
        };

        fetchData();
    }, []);

    const handleAddressSelection = () => {
        const dropdownSelectedAddress = selectedAddressReference.current.value;
        setSelectedAddress(selectedAddress ?? dropdownSelectedAddress)
        onNext(selectedAddress)
    }

    return (
        <Box sx={{ maxWidth: '80%', margin: 'auto' }}>
            <Box>
                { error ? <>
                    <Alert severity="warning" style={{justifyContent: 'center'}}>
                        <AlertTitle>{errorMessage}</AlertTitle>
                    </Alert>
                </> : <></>}
                { success ? <>
                    <Alert severity="success" style={{justifyContent: 'center'}}>
                        <AlertTitle>Successfully saved the address.</AlertTitle>
                    </Alert>
                </> : <></>}
            </Box>
            <div class="form-group">
                <label htmlFor="addressDropdown" style={{ marginLeft: '5px', display: 'block' }}>Select Address</label>
                <select id="addressDropdown" className="form-control" ref={selectedAddressReference} onChange={handleAddressSelection}>
                    <option value="">Select...</option>
                    {
                        isDatasetLoading ? <>Loading</>  : <>
                        {
                            address.map(address => {
                                return <option value={address.id}>
                                            {address.city} - {address.street}
                                        </option>
                            })
                        }
                        </> 
                    }
                </select>
            </div>
            <Typography style={{ margin: '1em' }}>
                -OR-
            </Typography>
            <Typography variant='h6'>
                Add Address
            </Typography>
            <Box sx={{ maxWidth: '60%', margin: 'auto' }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField margin="normal" required fullWidth id="name"
                        label="Name" name="name" {...register('name')} />
                    <TextField margin="normal" required fullWidth id="contactNumber"
                        label="Contact Number" name="contactNumber" {...register('contactNumber')} />
                    <TextField margin="normal" required fullWidth id="street"
                        label="Street" name="street" {...register('street')} />
                    <TextField margin="normal" required fullWidth id="city"
                        label="City" name="city" autoComplete="city" {...register('city')} />
                    <TextField margin="normal" required fullWidth id="state"
                        name="state" label="State" {...register('state')} />
                    <TextField margin="normal" fullWidth id="landmark"
                        name="landmark" label="Landmark" {...register('landmark')} />
                    <TextField margin="normal" required fullWidth id="zipcode"
                        name="zipcode" label="Zip Code" {...register('zipcode')} />
                    <Button type="submit" variant="contained" style={{ width: '100%', marginTop: '1em' }}>Save Address</Button>
                </form>
            </Box>
        </Box>
    )
}
