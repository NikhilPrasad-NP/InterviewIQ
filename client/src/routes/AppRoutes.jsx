import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import InterviewPage from "../pages/InterviewPage";
import HistoryPage from "../pages/HistoryPage";
import ProfilePage from "../pages/ProfilePage";
import NotFoundPage from "../pages/NotFoundPage";

function AppRoutes() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/interview" element={<InterviewPage />} />
                <Route path="/history" element={<HistoryPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes

