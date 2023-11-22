import { User } from "features/auth/authApi"
import { selectAccessToken, selectCurrentUser } from "features/auth/authSlice"
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router"

export const VendorLayout = ()=>{
    const user:User | null = useSelector(selectCurrentUser)
    return user?.role == "VENDOR" ? <Outlet/> : <Navigate to ='/'/>
}