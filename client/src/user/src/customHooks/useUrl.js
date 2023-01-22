import React, { useLayoutEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const useUrl = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [bundlePath, setBundlePath] = useState("");

    useLayoutEffect(() => {
        const getBundlePath = () => {
            const path = location.pathname.split("/");
            const firstRoutePath = path[3];
            
            setBundlePath(firstRoutePath);
        }
        getBundlePath()
    })

    return bundlePath;
}

export default useUrl