import React, { useLayoutEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from 'react-router-dom';
import authApi from '../api/AdminAuthApi';
import { setAdmin } from '../redux/features/adminSlice';

const useAdminAuth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const [result, setResult] = useState();

    useLayoutEffect(() => {
        const accessCheckAuth = async () => {
            try {
                const user = await authApi.authenticateCheck();
                dispatch(setAdmin(user));

                setResult(true);

            } catch {
                setResult(false);
            }
        }

        const initialCsrfToken = async() => {
            await authApi.initialCsrfToken().then(() => {
                accessCheckAuth();
            })
        }

        initialCsrfToken();
        
    }, [navigate])

    return result;
}

export default useAdminAuth