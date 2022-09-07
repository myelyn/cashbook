module.exports = () => {
  return async (ctx, next) => {
    const secret = ctx.app.config.jwt.secret
    const token = ctx.request.header.authorization
    console.log(token)
    if (!token) {
      ctx.body = {
        code: 401,
        msg: 'token不存在',
        data: null
      }
      return 
    }
    try {
      const decode = ctx.app.jwt.verify(token, secret)
      ctx.decodeUser = decode
      await next()
    } catch(e) {
      ctx.body = {
        code: 401,
        msg: 'token已过期，请重新登录',
        data: null
      }
    }
  }
}