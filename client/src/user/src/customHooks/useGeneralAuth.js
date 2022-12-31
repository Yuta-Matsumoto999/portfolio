import React, { useLayoutEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from 'react-router-dom';
import authApi from '../api/GeneralAuthApi';
import { setGeneral } from '../redux/features/generalSlice';

const useGeneralAuth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const [result, setResult] = useState();

    useLayoutEffect(() => {
        const checkAuth = async () => {
            try {
                const user = await authApi.authenticateCheck();
                dispatch(setGeneral(user));

                setResult(true);

            } catch {
                setResult(false);
            }
        }
        checkAuth();
    })

    return result;
}

export default useGeneralAuth