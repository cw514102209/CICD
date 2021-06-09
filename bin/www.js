const { http, host, port } = require('config').get('Customer.dbConfig')

const app = require('../app')

app.listen(port, () =>
  console.log(`app listening on port ${http}://${host}:${port}`),
)
