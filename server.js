const routes = require('./routes')
const express = require('express')
const app = express()
const PORT = 3000

app.use(express.static('public'))
app.use(express.json())

app.use(routes)

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:3000 ${PORT}`)
})