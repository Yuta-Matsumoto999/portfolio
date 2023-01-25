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
import Member from './pages/admin/member/Member';
import AppPlanLayout from './components/common/admin/layout/AppPlanLayout';
import Plan from './pages/admin/Plan';
import Organization from './pages/admin/Organization';
import OrganizationSetting from './pages/admin/setting/organization/OrganizationSetting';

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
      gray: {
        main: '#a4a4a4'
      },
      black: {
        main: '#000000'
      },
      white: {
        main: "#fff"
      },
      sidebarOpen: {
        main: "#44448c"
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
          <Route path="/admin/plan" element={<AppPlanLayout />}>
            <Route index element={<Plan />} />
          </Route>
          <Route path="/admin/organization" element={<AppPlanLayout />}>
            <Route index element={<Organization />} />
          </Route>
          <Route path="/admin/manage/:organizationUniqueKey" element={<AdminAppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/admin/manage/:organizationUniqueKey/member" element={<Member />} />
            <Route path="/admin/manage/:organizationUniqueKey/settings/organization" element={<OrganizationSetting />} />
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