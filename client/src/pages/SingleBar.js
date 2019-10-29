import React from 'react'
import './SingleBar.css'

class SingleBar extends React.Component {
  state = {bar: {Name:'Loading...'}}



fetchBar = () => {
  fetch(`/api/bars/${this.props.match.params.id}`)
  .then(response=>response.json())
  .then(bar => this.setState({bar}))
}

render(){

  return(
    <body className="i-want-yo-body">
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
        
        </div>
      </div>
  </body>
  )
}
  componentDidMount(){
    this.fetchBar()
  }
}

 
  
  export default SingleBar
  
