import { Button, Typography, Card, Alert, AlertTitle } from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AdminAuthApi from '../../api/AdminAuthApi';
import AdminPlanApi from '../../api/AdminPlanApi';
import PlanCard from '../../components/admin/card/PlanCard';
import useAdminAuth from '../../customHooks/useAdminAuth';
import { setPlan } from '../../redux/features/planSlice';

const Plan = () => {
    const navigate = useNavigate();
    const authenticate = useAdminAuth();
    const plans = useSelector((state) => state.plan.value);
    const dispatch = useDispatch();

    useEffect(() => {
        const getPlans =  async () => {
            try {
                const res = await AdminPlanApi.getPlans();
                dispatch(setPlan(res));
            } catch(err) {
                console.log(err);
                if(err.status === 401) {
                    navigate("/admin/login");
                }
            }
        }
        
        const initialCsrfToken = async() => {
            await AdminAuthApi.initialCsrfToken().then(() => {
                getPlans();
            })
        }

        initialCsrfToken();
    }, [])

    return (
        <Container sx={{
                marginTop: "20px"
            }}
        >
            <Box sx={{
                    textAlign: "center"
                }}
            >
                <h1>PLAN</h1>
            </Box>
            <Box sx={{
                margin: "20px",
                display: "flex",
                justifyContent: "center"
            }}>
                <Alert
                    severity="info"
                    sx={{
                        width: "400px"
                    }}
                >
                    <AlertTitle>利用プランを選択してください</AlertTitle>
                    <Typography fontSize="0.8rem">
                        選択したプランはいつでも変更できます。
                    </Typography>
                </Alert>
            </Box>
            <Box sx={{
                    display: "flex",
                    flexDirection: {"xs": "column", "sm": "initial"},
                }}
            >
                {plans.map((item,index) => {
                    return (
                        <PlanCard item={item}/>
                    )
                })}
            </Box>
        </Container>
    )
}

export default Plan