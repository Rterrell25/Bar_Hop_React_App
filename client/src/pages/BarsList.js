import React from 'react'
import { Link } from 'react-router-dom'

class BarsList extends React.Component {
  state = { bars: [] }

  componentDidMount() {
    this.fetchBars(this.props.location.search.substr(7))
  }

  fetchBars = (query) => {
    fetch(`/api/bars/search/${query}`)
    .then(response => response.json())
    .then(yelpResponse => {
      const bars = yelpResponse.map(bar => {
        return bar
      })
      this.setState({ bars })
    })
  }

  handleSearch = (event) => {
    this.fetchBars(event.target.value)
  }
  
  
  render(){
      return (    
        <div className="BarsList">
          <h1>This is the BarsList page </h1>
          <input 
          type="text"
          placeholder="Search for a Bar Location"
          onChange={this.handleSearch}
          />
          {
            this.state.bars
            .map(bar => (
              <Link to={`/bars/${bar.id}`} key={bar.id}>
            <div className="bar" >
            <h3>{bar.name} ({bar.rating})</h3>
            <img src={bar.image_url} alt={bar.name}/>
            </div>
            </Link>
            )
            )
          }
          
        </div>
            )
  }
}

export default BarsList