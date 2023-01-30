import React, { useState,useEffect, useLayoutEffect, useRef } from 'react'
import { Avatar, Box, List, ListItemButton, Typography } from '@mui/material';
import { Link, useLoaderData, useLocation, useNavigate, useParams, NavLink } from 'react-router-dom';
import { BiCategory, BiSpreadsheet, BiPaste, BiGrid, BiPlayCircle, BiBookBookmark, BiChat, BiCog, BiLogOut, BiCaretRight } from "react-icons/bi";
import { styled } from '@mui/material/styles';
import { setSidebar } from '../../../redux/features/sidebarSlice';
import { useDispatch, useSelector } from "react-redux";
import SidebarSubMenuItem from './SidebarSubMenuItem';
import useUrl from '../../../customHooks/useUrl';

const CustomListItemButton = styled(ListItemButton)({
    width: "100%",
    display: "flex", 
    alignItems: "center",
    padding: "18px 15px", 
    fontSize: "0.9rem",
    opacity: 0.3,
    "&:hover": {
        backgroundColor: "#44448c",
        opacity: 1,
    },
    "&:focus" :{
        backgroundColor: "#44448c",
        opacity: 1,
    },
})

const CustomListItemButtonMobileOnly = styled(ListItemButton) ({
    width: "100%", 
    alignItems: "center", 
    padding: "18px 15px", 
    fontSize: "0.9rem", 
    opacity: "0.3",
    "&:hover": {
        backgroundColor: "#44448c",
        opacity: 1
    },
    "&:focus" :{
        backgroundColor: "#44448c",
        opacity: 1
    },
})

const SidebarItem = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.admin.value);

    const path = useUrl();
    const [open, setOpen] = useState(false);
    // const [elementLeft, setElementLeft] = useState();
    // const [elementTop, setElementTop] = useState();
    // const [elementBottom, setElementBottom] = useState();
    // const dropdownListRef = useRef(null);

    const handleSubMenuItem = () => {
        dispatch(setSidebar(false));
    }

    const handleSidebarItem = () => {
        setOpen(!open);
    }

    const Icon = props.icon

    return (
        <>
            {props.item.mobileOnly === false &&
                <CustomListItemButton sx={{ backgroundColor: path === props.item.judgementActive ? "#44448c" : undefined, opacity: path === props.item.judgementActive ? 1 : undefined , position: "relative", borderLeft: path === props.item.judgementActive ? "4px solid #6E6EF8" :"none" }} component={props.item.path ? Link : undefined} to={props.item.path} data-path={props.item.path} onClick={props.item.child ? handleSidebarItem : handleSubMenuItem}>
                    <Icon>
                        {props.item.icon}
                    </Icon>
                    <Typography fontWeight="600" fontSize="1rem" sx={{ marginLeft: "10px" }}>
                        {props.item.name}
                    </Typography>

                </CustomListItemButton>
            }
            {props.item.mobileOnly === true &&
                <CustomListItemButtonMobileOnly sx={{ display: {"xs": "flex", "sm": "none"}, backgroundColor: path === props.item.judgementActive ? "#44448c" : undefined, opacity: path === props.item.judgementActive ? 1 : undefined, position: "relative" }} component={props.item.path ? Link : undefined} to={props.item.path} data-path={props.item.path} onClick={props.item.child ? handleSidebarItem : handleSubMenuItem}>
                    {props.item.type === "auth" &&
                        <>
                            <Avatar sx={{ height: {"xs": "2.8vh", "sm": "3vh"}, width: {"xs": "2.8vh", "sm": "3vh"} }} alt={user.name} src="" />
                            <Typography fontWeight="600" fontSize="1rem" sx={{ marginLeft: "10px", display: {'xs': "block", 'sm': 'none', 'md': "block"} }}>
                                {user.name}
                            </Typography>
                        </>
                    }
                </CustomListItemButtonMobileOnly>
            }

            {props.item.child !== null &&
                    open &&
                    <Box sx={{ backgroundColor: "#44448c", position: "relative" }}>
                        {props.item.child.map((subMenu, index) => {
                            return (
                                <SidebarSubMenuItem subMenu={subMenu} handleSubMenuItem={handleSubMenuItem} path={path} key={subMenu.id} />
                            )
                        })}
                    </Box>
            }
        </>
    )
}

export default SidebarItem