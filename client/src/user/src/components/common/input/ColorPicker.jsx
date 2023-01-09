import React from 'react'
import styled, { useTheme } from 'styled-components';
import { Button, Box, TextField, Typography } from '@mui/material';
import { BiCaretDown } from "react-icons/bi";

const ColorInput = styled.input`
    position: absolute;
    left: 0;
    opacity: 0;
    width: 300px;
    @media screen and (max-width: 600px) {
        width: 260px;
    }
`

const ColorPicker = (props) => {
    return (
        <>
            <Typography marginTop="15px" fontWeight="600" fontSize="0.8rem">color選択</Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: {"xs": "260px", "sm": "300px"}, position: "relative", padding: "10px 5px", marginTop: "10px", border: props.validateErr !== "" ? "1px solid #d32f2f" : "1px solid #a8a8a8", borderRadius: "4px" }}>
                <Box sx={{ borderRadius: "50%", width: "30px", height: "30px", backgroundColor: props.colorCode }}/>
                <Typography>{props.colorCode}</Typography>
                <BiCaretDown />
                <ColorInput type="color" onChange={props.onChange}/>
            </Box>
            <Typography fontSize="0.8rem" color="#d32f2f">{props.validateErr}</Typography>
        </>
    )
}

export default ColorPicker