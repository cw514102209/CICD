const Router = require('koa-router')

const automationRouter = require('./automation')

const router = new Router({ prefix: '/api' })

router.use('/automation', automationRouter)

module.exports = router
