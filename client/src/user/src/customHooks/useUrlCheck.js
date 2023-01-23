import React, { useLayoutEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import authApi from '../api/AdminAuthApi';

const useUrlCheck = async () => {
    const navigate = useNavigate();

    useLayoutEffect(() => {
        const checkUrl =  async () => {
            const queryParams = window.location.pathname;
            const organization_unique_key = queryParams.split("/")[3];
    
            try {
                const checkUrl = await authApi.checkUrl({ organization_unique_key });
    
                if(checkUrl === false) {
                    // ここに not found ページへのリダイレクト処理
                    console.log('fail');
                }
            } catch(err) {
                if(err.status === 401) {
                    navigate('/admin/login');
                } 
            }
        }
    
        const initialCsrfToken = async() => {
            await authApi.initialCsrfToken().then(() => {
                checkUrl();
            })
        }

        initialCsrfToken();
    })
}

export default useUrlCheck