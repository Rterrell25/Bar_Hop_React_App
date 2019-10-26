if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require("express")
const path = require("path")
const app = express()
const axios = require("axios")

app.get('/api/bars/search/:location', (request, response) => {
  const { location } = request.params

  axios.get(`https://api.yelp.com/v3/businesses/search?term=bars&location=${location}`, {
    headers: {
      Authorization: `Bearer ${process.env.YELP_API_KEY}`
    }
  })
  .then(yelpResponse => {
    const bars = yelpResponse.data.businesses || []
    response.json(bars)
  })


})




const port = process.env.PORT || 8080
app.listen(
  port,
  () => { console.log(`API listening on port ${port}...`) }
)
