import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import { addExperience } from '../../actions/profileActions'

class AddExperience extends Component {
    constructor(props){
        super(props)
        this.state = {
            company: '',
            title: '',
            location: '',
            from: '',
            to: '',
            current: false,
            description: '',
            disabled: false,
            errors: {}
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onCheck = this.onCheck.bind(this)
    }
    onChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    onSubmit(event){
        event.preventDefault()
        
        const experienceData = {
            company: this.state.company,
            title: this.state.title,
            location: this.state.location,
            fromDate: this.state.from,
            toDate: this.state.to,
            current: this.state.current,
            description: this.state.description
        }

        this.props.addExperience(experienceData, this.props.history)
    }
    onCheck(){
        this.setState({
            disabled: !this.state.disabled,
            current: !this.state.current
        })
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({ errors: nextProps.errors })
        }
    }
    render() {
        const { errors } = this.state

        return (
            <div className="add-experience">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">
                                {'Go Back'}
                            </Link>
                            <h1 className="display-4 text-center">Add Experience</h1>
                            <p className="lead text-center">Add any job position bro</p>
                            <small className="d-block pb-3">* = required fields</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="* Company"
                                    name="company"
                                    value={this.state.company}
                                    onChange={this.onChange}
                                    error={errors.company}
                                />
                                <TextFieldGroup
                                    placeholder="* Job Title"
                                    name="title"
                                    value={this.state.title}
                                    onChange={this.onChange}
                                    error={errors.title}
                                />
                                <TextFieldGroup
                                    placeholder="Location"
                                    name="location"
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    error={errors.location}
                                />
                                <h6>From Date</h6>
                                <TextFieldGroup
                                    name="from"
                                    type="date"
                                    value={this.state.from}
                                    onChange={this.onChange}
                                    error={errors.from}
                                />
                                <h6>To Date</h6>
                                <TextFieldGroup
                                    name="to"
                                    type="date"
                                    value={this.state.to}
                                    onChange={this.onChange}
                                    error={errors.to}
                                    disabled={ this.state.disabled ? 'disabled' : ''}
                                />
                                <div className="form-check mb-4">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="current"
                                        value={this.state.checked}
                                        checked={this.state.checked}
                                        onChange={this.onCheck}
                                        id="current"
                                    />
                                    <label htmlFor="current" className="form-check-label">
                                        Current Job
                                    </label>
                                </div>
                                <TextAreaFieldGroup
                                    placeholder="Job Description"
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.onChange}
                                    error={errors.description}
                                    info={"Tell us what you did at your company "+this.state.company}
                                />
                                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps, { addExperience })(withRouter(AddExperience))