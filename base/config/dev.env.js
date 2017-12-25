var merge = require('webpack-merge')
var prodEnv = require('./prod.env')
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_PATH: '"//172.16.129.123:7070"',
  API_ROOT: '"//172.16.129.123:6060"'

})
