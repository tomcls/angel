import React from 'react'
import Button from '@mui/material/Button';

function CustomButton({text}) {
    return (
        <Button style={{width:"100%",margin: '20px 0px',}} variant="contained">{text}</Button>

    )
}

export default CustomButton
