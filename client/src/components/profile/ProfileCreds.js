import React, { Component } from 'react'
import Moment from 'react-moment'

class ProfileCreds extends Component {
  render() {
    const { education,experience } = this.props
    // Populate Experience List below 
    const expList = experience.map(exp => (
      <li key={exp._id} className="list-group-item">
        <h4>{ exp.company }</h4>
        <p>
          <Moment format="YYYY/MM/DD">{ exp.fromDate }</Moment> - 
          { exp.toDate === null ? (' Now') : <Moment format="YYYY/MM/DD">{ exp.toDate }</Moment> }
        </p>
        <p>
          <strong>Position:</strong> { exp.title }
        </p>
        <p>
          {exp.description === '' ? null : (<span><strong>Description:</strong>{ exp.description }</span>)}
        </p>
      </li>
    ))
    // Populate Education List below
    const eduList = education.map(edu => (
      <li key={ edu._id } className="list-group-item">
        <h4>{ edu.instituteName }</h4>
        <p>
          <Moment format="YYYY/MM/DD">{ edu.fromDate }</Moment> - 
          { edu.toDate === null ? (' Now') : <Moment format="YYYY/MM/DD">{ edu.toDate }</Moment> }
        </p>
        <p>
          <strong>Degree: </strong> { edu.degree }
        </p>
        <p>
          <strong>Field of Study: </strong> { edu.fieldOfStudy }
        </p>
        <p>
          {edu.description === '' ? null : (<span><strong>Description:</strong>{ edu.description }</span>)}
        </p>
      </li>
    ))
    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience</h3>
            { expList.length > 0 ? (
              <ul className="list-group">{ expList }</ul>
            ) : (
              <p className="text-center">No Experience Listed</p>
            )}
        </div>
        <div className="col-md-6">
          <h3 className="text-center text-info">Education</h3>
            { eduList.length > 0 ? (
              <ul className="list-group">{ eduList }</ul>
            ) : (
              <p className="text-center">No Education Listed</p>
            )}
        </div>
      </div>
    )
  }
}

export default ProfileCreds