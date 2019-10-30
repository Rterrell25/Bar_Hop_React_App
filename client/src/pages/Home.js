import React from 'react'
import './HomePage.css'
import Beer from './images/beer.svg'


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
      <div className="home-page-body">
        <h1 className="home-page-title">Bar Hop</h1>
        <form                       
          className="home-page-form"
          onSubmit={this.handleSearch}
        >
          <div className="home-search-box">
            <label 
              className="home-page-label"
              htmlFor="home-search-id"
            >  
              <img src={Beer} alt="beer icon" />
            <input
              id="search-box-id"
              className="home-page-input"
              name="query"
              type="text"
              spellCheck="false"
              autoComplete="off"
              onChange={this.handleInputChange}
            />
               </label> 
          </div>
        </form>
      </div>
    )
  }
}

export default Home
