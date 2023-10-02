const router = require('express').Router()
const path = require('path')
const fs = require('fs')
const dbPath = path.join(__dirname, "..", "db", "db.json")

module.exports = router