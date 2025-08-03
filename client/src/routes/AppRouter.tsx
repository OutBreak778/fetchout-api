import { AuthLayout } from "@/layouts/AuthLayout"
import { MainLayout } from "@/layouts/MainLayout"
import Home from "@/pages/Home"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import { Route, Routes } from "react-router-dom"

const AppRouter = () => {
    return(
        <Routes>
            {/* Public Routes */}
            <Route element={<AuthLayout />}> {/* Add ProtectRoute element */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Route>
            {/* Private Routes */}
            <Route element={<MainLayout />}> {/* Add ProtectRoute element */}
                <Route path="/" element={<Home />} />
            </Route>
        </Routes>
    )
}

export default AppRouter