import React from 'react'

class SingleBar extends React.Component {
  state = {bar: {Name: 'Loading...'}}

  fetchBar = () => {
    fetch(`/api/bars/${this.props.match.params.id}`)
    .then(response => response.json())
    .then(bar => this.setState({bar}))
  }
  render(){
    return(
      <div className="single-bar">
        <h1>{this.state.bar.name}</h1>
      <div className="bar-data">
        <img src={this.state.bar.image_url} alt={this.state.bar.name}/>
        <table>
          <tbody>
          {
            ['name', 'review_count',].map(barInfo => (
              <tr key={barInfo}>
                <td>{barInfo}</td>
                <td>{this.state.bar[barInfo]}</td>
              </tr>  
            ))
          }
          </tbody>
        </table>  
      </div>  
    </div>
  )
  }
  componentDidMount(){
    this.fetchBar()
  }
}

export default SingleBar