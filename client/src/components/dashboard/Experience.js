import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { deleteExperience } from '../../actions/profileActions'

class Experience extends Component {
  onDeleteClick(id){
      this.props.deleteExperience(id)
  }
  render() {
    const experience = this.props.experience.map(exp => 
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td>{exp.title}</td>
            <td>
                <Moment format="YYYY/MM/DD">{exp.fromDate}</Moment>
                {' '}-{' '}
                {exp.toDate === null ? ('Present') : (<Moment format="YYYY/MM/DD">{exp.toDate}</Moment>)}
            </td>
            <td><button onClick={this.onDeleteClick.bind(this, exp._id)} className="btn btn-danger">Delete</button></td>
        </tr>)
    return (
      <div>
        <h4 className="mb-4">Your Experience</h4>
        <table className="table">
            <thead>
                <tr>
                    <th>Company Name</th>
                    <th>Position</th>
                    <th>Years</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {experience}
            </tbody>
        </table>
      </div>
    )
  }
}
Experience.propTypes = {
    deleteExperience: PropTypes.func.isRequired
}
export default connect(null, { deleteExperience })(Experience)