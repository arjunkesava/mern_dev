import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { addLike, removeLike, deletePost } from '../../actions/postActions'
import classnames from 'classnames'

class PostItem extends Component {
    onLikeClick(id){
        this.props.addLike(id)
    }
    onUnLikeClick(id){
        this.props.removeLike(id)
    }
    onDeleteClick(id){
        this.props.deletePost(id)
    }
    findUserLike(likes){
        const { auth } = this.props
        if(likes.filter(like => like._id === auth.user.id).length > 0){
            return true
        }else{
            return false
        }
    }
    render() {
        const { post, auth } = this.props
        return (
            <div className="card card-body mb-3">
                <div className="row">
                    <div className="col-md-2">
                        <a href="profile.html">
                            <img className="rounded-circle d-none d-md-block" src={post.avatar} alt="" />
                        </a>
                        <br />
                        <p className="text-center">{post.name}</p>
                    </div>
                    <div className="col-md-10">
                        <p className="lead">{post.text}</p>
                        <button type="button" className="btn btn-light mr-1" onClick={this.onLikeClick.bind(this, post._id)}>
                            <i className={classnames("fas fa-thumbs-up", {
                                "text-info": this.findUserLike(post.likes)
                            })}></i>
                            <span className="badge badge-light">{post.likes.length}</span>
                        </button>
                        <button type="button" className="btn btn-light mr-1" onClick={this.onUnLikeClick.bind(this, post._id)}>
                            <i className="text-secondary fas fa-thumbs-down"></i>
                        </button>
                        <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                            Comments
                        </Link>
                        {post.user === auth.user.id ? (
                            <button onClick={this.onDeleteClick.bind(this, post._id)} className="btn-danger mr-1" type="button">
                                <i className="fas fa-times" />
                            </button>
                        ) : null}
                    </div>
                </div>
            </div>
        )
    }
}

PostItem.propTypes = {
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(PostItem)