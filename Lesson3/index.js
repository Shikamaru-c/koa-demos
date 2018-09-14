const Koa = require('./Application')
const app = new Koa

app.use(async (ctx, next) => {
  console.log(111)
  ctx.body = 'hello, world'
  next()
  ctx.body = 'hello, koa'
  console.log(222)
})

app.use(async (ctx, next) => {
  console.log(333)
  console.log(444)
})

app.listen(3000, () => {
  console.log(`The server is on port 3000`)
})