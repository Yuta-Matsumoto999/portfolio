import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import authApi from '../api/AdminAuthApi';

const useUrlCheck = () => {
    const navigate = useNavigate();
    const [check, setCheck] = useState();
    const user = useSelector((state) => state.admin.value);

    useEffect(() => {        
        const checkUrl =  async () => {
            const queryParams = window.location.pathname;
            const organization_unique_key = queryParams.split("/")[3];
    
            try {
                const urlCheck = await authApi.checkUrl({ organization_unique_key });

                setCheck(urlCheck);
            } catch(err) {
                if(err.status === 401) {
                    navigate('/admin/login');
                } 
            }
        }
    
        const initialCsrfToken = async () => {
            await authApi.initialCsrfToken().then(() => {
                checkUrl();
            })
        }

        initialCsrfToken();
    }, []);

    return check;
}

export default useUrlCheck