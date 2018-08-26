import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import { connect } from 'react-redux'
import { addPost } from '../../actions/postActions'

class PostForm extends Component {
  constructor(props){
      super(props)
      this.state = {
          text: '',
          errors: {}
      }
      this.onChange = this.onChange.bind(this)
      this.onSubmit = this.onSubmit.bind(this)
  }
  componentWillReceiveProps(newProps){
      if(newProps.errors){
          this.setState({ errors: newProps.errors })
      }
  }
  onSubmit(event){
      event.preventDefault()

      const { user } = this.props.auth
      const newPost = {
          text: this.state.text,
          name: user.name,
          avatar: user.avatar
      }

      this.props.addPost(newPost)

      this.setState({ text: '' })
  }
  onChange(event){
      this.setState({[event.target.name]: event.target.value})
  }

  render() {
    const { errors } = this.state
    return (
        <div className="post-form mb-3">
            <div className="card card-info">
                <div className="card-header bg-info text-white">
                    What`s in your mind...
                </div>
                <div className="card-body">
                    <form onSubmit={this.onSubmit}>
                        <TextAreaFieldGroup 
                            placeholder="Write what you feel"
                            name="text"
                            value={this.state.text}
                            onChange={this.onChange}
                            error={errors.text}
                            />
                        <button type="submit" className="btn btn-dark">Push It</button>
                    </form>
                </div>
            </div>
        </div>
    )
  }
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { addPost })(PostForm)
