import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { user } from "../../services/user";

const initialState = {
  user: {},
  isAuthenticated: false, // State that will help to check that the user is loggedIn or not
  isLoading: false, // State that will help to check that the data is loading or not
};

// Everytime will run this function to check the user is loggedIn or not - Because of useEffect in App.js
export const checkAuthStatus = createAsyncThunk(
  "auth/checkAuthStatus",
  async ({ dispatch, navigate }) => {
    try {
      // Setting the loading to true while fetching the data
      dispatch(setLoading(true));
      // Fetching the data from the server to check the user is loggedIn or not
      const response = await user();
      console.log("Response : ", response);
      // console.log("Response : ", response)
      if (response != null) {
        if (response.status) {
          dispatch(setLoading(false));
          dispatch(setIsAuthenticated(true));
          dispatch(setUser(response));
        } else {
          dispatch(setLoading(false));
          dispatch(setIsAuthenticated(false));
          toast.error("User not verified!");
          setTimeout(() => {
            navigate("/verify");
          });
        }
      } else {
        dispatch(setIsAuthenticated(false));
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log("Error : ", error);
      dispatch(setIsAuthenticated(false));
    }
  }
);


//! Async thunk to set User Data After Login Or SignUp
export const setUserData = createAsyncThunk(
  "auth/setUserData",
  async ({ dispatch }) => {
    try {
      const response = await user();
      if (response != null && response.status) {
        dispatch(setUser({ email: response.email }));
      }
    } catch (error) {
      console.log(error);
    }
  }
);

// Here we are creating a slice for the auth which will have the user, user LoggedIn state and isLoading state
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // SetUser reducer : To set the user data in the state
    setUser: (state, action) => {
      state.user = action.payload;
    },
    // SetIsAuthenticated reducer : To set the user loggedIn state in the state
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    // SetLoading reducer : To set the loading state in the state
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    // LogOutUser reducer : To logout the user
    logOutUser: (state, action) => {
      localStorage.removeItem("token");
      localStorage.removeItem("currentChat");
      localStorage.removeItem("connectedRooms");
      localStorage.removeItem("queries");
      state.user = {};
      state.isAuthenticated = false;
    },
  },
});

// Here are the selectors for the authSlice which will help to get the data from the state
export const { setUser, setIsAuthenticated, logOutUser, setLoading } =
  authSlice.actions;

export default authSlice.reducer;
