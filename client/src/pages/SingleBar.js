import React from 'react'
import './SingleBar.css'
import { Link } from 'react-router-dom'
import Beer from './images/beer.svg'

class SingleBar extends React.Component {
  state = {bar: {Name:'Loading...'}, reviews: [], loader: true}



fetchBar = () => {
  fetch(`/api/bars/${this.props.match.params.id}`)
  .then(response=>response.json())
  .then(bar => this.setState({bar, loader: false}))
}
fetchReviews = () => {
  fetch(`/api/bars/${this.props.match.params.id}/reviews`)
  .then(response=>response.json())
  .then(data => {
    const reviews = data.reviews.map(({user, rating, text}) => ({name: user.name, rating, text}))

    this.setState({ reviews })
  })
}
render(){
  const location = localStorage.getItem('location')
  const term = localStorage.getItem('term') || ''
  return(
    <div className="i-want-yo-body">
      {
        location                                            ?
        <Link to={`/bars/${location}/${term}`}>Back</Link>  :
        <Link to="/">Back</Link>
      }
      {
        this.state.loader ?
        <img src={Beer} className="loader" alt="beer"/> :
        <>
          <div className="single-bar-rob">
            <h1>{this.state.bar.name}</h1>
          </div>
          <div className="containerRob">
            <div className="bar-data-rob">
              <img src={this.state.bar.image_url} alt = {this.state.bar.name} className="img-rob"
              />
            </div>

            <div className ="table-data-rob">
              {this.state.bar.name &&
              <table>
                <tbody>
                <tr>
                  <td>Name</td>
                  <td>{this.state.bar["name"]}</td>
                </tr>
                <tr>
                  <td>Reviews</td>
                  <td>{this.state.bar["review_count"]}</td>
                </tr>
                <tr>
                  <td>Phone</td>
                  <td>{this.state.bar["display_phone"]}</td>

                </tr>
                <tr>
                  <td>Rating</td>
                  <td>{this.state.bar["rating"]}</td>
                </tr>
                <tr>
                  <td>Price</td>
                  <td>{this.state.bar["price"]}</td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>{this.state.bar.location.address1}</td>
                  <td>{this.state.bar.location.city},</td>
                  <td>{this.state.bar.location.state}</td>
                  <td>{this.state.bar.location.zip_code}</td>
              </tr>
              <tr>
                <td>Category</td>
                <td>{this.state.bar.categories[0].title}</td>
              </tr>
              </tbody>
              </table>
            }
          <div>
          </div>
          </div>
        </div>
        <div>
          {
            this.state.reviews
              .map((review, index) => (
                <div key={index} className="review">
                  <div className="review-name">Name: {review.name}</div>
                  <div className="review-rating">Rating: {review.rating}</div>
                  <div className="review-text">Review: {review.text}</div>
                </div>
              ))

        }
      </div>
      </>
    }
  </div>

  )
}
  componentDidMount(){
    this.fetchBar()
    this.fetchReviews()
  }
}

 
  
  export default SingleBar
  
