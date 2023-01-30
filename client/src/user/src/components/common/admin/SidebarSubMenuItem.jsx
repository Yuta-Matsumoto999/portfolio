import React, { useEffect, useState } from 'react'
import { Box, List, ListItemButton, Typography } from '@mui/material';
import { BiCaretRight } from "react-icons/bi";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

const SidebarSubMenuItem = (props) => {
    const dispatch = useDispatch();

    return (
        <ListItemButton sx={{ width: "100%", display: "flex", alignItems: "center", padding: "10px 15px 10px 40px", fontSize: "0.9rem" }} onClick={props.handleSubMenuItem} component={Link} to={props.subMenu.path} data-path={props.subMenu.path}>
            <BiCaretRight />
            <Typography fontWeight="600" fontSize="0.9rem" sx={{ marginLeft: "10px" }}>
                {props.subMenu.name}
            </Typography>
        </ListItemButton>
    )
}

export default SidebarSubMenuItem   