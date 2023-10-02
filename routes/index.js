const router = require('express').Router()
const viewRoutes = require('./views')
const apiRoutes = require('./api')

router.use('/api', apiRoutes)
router.use(viewRoutes)

module.exports = router