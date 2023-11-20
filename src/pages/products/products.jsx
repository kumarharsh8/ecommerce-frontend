import React, { useEffect, useState } from 'react'
import { ProductTemplate } from './product-template'
import { ProductDetails } from './product-details';
import { Container, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../common/role-manager';
import { LOCAL, ENDPOINTS } from '../../common/utils';
import axios from 'axios';
import { styled } from '@mui/system';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)({
    margin: '10px', // Adjust margin as needed
});

export const Products = () => {

    const userRole = useSelector(selectUserRole);
    const [category, setCategory] = useState('all');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isDatasetLoading, setIsDatasetLoading] = useState(true);
    const [products, setProducts] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            let createProductURL = LOCAL.SERVER_PATH + ENDPOINTS.PRODUCTS;
            try {
                const response = await axios.get(createProductURL);
                setProducts(response.data);
                setIsDatasetLoading(false)
            } catch (error) {
                console.debug(error)
                setIsDatasetLoading(false)
            }
        };

        fetchData();
    }, []);

    const handleCategoryChange = (_, newCategory) => {
        if (newCategory !== null) {
            setCategory(newCategory);
            // Perform any additional actions based on the selected category
        }
    };

    const handleViewDetails = (productId) => {
        // Set the selected product when "View Details" is clicked
        setSelectedProduct(productId);
    };

    return (
        <>
            <Container sx={{marginTop: 4}}>
            <StyledToggleButtonGroup
                value={category}
                exclusive
                onChange={handleCategoryChange}
            >
                <ToggleButton value="all">All</ToggleButton>
                <ToggleButton value="apparel">Apparel</ToggleButton>
                <ToggleButton value="electronics">Electronics</ToggleButton>
                <ToggleButton value="personalCare">Personal Care</ToggleButton>
            </StyledToggleButtonGroup>
            </Container>
            {
                isDatasetLoading ? <>Loading</>  : <>
                {
                    products.map(product => {
                        return <ProductTemplate onViewDetails={handleViewDetails} role={userRole} product={product} />
                    })
                }
                </> 
            }

            {selectedProduct && <ProductDetails productId={selectedProduct} role={userRole} />}
        </>
    )
}
