import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { deleteEducation } from '../../actions/profileActions'

class Education extends Component {
    onDeleteClick(id) {
        this.props.deleteEducation(id)
    }
    render() {
        const education = this.props.education.map(exp =>
            <tr key={exp._id}>
                <td>{exp.instituteName}</td>
                <td>{exp.fieldOfStudy}</td>
                <td>
                    <Moment format="YYYY/MM/DD">{exp.fromDate}</Moment>
                    {' '}-{' '}
                    {exp.toDate === null ? ('Present') : (<Moment format="YYYY/MM/DD">{exp.toDate}</Moment>)}
                </td>
                <td><button onClick={this.onDeleteClick.bind(this, exp._id)} className="btn btn-danger">Delete</button></td>
            </tr>)
        return (
            <div>
                <h4 className="mb-4">Your Education</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Institute Name</th>
                            <th>Field Of Study</th>
                            <th>Years</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {education}
                    </tbody>
                </table>
            </div>
        )
    }
}
Education.propTypes = {
    deleteEducation: PropTypes.func.isRequired
}
export default connect(null, { deleteEducation })(Education)