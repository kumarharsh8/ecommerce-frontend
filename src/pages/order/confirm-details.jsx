import { Box, Container, Typography } from '@mui/material'
import React from 'react'

export const ConfirmDetails = () => {
    return (
        <Container sx={{ display: 'flex', marginTop: '2em', backgroundColor: 'white' }}>
            <Box style={{ flex: 1.8, overflow: 'hidden', position: 'relative', textAlign: 'justify', marginRight: 20, marginTop: 30 }}>
                <Typography style={{ marginBottom: 10 }}>
                    <span style={{ fontWeight: 'bold', fontSize: 30, marginRight: 10 }}>Nike Revolution 6</span>
                </Typography>
                <Typography style={{ marginBottom: 20 }}>
                    <span>Catagory: <span style={{ fontWeight: 'bold' }}>Footwear</span></span>
                </Typography>
                <Typography variant='body1' style={{ marginBottom: 20 }}>
                    Here's to new beginnings between you and the pavement. Lace up the 100% recycled laces and set the pace at the start of your running journey with the plush feel of the Nike Revolution 6.
                </Typography>
                <Typography variant='h5' style={{ marginBottom: 20, color: 'red' }}>
                    Total Price: ₹ 3137.00
                </Typography>
            </Box>
            <Box style={{ flex: 1, textAlign: 'justify', display: 'grid', borderLeft: '3px solid whitesmoke' }}>
                <Typography style={{ marginTop: 30, marginLeft: 10 }}>
                    <span style={{ fontWeight: 'bold', fontSize: 30, marginLeft: 20 }}>Address Details:</span>
                </Typography>
                <Typography style={{marginLeft: 20 }}>
                    302, Shree Kalash Chs,<br />
                    Sector 19, Plot No 10<br />
                    Kamothe, Navi Mumbai<br />
                    410209
                </Typography>
            </Box>
        </Container>
    )
}
