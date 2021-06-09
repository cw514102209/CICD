const Router = require('koa-router')
const router = new Router()

const automationController = require('../controllers/automationController')

router.post('/', automationController.automation)

module.exports = router.routes()
