import { useSelector } from "react-redux"
import { useUserContext } from "../contexts/userContext"
import Home from "../pages/Home"

const PrivateRoute = ({ children }) => {

  const isAuthenticated = useSelector(state => state.authReducer.isAuthenticated)
  const {isLoggedIn} = useUserContext();
  // console.log("Private Route : ", isAuthenticated)
  return isLoggedIn ?
    <>{children}</>
    :
    <Home />
}

export default PrivateRoute
