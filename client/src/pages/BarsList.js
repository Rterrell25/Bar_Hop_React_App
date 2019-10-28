import React from 'react'
import { Link } from 'react-router-dom'

class BarsList extends React.Component {
  state = { bars: [], location: '', term: '' }

  componentDidMount() {
    const { location } = this.props.match.params;
    location && this.fetchBars(location)
  }

  handleInputChange = field => e => this.setState({ [field]: e.target.value })

  handleSubmit = event => {
    event.preventDefault()
    const { location, term } = this.state;
    this.fetchBars(location, term)
  }

  fetchBars = (location, term) => {
    if (!location) return;
    const url = `/api/bars/search/${location}/${term || ''}`;
    fetch(url)
    .then(response => response.json())
    .then(yelpResponse => this.setState({ bars: yelpResponse }))
  }
  
  render(){
      return (    
        <div className="BarsList">
          <h1>This is the BarsList page </h1>
          <form onSubmit={this.handleSubmit}>
            <div>
              <input 
                type="text"
                placeholder="Search for a Bar Location"
                onChange={this.handleInputChange('location')}
                required
              />
            </div>
            <div>
              <input 
                type="text"
                placeholder="Search a bar by keyword"
                onChange={this.handleInputChange('term')}
              />
            </div>
            <div>
              <input
                type="submit"
                value="Search"
              />
            </div>
          </form>
          {
            this.state.bars
            .map(bar => (
              <Link to={`/bar/${bar.id}`} key={bar.id}>
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