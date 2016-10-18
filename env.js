import path from 'path'


exports.NODE_ENV = 'dev'
exports.NODE_PORT = 2000
exports.SSL_PORT = 2001
exports.SSL_KEY = path.resolve(__dirname, 'ssl/localhost.key')
exports.SSL_CERT = path.resolve(__dirname, 'ssl/localhost.crt')
exports.API_ADDR = 'https://ziltag.dev:3000'
exports.SSE_ADDR = 'https://ziltag.dev:3310'
exports.PLUGIN_ADDR = 'http://ziltag-plugin:4000/dist/ziltag-plugin.js'
exports.FILE_ADDR = 'https://ziltag.dev:3000'
exports.FORCE_SSL = false
exports.ENABLE_DEVTOOL = false
