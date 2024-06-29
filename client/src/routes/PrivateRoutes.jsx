import { useSelector } from "react-redux"
import Dashboard from "../pages/Dashboard"

const PrivateRoute = ({ children }) => {

  const isAuthenticated = useSelector(state => state.authReducer.isAuthenticated)
  // console.log("Private Route : ", isAuthenticated)
  return isAuthenticated ?
    <>{children}</>
    :
    <Dashboard />
}

export default PrivateRoute
