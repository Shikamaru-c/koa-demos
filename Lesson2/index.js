const Koa = require('./Application')
const app = new Koa

app.use(async ctx => {
  ctx.body = 'hello, world'
})

app.listen(3000, () => {
  console.log(`The server is on port 3000`)
})