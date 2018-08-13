import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ProfileHeader from './ProfileHeader'
import ProfileAbout from './ProfileAbout'
import ProfileGitHub from './ProfileGitHub'
import ProfileCreds from './ProfileCreds'

import Spinner from '../common/Spinner'
import { getProfileByHandle } from '../../actions/profileActions'

export class Profile extends Component {
    componentDidMount() {
        if(this.props.match.params.handle){
            this.props.getProfileByHandle(this.props.match.params.handle)
        }
    }
    render() {
        return (
            <div>
                <ProfileHeader />
                <ProfileAbout />
                <ProfileCreds />
                <ProfileGitHub />
            </div>
        )
    }
}

Profile.propTypes = {
    getProfileByHandle: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}


const mapStateToProps = (state) => ({
    
})


export default connect(mapStateToProps, { getProfileByHandle })(Profile)
