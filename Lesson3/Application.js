const http = require('http')
const request = require('./request')
const response = require('./response')
const context = require('./context')

class Application {

  /**
   * 构造函数
   */
  constructor () {
    this.middlewares = []
    this.context = context
    this.request = request
    this.response = response
  }

  /**
   * 开启 http server 并传入 callback
   */
  listen (...args) {
    const server = http.createServer(this.callback())
    server.listen(...args)
  }

  /**
   * 中间件挂载
   * @param {Function} fn 回调处理函数
   */
  use (fn) {
    this.middlewares.push(fn)
  }

  /**
   * 中间件合并方法，将中间件数组合并为一个中间件
   * @return {Function}
   */
  compose () {
    // 将 middlewares 合并为一个函数，该函数接收一个 ctx 对象
    return async ctx => {

      function createNext (middleware, oldNext) {
        return async () => {
          await middleware(ctx, oldNext)
        }
      }

      let len = this.middlewares.length
      let next = async () => {
        return Promise.resolve()
      }
      
      for (let i = len - 1; i >= 0; i--) {
        let currentMiddleware = this.middlewares[i]
        next = createNext(currentMiddleware, next)
      }

      await next()
    }
  }

  /**
   * 获取 http server 所需的 callback 函数
   * @return {Function} fn
   */
  callback () {
    return (req, res) => {
      let ctx = this.createContext(req, res)
      let respond = () => this.responseBody(ctx)
      let fn = this.compose()
      return fn(ctx).then(respond)
    }
  }

  /**
   * 构造 ctx
   * @param {Object} req node req 实例 
   * @param {Object} res node res 实例 
   * @return {Object} ctx 实例
   */
  createContext (req, res) {
    let ctx = Object.create(this.context)
    ctx.request = Object.create(this.request)
    ctx.response = Object.create(this.response)
    ctx.req = ctx.request.req = req
    ctx.res = ctx.response.res = res
    return ctx
  }

  /**
   * 对客户端消息进行回复
   * @param {Object} ctx ctx 实例 
   */
  responseBody (ctx) {
    let content = ctx.body
    if (typeof content === 'string') {
      ctx.res.end(content)
    } else if (typeof content === 'object') {
      ctx.res.end(JSON.stringify(content))
    }
  }
}

module.exports = Application