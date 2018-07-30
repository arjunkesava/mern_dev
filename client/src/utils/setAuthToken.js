import axios from "axios"

const setAuthToken = token => {
    if(token){
        // If there is a token, then we will set this token
        axios.defaults.headers.common["Authorization"] = token
    }
    else{
        // If there is no token, then we will delete this
        delete axios.defaults.headers.common["Authorization"]
    }
}

export default setAuthToken