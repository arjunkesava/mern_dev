import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import { connect } from 'react-redux'
import { addComment } from '../../actions/postActions'

class CommentForm extends Component {
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
      const { postId } = this.props
      const newComment = {
          text: this.state.text,
          name: user.name,
          avatar: user.avatar
      }

      this.props.addComment(postId, newComment)

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
                    Comment
                </div>
                <div className="card-body">
                    <form onSubmit={this.onSubmit}>
                        <TextAreaFieldGroup 
                            placeholder="Reply to post"
                            name="text"
                            value={this.state.text}
                            onChange={this.onChange}
                            error={errors.text}
                            />
                        <button type="submit" className="btn btn-dark">Comment It</button>
                    </form>
                </div>
            </div>
        </div>
    )
  }
}

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { addComment })(CommentForm)
