import React from 'react'
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroller'

class BarsList extends React.Component {
  state = {
            bars: [],
            location: this.props.match.params.location,
            term: this.props.match.params.term || 'drinks',
            page: 1,
            total: 0
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
  getMoreBars = () => {
    let { page } = this.state
    page ++
    const location = document.getElementById('location')
    fetch(`/api/bars/search/${location}/${page}`)
    .then(response => response.json())
    .then(data => {
      const bars = [...this.state.bars, ...data.bars]
      this.setState({ bars, page })
    })
  }

  render(){
    return (
      <div>
        <div className="h1-will">
        <h1>BarHop </h1>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="div2">
            <input
              id="location"
              className="input-will"
              type="text"
              placeholder="Search for a Bar Location"
              onChange={this.handleInputChange('location')}
              value={this.state.location}
              required
            />
            <input
              type="text"
              className="input-will"
              placeholder="Search a bar by keyword"
              onChange={this.handleInputChange('term')}
              value={this.state.term}
            />
            <button
              className="will-search-btn"
              type="submit"
              value="Search"
            >Search
            </button>
            </div>
        </form>
        {
          this.state.bars
          .map(bar => (
            <Link to={`/bar/${bar.id}`} key={bar.id}>
              <div className="results">
              <h3 className="will-h3">{bar.name}</h3>
              <img 
              className="result-images"
              src={bar.image_url} 
              alt={bar.name}/>
              <h3> Rating:  <span className="span-will">{bar.rating} ⭐️</span></h3>
              </div>
            </Link>
          ))
        }
        </div>
    )
  }
}

export default BarsList
