import axios from 'axios'

import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from './types'

// Axios Default Calls
axios.defaults.baseURL = "http://localhost:5000"

// Get Current Profile
export const getCurrentProfile = () => dispatch => {
    // Loader Call, before fetching data
    dispatch(setProfileLoading())
    // Hit Profile Get Request with Axios Api
    axios
        .get('/api/profile')
        .then(response =>
            dispatch({
                type: GET_PROFILE,
                payload: response.data
            })
        )
        .catch(err => 
            dispatch({
                type: GET_PROFILE,
                payload: {}
            })
        )
}
// Profile Loading Action
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}
// Clear Current Profile
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}