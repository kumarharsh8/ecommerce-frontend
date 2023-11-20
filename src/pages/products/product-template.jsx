import React from "react";
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

export const ProductTemplate = (props) => {
    const navigate = useNavigate();
    const { role } = props;
    const { product } = props

    const handleNavigation = (productDetails) => {
        navigate('/productDetails', { state: productDetails });
    }

    return (
        <Card sx={{ maxWidth: 350, minHeight: 450, marginRight: 4, marginLeft: 4, marginTop: 8, float: "left" }}>
            <CardMedia
                sx={{ height: 200 }}
                image={product.imageUrl}
                title="green iguana"
            />
            <CardContent>
                <Typography variant="h6" color="text.secondary" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <Typography variant="h6" style={{ textAlign: 'left' }}>
                            {product.name}
                        </Typography>
                    </div>
                    <div>
                        <Typography variant="h6" style={{ textAlign: 'left' }}>
                            ₹ {product.price}
                        </Typography>
                    </div>
                </Typography>
                <Typography variant="body2" color="text.secondary" style={{ textAlign: 'justify', marginTop: 10 }}>
                    {product.description}
                </Typography>
            </CardContent>
            <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <Button variant="contained" size="small" onClick={() => handleNavigation(product)}>BUY</Button>
                </div>
                {
                    role.toUpperCase === 'ADMIN' ?
                        <div>
                            <ModeEditOutlineIcon size="small" style={{ textAlign: 'left', margin: 5 }} />
                            <DeleteIcon size="small" style={{ textAlign: 'left', margin: 5 }} />
                        </div> : <></>
                }
            </CardActions>
        </Card>
    )
}
