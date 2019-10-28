import React from 'react'

class Home extends React.Component{
  state = {query: ''}

  handleInputChange = event => this.setState({ query: event.target.value })

  handleSearch = event => {
    event.preventDefault()
    const { query } = this.state;
    this.props.history.push(`/bars/${query}`)
  }

  render(){
    return(
      <div className="home-page-search">
        <h1>Bar Hop</h1>
        <form onSubmit={this.handleSearch}>
          <input
            name="query"
            type="text"
            placeholder="Search for a location"
            autoComplete="off"
            onChange={this.handleInputChange}

          />
        </form>
      </div>
    )
  }
}

export default Home
