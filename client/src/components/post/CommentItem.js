import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteComment } from '../../actions/postActions'

class CommentItem extends Component {
    onDeleteClick(postId, commentId){
        this.props.deleteComment(postId, commentId)
    }
    render() {
        const { comment, postId, auth } = this.props;
        return (
            <div className="card card-body mb-3">
                <div className="row">
                    <div className="col-md-2">
                        <a href="">
                            <img src={comment.avatar} alt="" className="rounded-circle d-none d-md-block"/>
                        </a>
                        <br/>
                        <p className="text-center">
                            {comment.name}
                        </p>
                    </div>
                    <div className="col-md-10">
                        <p className="lead">
                            {comment.text}
                        </p>
                        {comment._id === auth.user.id ? (
                            <button onClick={this.onDeleteClick.bind(this, postId, comment._id)} className="btn-danger mr-1" type="button">
                                <i className="fas fa-times" />
                            </button>
                        ) : null}    
                    </div>
                </div>
            </div>
        )
    }
}

CommentItem.propTypes = {
    deleteComment: PropTypes.func.isRequired,
    comment: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem)
