import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import athletesData from './data/athletes-data.json'

console.log(athletesData.length)
// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// 
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
// import booksData from './data/books.json'
// import netflixData from './data/netflix-titles.json'
// import topMusicData from './data/top-music.json'
// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()
// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())
// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world, hej hej')
})
//http://localhost:8080/athletes
app.get('/athletes', (req, res) => {
  // res.json(athletesData)
  // Query parameter
  const searchString = req.query.search

  let filteredAthletes = athletesData

  // console.log(searchString)

  if (searchString) {
    // Filter once
    // http://localhost:8080/athletes?search=Ulwahn
    filteredAthletes = filteredAthletes.filter(item => {
      const athleteName = item.lastname.toString()
      const athleteCountry = item.countryoforiginname.toString()
      const athleteAffiliate = item.affiliatename.toString()
      return athleteName.includes(searchString) ||
        athleteCountry.includes(searchString) ||
        athleteAffiliate.includes(searchString)
    })
  }

  res.json(filteredAthletes)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})