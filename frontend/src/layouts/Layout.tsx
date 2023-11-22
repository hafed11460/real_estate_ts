
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import PublicRoute from './PublicRoute';
import Home from 'components/Home';
import AuthLayout from './AuthLayout';
import Login from 'components/auth/Login';
import Register from 'components/auth/Register';
import EmailVerify from 'components/auth/EmailVerify';
import ForgotPassword from 'components/auth/ForgotPassword';
import PasswordResetConfirm from 'components/auth/PasswordResetConfirm';
import ListingsApp from 'components/listings/map/ListingsApp';
import AgencyList from 'components/listings/Agencies/AgencyList';
import PropertiesApp from 'components/listings/properties/PropertiesApp';
import AgencyDetail from 'components/listings/Agencies/AgencyDetail';
import PropertyDetail from 'components/agencies/property/PropertyDetail';
import { PrivateRoute } from './PrivateRoute';
import MainLayout from './MainLayout';
import AccountLayout from './AccountLayout';
import AccountInfo from 'components/account/AccountInfo';
import AccountSecurity from 'components/account/AccountSecurity';
import { VendorLayout } from './VendorLayout';
import VendorAgency from 'components/agencies/agency/VendorAgency';

// const AgencyHome = React.lazy(() => import('components/agencies/agency/VendorAgency'));;

const Layout = () => {
    return (
        <>
            <Routes>
                {/* <Route path="/maptest" element={<MapTest />} /> */}
                <Route element={<AuthLayout />}>
                    <Route path="/login/" element={<Login />} />
                    <Route path="/register/" element={<Register />} />
                    <Route path="/email-verify/" element={<EmailVerify />} />
                    <Route path="/forgot-password/" element={<ForgotPassword />} />
                    <Route path="/auth/password-reset-confirm/:uid/:token/" element={<PasswordResetConfirm />} />
                </Route>

                <Route element={<PublicRoute />}>
                    <Route path="/" element={<Home />} />
                    {/* <Route path="/" element={<ListingsApp />} /> */}
                    <Route path="/map/" element={<ListingsApp />} />
                    <Route path="/agencies/" element={<AgencyList />} />
                    <Route path="/agencies/:aid/" element={<AgencyDetail />} />
                    <Route path="/properties/" element={<PropertiesApp />} />
                    <Route path="/properties/:pid/" element={<PropertyDetail />} />
                </Route>

                <Route element={<PrivateRoute />}>
                    <Route element={<MainLayout />}>

                        <Route element={<AccountLayout />}>
                            <Route path="/account/" element={<AccountInfo />} />
                            <Route path="/account/info/" element={<AccountInfo />} />
                            <Route path="/account/security/" element={<AccountSecurity />} />
                        </Route>
                        <Route element={<VendorLayout />}>
                            <Route path="/vendor/agency/" element={<VendorAgency />} />
                        </Route>
                    </Route>

                </Route> 
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    )
}

export default Layout;