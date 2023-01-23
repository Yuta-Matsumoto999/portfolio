import { LoadingButton } from '@mui/lab';
import { Button, Typography, Card, Alert, AlertTitle } from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { useState, useEffect} from 'react'
import AdminAuthApi from '../../../api/AdminAuthApi';
import AdminPlanApi from '../../../api/AdminPlanApi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PlanCard = (props) => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.admin.value);
    const [loading, setLoading] = useState(false);

    const handlePlanSubmit = async (e) => {
        e.preventDefault();

        const accessPlanApi = async () => {
            const organizationId = user.organizationId;
            const planId = props.item.id;
            
            try {
                const res = await AdminPlanApi.attachPlan({ organizationId, planId });
                navigate(`/admin/manage/${res}`);
            } catch (err) {
                if(err.status === 401) {
                    navigate("/admin/login");
                }
            }
        }

        await AdminAuthApi.initialCsrfToken().then(() => {
            accessPlanApi();
        })
    }

    return (
        <Card 
            key={props.item.id}
            sx={{
                width: {"xs": "100%", "sm": "50%", "md": "50%"},
                padding: "10px",
                margin: {"xs": "20px 0", sm: "20px 10px"},
                borderRadius: "8px"
            }}
            component="form"
            noValidate
            onSubmit={handlePlanSubmit}
        >
            <Box sx={{
                    textAlign: "center",
                    marginBottom: "20px"
                }}
            >
                <Typography fontWeight="600" fontSize="1.2rem">{props.item.name}</Typography>
            </Box>
            <Box sx={{
                    textAlign: "center",
                    padding: "10px"
                }}
            >
                <Typography fontSize="0.8rem">{props.item.description}</Typography>
            </Box>
            <Box sx={{
                    minHeight: "100px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Typography sx={{ margin: "10px 5px 0 0"}}>¥</Typography>
                <Typography fontSize="2rem">{props.item.price}</Typography>
            </Box>
            <Box sx={{ 
                    display: "flex",
                    justifyContent: "center",
                }}  
            >
                <LoadingButton
                    variant='contained'
                    type='submit'
                    loading={loading}
                    color="success"
                    sx={{
                        minWidth: "100%",
                        marginTop: "10px"
                    }}
                >
                    <Typography fontWeight="600">はじめる</Typography>
                </LoadingButton>
            </Box>
        </Card>
    )
}

export default PlanCard