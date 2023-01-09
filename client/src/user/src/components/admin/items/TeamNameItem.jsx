import React from 'react'
import { Box, Button, Typography } from '@mui/material'

const TeamNameItem = (props) => {
    return (
        <>                                
            <Box key={props.key} sx={{ padding: "10px 20px", backgroundColor: props.onClick === props.team.id && props.team.color_code }}>
                <Typography fontWeight="600" sx={{ opacity: props.onClick === props.team.id ? 1 : 0.4 }}>{props.team.name}</Typography>
            </Box>
        </>
    )
}

export default TeamNameItem