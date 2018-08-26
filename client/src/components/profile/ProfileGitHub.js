import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class ProfileGitHub extends Component {
  constructor(props){
    super(props)
    this.state = {
      clientId: 'f6e101879bcb432a330b',
      clientSecret: 'ed1f0b9c79ce252de0391331f445e72c37f87a7a',
      count: 5,
      sort: 'created: asc',
      repos: []
    }
  }
  componentDidMount(){
    const { username } = this.props
    const { count, sort, clientId, clientSecret } = this.state
    // Generate Git Repo URL
    const url = `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    // Hit Github to fetch repos
    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({ repos: data})
      })
      .catch(err => console.log(err))
  }

  render() {
    const { repos } = this.state
    const reposList = repos.map(repo => (
      <div key={repo.id} className="card card-body mb-2">
        <div className="row">
          <div className="col-md-6">
            <h4>
              <Link to={repo.html_url} className="text-info" target="_blank">
                {repo.name}
              </Link>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div className="col-md-6">
            <span className="badge badge-info mr-1">
              Stars: {repo.stargazers_count}
            </span>
            <span className="badge badge-secondary mr-1">
              Watchers: {repo.watchers_count}
            </span>
            <span className="badge badge-success">
              Forks: {repo.forks_count}
            </span>
          </div>
        </div>
      </div>
    ))
    return (
      <div ref="myRef">
        <hr />
        <h3 className="mb-4">Latest {this.state.count} Github Repos</h3>
        { reposList }
      </div>
    )
  }
}

ProfileGitHub.propTypes = {
  username: PropTypes.string.isRequired
}

export default ProfileGitHub