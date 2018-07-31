import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCurrentProfile } from '../../actions/profileActions'
import Spinner from '../common/Spinner'

class Dashboard extends Component {
    componentDidMount() {
        this.props.getCurrentProfile()
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
                dashboardContent = <h4>TODO: Dashboard Profile View Page</h4>
            }else{
                // An Empty Profile View is below
                dashboardContent = (
                    <div>
                        <p className = "lead text-muted">Welcome { user.name } </p>
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
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);