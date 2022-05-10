import React from 'react'
import Button from '@mui/material/Button';

function CustomButton({text, onClick}) {
    return (
        <Button style={{width:"100%",margin: '20px 0px',}} variant="contained" onClick={onClick}>{text}</Button>
    )
}

export default CustomButton
