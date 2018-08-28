import axios from 'axios'

import { GET_PROFILE, GET_PROFILES, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS, SET_CURRENT_USER } from './types'

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
// Get Profile By Handle
export const getProfileByHandle = (handle) => dispatch => {
    // Loader Call, before fetching data
    dispatch(setProfileLoading())
    // Hit Profile Get Request with Axios Api
    axios
        .get('/api/profile/handle/'+handle)
        .then(res => 
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_PROFILE,
                payload: null
            })
        )
}
// Create Profile Action
export const createProfile = (profileData, history) => dispatch => {
    // Loader Call, before fetching data
    dispatch(setProfileLoading())
    // Add new Profile 
    axios
        .post('/api/profile', profileData)
        .then(response => history.push('/dashboard'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}
// Add Experience Action
export const addExperience = (experienceData, history) => dispatch => {
    axios
        .post('/api/profile/experience',experienceData)
        .then(response => history.push('/dashboard'))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}
// Add Education Action
export const addEducation = (educationData, history) => dispatch => {
    axios
        .post('/api/profile/education',educationData)
        .then(response => history.push('/dashboard'))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
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
// GET all Public Profiles
export const getProfiles = () => dispatch => {
    // Loader Call Before you fetch data
    dispatch(setProfileLoading())

    axios
        .get('/api/profile/all/')
        .then(response => 
            dispatch({
                type: GET_PROFILES,
                payload: response.data
            })
        )
        .catch(err => 
            dispatch({
                type: GET_PROFILES,
                payload: null
            })
        )
}
// Delete Experience Based on Id
export const deleteExperience = id => dispatch => {
    axios
        .delete('/api/profile/experience/'+id)
        .then(response => 
            dispatch({
                type: GET_PROFILE,
                payload: response.data
            })
        )
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}
// Delete Education Based on Id
export const deleteEducation = id => dispatch => {
    axios
        .delete('/api/profile/education/'+id)
        .then(response => 
            dispatch({
                type: GET_PROFILE,
                payload: response.data
            })
        )
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}
// Delete Account Action
export const deleteAccount = () => dispatch => {
    if(window.confirm("Are you sure? This can`t be undone dude")){
        // delete api
        axios
            .delete('/api/profile')
            .then(response =>
                dispatch({
                    type: SET_CURRENT_USER,
                    payload: {}
                })
            )
            .catch(err => 
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            )
    }
}