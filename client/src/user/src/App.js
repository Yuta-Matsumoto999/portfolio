import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminAuthLayout from './components/common/admin/layout/AuthLayout';
import AdminAppLayout from './components/common/admin/layout/AppLayout';
import AuthLayout from './components/common/user/layout/AuthLayout';
import AppLayout from './components/common/user/layout/AppLayout';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from '@mui/material';
import { blue } from "@mui/material/colors";
import AdminLogin from './pages/admin/auth/Login';
import AdminRegister from './pages/admin/auth/Register';
import AdminPasswordReset from './pages/admin/auth/PasswordReset';
import AdminSendedResetLink from './pages/admin/auth/SendedResetLink';
import AdminResetPasswordForm from './pages/admin/auth/ResetPasswordForm';
import AdminCompleteResetPassword from './pages/admin/auth/CompleteResetPassword';
import Dashboard from './pages/admin/Dashboard';
import Login from './pages/user/auth/Login';
import Register from './pages/user/auth/Register';
import PasswordReset from './pages/user/auth/PasswordReset';
import SendedResetLink from './pages/user/auth/SendedResetLink';
import ResetPasswordForm from './pages/user/auth/ResetPasswordForm';
import CompleteResetPassword from './pages/user/auth/CompleteResetPassword';
import Home from './pages/user/Home';

function App() {
  const Theme = createTheme({
    palette: { 
      primary: blue,
      natural: {
        main: '#64748B',
        contrastText: '#fff',
      },
      purple: {
        main: '#6c3cb4'
      },
      breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 768,
          lg: 1025,
          xl: 1536,
        },
      },
    },
  });
  
  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {/* admin */}
          <Route path="/admin" element={<AdminAuthLayout />}>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/register" element={<AdminRegister />} />
            <Route path="/admin/reset-password" element={<AdminPasswordReset />} />
            <Route path='/admin/sended-reset-link' element={<AdminSendedResetLink />} />
            <Route path='/admin/reset-password-form' element={<AdminResetPasswordForm />} />
            <Route path='/admin/complete-reset-password' element={<AdminCompleteResetPassword />} />
          </Route>
          <Route path="/admin" element={<AdminAppLayout />}>
            <Route index element={<Dashboard />} />
          </Route>

        {/* General */}
          <Route path="/" element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={<PasswordReset />} />
            <Route path='/sended-reset-link' element={<SendedResetLink />} />
            <Route path='/reset-password-form' element={<ResetPasswordForm />} />
            <Route path='/complete-reset-password' element={<CompleteResetPassword />} />
          </Route>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;