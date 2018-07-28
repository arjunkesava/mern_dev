import axios from "axios"
import { GET_ERRORS } from './types'

// Register User Action
export const registerUser = (userData, history) => dispatch => {
    // Axios Default Calls
    axios.defaults.baseURL = "http://localhost:5000"
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