const Koa = require('koa')

const errorMiddleware = require('./middleware/error')
const bodyParserMiddleware = require('./middleware/bodyParser')
const routes = require('./routes')

const app = new Koa()
Koa.prototype.apply = function (module, ...rest) {
  module(this, ...rest)
  return this
}

app
  .apply(bodyParserMiddleware)
  .apply(errorMiddleware)
  .use(routes.routes())
  .use(routes.allowedMethods())

module.exports = app
