// Ensure that no access to other pages if there's no token


import { getToken } from "@/utils";
import { Navigate } from "react-router-dom";


// Children is the component that is navigating to
export const AuthRoute = ({children}) => {
    const token = getToken()
    if (token) {
        return <>{children}</>
    } else {
        // if there's no token, back to the login page
        return <Navigate to={'/login'} replace />
    }
}
