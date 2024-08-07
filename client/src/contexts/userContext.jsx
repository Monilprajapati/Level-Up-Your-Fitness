import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [userId, setUserId] = useState("");
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );
  const [user,setUser] = useState({});

  const [isLoggedIn, setLoggedIn] = useState(localStorage.getItem("token") ? true : false);

  return <UserContext.Provider value={{
    userId,
    setUserId,
    isAuthenticated,
    isLoggedIn,
    setLoggedIn,
    setUser,
    user
  }}>{children}</UserContext.Provider>;
};

const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(
      "useUserContext must be within a UserContextProvider. Make sure the component is wrapped in UserContextProvider"
    );
  }
  return context;
};

export { useUserContext, UserContextProvider };
