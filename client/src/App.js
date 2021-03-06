import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

// We need to store the logged user token
import { setCurrentUser, logoutUser } from "./actions/authActions"
import { clearCurrentProfile } from "./actions/profileActions";
import jwt_decode from "jwt-decode"
import setAuthToken from "./utils/setAuthToken"
// Comman Components import
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Landing from './components/layout/Landing'
// Individual Components import
import Register from './components/auth/Register'
import Login from './components/auth/Login'
// Dashboard Profiles import
import Dashboard from './components/dashboard/Dashboard'
// Private Router Common Setup
import PrivateRoute from './components/common/PrivateRoute'
// Profile UI routes
import CreateProfile from './components/create-profile/CreateProfile'
import EditProfile from './components/edit-profile/EditProfile'
// Experience Route
import AddExperience from './components/add-creditentials/AddExperience'
// Education Route
import AddEducation from './components/add-creditentials/AddEducation'
// Public All Profiles View
import Profiles from './components/profiles/Profiles'
// Single Profile By Handle
import Profile from './components/profile/Profile'
// Posts Main Comp
import Posts from './components/posts/Posts'
// Single Post by Id
import Post from './components/post/Post'
// Common & General Css Stylessheet import
import './App.css'

// Check for json web token
if(localStorage.jwtToken){
    // Set the auhtorization header token
    setAuthToken(localStorage.jwtToken)
    // Decode token and get user information
    const decode = jwt_decode(localStorage.jwtToken)
    // Set User and isAuthenticated
    store.dispatch(setCurrentUser(decode))

    // Check Token Expiry
    const currentTime = Date.now() / 1000
    if(decode.exp < currentTime){
        // The token expired
        // To clear the current user profile
        store.dispatch(clearCurrentProfile())
        // Log out the user
        store.dispatch(logoutUser())
        // Redirect the User to Login
        window.location.href = "/login"
    }
}

class App extends Component {
    render() {
        return (
            <Provider store = { store }>
                <Router>
                    <div className="App">
                        <Navbar />
                        <Route exact path="/" component={Landing} />
                        <div className="container">
                            <Route exact path="/register" component={Register} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/profiles" component={Profiles} />
                            <Route exact path="/profile/:handle" component={Profile} />
                            <Switch>
                                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                            </Switch>
                            <Switch>
                                <PrivateRoute exact path="/create-profile" component={CreateProfile} />
                            </Switch>
                            <Switch>
                                <PrivateRoute exact path="/edit-profile" component={EditProfile} />
                            </Switch>
                            <Switch>
                                <PrivateRoute exact path="/add-experience" component={AddExperience} />
                            </Switch>
                            <Switch>
                                <PrivateRoute exact path="/add-education" component={AddEducation} />
                            </Switch>
                            <Switch>
                                <PrivateRoute exact path="/feed" component={Posts} />
                            </Switch>
                            <Switch>
                                <PrivateRoute exact path="/post/:id" component={Post} />
                            </Switch>
                        </div>
                        <Footer />
                    </div>
                </Router>
            </Provider>
        )
    }
}

export default App