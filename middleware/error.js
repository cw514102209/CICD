module.exports = function (app) {
  app.use(async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      if (err.status === 401) {
        ctx.status = 401
        ctx.body = {
          error: err.originalError ? err.originalError.message : err.message,
        }
      } else {
        err.status = err.statusCode || err.status || 500
        throw err
      }
    }
  })
}
