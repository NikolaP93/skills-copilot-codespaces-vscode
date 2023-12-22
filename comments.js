// Create web server
// Load modules
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const fs = require('fs')

// Port
const port = 3000

// Set views path
app.set('views', path.join(__dirname, 'views'))

// Set template engine
app.set('view engine', 'pug')

// Set static path
app.use(express.static(path.join(__dirname, 'public')))

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))

// Parse application/json
app.use(bodyParser.json())

// Home route
app.get('/', (req, res) => {
  let comments = []
  fs.readFile('data/comments.json', (err, data) => {
    if (err) throw err
    comments = JSON.parse(data)
    res.render('index', {
      title: 'Comments',
      comments: comments
    })
  })
})

// Add comment route
app.post('/comments/add', (req, res) => {
  let comment = {
    name: req.body.name,
    comment: req.body.comment,
    date: new Date()
  }
  fs.readFile('data/comments.json', (err, data) => {
    if (err) throw err
    let comments = JSON.parse(data)
    comments.push(comment)
    fs.writeFile('data/comments.json', JSON.stringify(comments), (err) => {
      if (err) throw err
      console.log('Comment added')
    })
  })
  res.redirect('/')
})

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})