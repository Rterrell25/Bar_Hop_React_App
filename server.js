if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require("express")
const path = require("path")
const app = express()
const axios = require("axios")

app.get('/api/bars/search/:location/:term?', (request, response) => {
  const { location, term } = request.params
  const locationSearch = location ? `&location=${location}` : '';
  const termSearch = term && term !== 'undefined' ? `&term=${term}` : ''
  axios.get(`https://api.yelp.com/v3/businesses/search?categories=bars${locationSearch}${termSearch}`, {
    headers: {
      Authorization: `Bearer ${process.env.YELP_API_KEY}`
    }
  })
  .then(yelpResponse => response.json(yelpResponse.data.businesses || []))
  .catch(err => response.send([]))
})

app.get(`/api/bars/:id`, async (request, response) => {
  const { id } = request.params
  let { data } = await axios.get(`https://api.yelp.com/v3/businesses/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.YELP_API_KEY}`
    }
  })
  console.log(data)
  response.send(data);
})



const PORT = process.env.PORT || 8080
app.listen(
  PORT,
  () => { console.log(`API listening on port ${PORT}...`) }
)
