const http = require('http')

class Application {

  /**
   * 构造函数
   */
  constructor () {
    this.callbackFnc
  }

  /**
   * 开启 http server 并传入 callback
   */
  listen (...args) {
    const server = http.createServer(this.callback())
    server.listen(...args)
  }

  /**
   * 挂载回调函数
   * @param {Function} fn 回调处理函数
   */
  use (fn) {
    this.callbackFnc = fn
  }

  /**
   * 获取 http server 所需的 callback 函数
   * @return {Function} fn
   */
  callback () {
    return (req, res) => {
      this.callbackFnc(req, res)
    }
  }
}

module.exports = Application