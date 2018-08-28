import axios from "axios"
import setAuthToken from "../utils/setAuthToken"
import jwt_decode from "jwt-decode"
import { GET_ERRORS, SET_CURRENT_USER } from './types'

// Register User Action
export const registerUser = (userData, history) => dispatch => {

    axios
        .post("/api/users/register", userData)
        .then(response => history.push('/login'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )

    return {
        type: GET_ERRORS,
        payload: userData 
    }
}

export const loginUser = (userData, history) => dispatch => {
    
    axios
        .post("/api/users/login", userData)
        .then(response => {
            // Get token from server
            const { token } = response.data
            // Store token in localStore
            localStorage.setItem("jwtToken", token)
            // Set token to auth Header
            setAuthToken(token)
            // Decode Token to get User Data
            const decoded = jwt_decode(token)
            // Set Current User
            dispatch(setCurrentUser(decoded))
        })
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

// Set logged in User
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

// Logout User buddy
export const logoutUser = () => dispatch => {
    // Remove jwt Token from local storage
    localStorage.removeItem('jwtToken')
    // Remove Auth Header
    setAuthToken(false)
    // Set Current User to Empty
    dispatch(setCurrentUser({}))
}