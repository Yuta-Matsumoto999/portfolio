import { async } from '@firebase/util';
import { LoadingButton } from '@mui/lab';
import { Button, Typography, Card, TextField, Alert, AlertTitle } from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import AdminAuthApi from '../../api/AdminAuthApi';
import AdminOrganizationApi from '../../api/AdminOrganizationApi';

const Organization = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [nameValidateErr, setNameValidateErr] = useState("");
    const [loading, setLoading] = useState(false);

    const handleName = (e) => {
        setName(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setNameValidateErr("");

        let error = false;

        if(name === "") {
            error = true;
            setNameValidateErr("プロジェクト名を入力してください。");
        }

        if(error) return;

        const accessOrganizationApi = async () => {
            try {
                const res = await AdminOrganizationApi.create({ name });
                navigate("/admin/plan");
            } catch (err) {
                console.log(err);
                if(err.status === 401) {
                    navigate("/admin/login");
                }
            }
        }

        await AdminAuthApi.initialCsrfToken().then(() => {
            accessOrganizationApi();
        })
    }

    return (
        <Container sx={{
                marginTop: "20px"
            }}
        >
            <Box sx={{
                    textAlign: "center"
                }}
            >
                <h1>PROJECT</h1>
            </Box>
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "40px"
            }}>
                <Alert
                    severity="info"
                    sx={{
                        width: "400px"
                    }}
                >
                    <AlertTitle>プロジェクトを作成します。</AlertTitle>
                    <Typography fontSize="0.8rem">
                        プロジェクト名はいつでも変更できます。
                    </Typography>
                </Alert>
            </Box>
            <Box 
                component="form"
                noValidate
                onSubmit={handleSubmit} 
                sx={{
                    textAlign: "center",
                    marginTop: "20px"
                }}
            >
                <TextField
                    required
                    onChange={handleName}
                    label="プロジェクト名"
                    id="organization_name"
                    name="organization_name"
                    value={name}
                    helperText={nameValidateErr}
                    error={nameValidateErr !== ""}
                    disabled={loading}
                    sx={{
                        minWidth: "300px"
                    }}
                />
                <Box sx={{
                        margin: "40px 0"
                    }}
                >
                    <LoadingButton
                        variant='contained'
                        type='submit'
                        color='success'
                        sx={{
                            minWidth: "300px"
                        }}
                        loading={loading}
                    >
                        <Typography fontWeight="600">Next</Typography>
                    </LoadingButton>
                </Box>
            </Box>
        </Container>
    )
}

export default Organization