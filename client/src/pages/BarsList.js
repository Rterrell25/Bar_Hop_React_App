import React from 'react'
import { Link } from 'react-router-dom'

class BarsList extends React.Component {
  state = {
            bars: [],
            location: this.props.match.params.location,
            term: this.props.match.params.term || 'drinks'
          }

  componentDidMount() {
    const { location, term='drinks' } = this.props.match.params;
    location && this.fetchBars(location, term)
  }

  handleInputChange = field => e => this.setState({ [field]: e.target.value })

  handleSubmit = event => {
    event.preventDefault()
    const { location, term } = this.state;
    this.props.history.push(`/bars/${location}/${term || ''}`)
    this.fetchBars(location, term)
  }

  fetchBars = (location, term) => {
    if (!location) return;
    const url = `/api/bars/search/${location}/${term || ''}`;
    fetch(url)
    .then(response => response.json())
    .then(yelpResponse => {
      this.setState({
        bars: yelpResponse,
        location,
        term
      })
    })
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
              value={this.state.location}
              required
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Search a bar by keyword"
              onChange={this.handleInputChange('term')}
              value={this.state.term}
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
          ))
        }
      </div>
    )
  }
}

export default BarsList
