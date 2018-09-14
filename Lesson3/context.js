// module.exports = {
//   get query () {
//     return this.request.query
//   },

//   get body () {
//     return this.response.body
//   },

//   set body (data) {
//     this.response.body = data
//   },

//   get status () {
//     return this.response.status
//   },

//   set status (statusCode) {
//     this.response.status = statusCode
//   }

// }

const proto = Object.create(null)

const requestSet = []
const requestGet = ['query']

const responseSet = ['body', 'status']
const responseGet = responseSet

requestSet.forEach(property => {
  Object.defineProperty(proto, property, {
    configurable: true,
    enumerable: true,
    set (val) {
      this.request[property] = val
    }
  })
})

requestGet.forEach(property => {
  Object.defineProperty(proto, property, {
    configurable: true,
    enumerable: true,
    get () {
      return this.request[property]
    }
  })
})

responseSet.forEach(property => {
  Object.defineProperty(proto, property, {
    configurable: true,
    enumerable: true,
    set (val) {
      this.response[property] = val
    }
  })
})

responseGet.forEach(property => {
  Object.defineProperty(proto, property, {
    configurable: true,
    enumerable: true,
    get () {
      return this.response[property]
    }
  })
})

module.exports = proto