const moment = require('moment-mini')
const { spawn } = require('child_process')
const response = require('../utils/response')

exports.automation = async (ctx) => {
  const { ref = '' } = ctx.request.body

  const dateFormat = moment(new Date()).format('YYYYMMDDHHmmss')
  const ls = spawn('bash', ['./build.sh', dateFormat, ref.slice(11)])

  ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`)
  })

  ls.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`)
  })

  ls.on('close', (code) => {
    console.log(`子进程退出，退出码 ${code}`)
  })

  return (ctx.body = response('success'))
}
