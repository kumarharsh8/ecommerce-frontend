import React, { useState } from 'react'
import { Container, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, Alert, AlertTitle  } from '@mui/material';
import { useForm } from 'react-hook-form';
import { LOCAL, ENDPOINTS } from '../../common/utils';
import { selectUserToken } from '../../common/role-manager';
import { useSelector } from 'react-redux';
import axios from 'axios';
import "../../common/style.css"

export const AddProduct = () => {

    const { register, handleSubmit } = useForm();
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const userToken = useSelector(selectUserToken);

    const onSubmit = (data) => {
        let createProductURL = LOCAL.SERVER_PATH + ENDPOINTS.PRODUCTS;
        axios.post(createProductURL, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+userToken
            },
        }).then(response => {
            setSuccess(true)
            setError(false)
            console.debug(response)
        }).catch(error => {
            setError(true)
            setSuccess(false)
            console.debug(error)
        });
    };

    return (
        <Container maxWidth="xs" style={{ marginTop: '2em' }}>
            { success ? <>
                <Alert severity="success" style={{justifyContent: 'center'}}>
                    <AlertTitle>Successfully saved product.</AlertTitle>
                </Alert>
            </> : <></>}
            <Typography variant="h5" component="h1" gutterBottom>
                Add Product
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField margin="normal" required fullWidth id="name"
                    label="Name" name="name" autoFocus {...register('name')} />
                <FormControl fullWidth>
                    <InputLabel id="category">Category</InputLabel>
                    <Select
                        labelId="category" id="category"
                        label="Select a category" {...register('category')} 
                    >
                        <MenuItem value="">Select...</MenuItem>
                        <MenuItem value="Apparel">Apparel</MenuItem>
                        <MenuItem value="Electronics">Electronics</MenuItem>
                        <MenuItem value="Furniture">Furniture</MenuItem>
                        <MenuItem value="Personal Care">Personal Care</MenuItem>
                    </Select>
                </FormControl>
                <TextField margin="normal" required fullWidth id="manufacturer"
                    label="Manufacturer" name="manufacturer" {...register('manufacturer')} />
                <TextField margin="normal" required fullWidth id="availableItems"
                    label="Available Items" name="availableItems" {...register('availableItems')}/>
                <TextField margin="normal" required fullWidth id="price"
                    label="Price" name="price" {...register('price')}/>
                <TextField margin="normal" required fullWidth id="imageUrl"
                    label="Image URL" name="imageUrl" {...register('imageUrl')}/>
                <TextField margin="normal" required fullWidth id="description"
                    label="Description" name="description" {...register('description')}/>
                <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: '1em' }}>
                    SAVE PRODUCT
                </Button>
            </form>
        </Container>
    )
}
