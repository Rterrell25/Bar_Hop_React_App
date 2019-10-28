import React from 'react'

class SingleBar extends React.Component {
  state = {bar: {Name: 'Loading...'}}

  fetchBar = () => {
    fetch(`/api/bars/${this.props.match.params.id}`)
    .then(response => response.json())
    .then(bar => this.setState({bar}))
  }
  
  render(){
    const {bar} = this.state
    
    return(
      <div className="single-bar">
        <h1>{this.state.bar.name}</h1>
      <div className="bar-data">
        <img src={this.state.bar.image_url} alt={this.state.bar.name}/>
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
                <td>{this.state.bar["rating"]}/5</td>
              </tr>  
              <tr>
                <td>Price</td>
                <td>{this.state.bar["price"]}</td>
              </tr>  
              <tr>
                <td>Address</td>
                <td>{this.state.bar.location.address1}.</td>
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
  )
  }
  componentDidMount(){
    this.fetchBar()
  }
}

export default SingleBar