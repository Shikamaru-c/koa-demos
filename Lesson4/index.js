const Koa = require('./Application')
const app = new Koa

app.use(async (ctx, next) => {
  try {
    ctx.body = 'hello, world'
    throw 'test error'
  } catch (e) {
  }
})

app.use(async (ctx, next) => {
  ctx.body = 'hello, koa'
})

app.listen(3000, () => {
  console.log(`The server is on port 3000`)
})