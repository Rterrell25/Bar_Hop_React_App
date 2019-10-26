import React from 'react'
import { Link } from 'react-router-dom'

// barsList will use this.props.location.search

class Home extends React.Component{
  state = {query: ''}

handleSearch = (event) => {
  event.preventDefault()
  this.props.history.push({pathname: '/bars', search: `?query=${event.target.query.value}`})
}

  render(){
    return(
      <div className="home-page-search">
        <h1>Bar Hop</h1>
        <form onSubmit={this.handleSearch}>
          <input
            name="query"
            type="text"
            placeholder="Search a bar.."
            autoComplete="off"
          />   
        </form>
        <h3>
          this is:
        </h3>
      </div>
    )
  }
}

export default Home