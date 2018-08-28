import { ADD_POST, GET_ERRORS, POST_LOADING, GET_POSTS, GET_POST, DELETE_POST } from './types'
import axios from 'axios'

// Add New POST
export const addPost = postData => dispatch => {
    axios
        .post(`/api/posts`,postData)
        .then(response => {
            dispatch({
                type: ADD_POST,
                payload: response.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

// View all POST
export const getPosts = () => dispatch => {
    dispatch(setPostLoading())
    axios
        .get(`/api/posts`)
        .then(response => {
            dispatch({
                type: GET_POSTS,
                payload: response.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_POSTS,
                payload: null
            })
        })
}

// View single POST by Id
export const getPost = (id) => dispatch => {
    dispatch(setPostLoading())
    axios
        .get(`/api/posts/${id}`)
        .then(response => {
            dispatch({
                type: GET_POST,
                payload: response.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_POST,
                payload: null
            })
        })
}

// Delete Post by ID
export const deletePost = (id) => dispatch => {
    axios
        .delete(`/api/posts/${id}`)
        .then(res => 
            dispatch({
                type: DELETE_POST,
                payload: id
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

// Add Like
export const addLike = (id) => dispatch => {
    axios
        .post(`/api/posts/like/${id}`)
        .then(res => 
            dispatch(getPosts())
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

// Remove Like
export const removeLike = (id) => dispatch => {
    axios
        .post(`/api/posts/unlike/${id}`)
        .then(res => 
            dispatch(getPosts())
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

// Add New Comment
export const addComment = (postId, commentData) => dispatch => {
    axios
        .post(`/api/posts/comment/${postId}`,commentData)
        .then(response => {
            dispatch({
                type: GET_POST,
                payload: response.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

// Delete Comment by post and comment ID`s
export const deleteComment = (postId,commentId) => dispatch => {
    axios
        .delete(`/api/posts/comment/${postId}/${commentId}`)
        .then(res => 
            dispatch({
                type: GET_POST,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

// Post Loading Spinner
export const setPostLoading = () => {
    return {
        type: POST_LOADING
    }
}