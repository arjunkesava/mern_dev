import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions'
import { ProfileActions } from './ProfileActions'
import Spinner from '../common/Spinner'
import Experience from './Experience.js'
import Education from './Education.js'

class Dashboard extends Component {
    componentDidMount() {
        this.props.getCurrentProfile()
    }
    onDeleteClick(event){
        this.props.deleteAccount()
    }
    render() {
        const { user } = this.props.auth
        const { profile, loading } = this.props.profile
        
        let dashboardContent;
        if( profile === null || loading ){
            dashboardContent = <Spinner/>
        }else{
            // Check weather the logged in user has a profile or not
            if(Object.keys(profile).length > 0) {
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link></p>
                        <ProfileActions />
                        <Experience experience={profile.experience}/>
                        <Education education={profile.education}/>
                        <button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger">Delete my Account</button>
                    </div>
                )
            }else{
                // An Empty Profile View is below
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">Welcome { user.name } </p>
                        <p> You have not yet set up any profile, add some info </p>
                        <Link to="create-profile" className="btn btn-lg btn-info">Create Profile</Link>
                    </div>
                )
            }
        }

        return (
            <div className="dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4">Dashboard</h1>
                            { dashboardContent }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard)