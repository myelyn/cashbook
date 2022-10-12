const Controller = require('egg').Controller

class userController extends Controller {
  async register() {
    const { ctx } = this
    const { username, password } = ctx.request.body
    // 非空判断
    if (!username || !password) {
      ctx.body = {
        code: 500,
        msg: '账号密码不能为空',
        data: null
      }
      return
    }

    // 判断用户名是否存在
    const userInfo = await ctx.service.user.getUserByName(username)
    console.log(userInfo)
    if (userInfo && userInfo.id) {
      ctx.body = {
        code: 500,
        msg: '用户名已经存在',
        data: null
      }
      return
    }
    
    // 提交注册信息
    const result = await ctx.service.user.register({
      username,
      password,
      ctime: Date.now()
    })

    if (result) {
      ctx.body = {
        code: 200,
        msg: '注册成功',
        data: null
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '注册失败',
        data: null
      }
    }
  }

  async login() {
    const { ctx, app } = this
    const { username, password } = ctx.request.body
    // 非空判断
    if (!username || !password) {
      ctx.body = {
        code: 500,
        msg: '账号密码不能为空',
        data: null
      }
      return
    }

    // 判断用户是否存在
    const userInfo = await ctx.service.user.getUserByName(username)
    if (!userInfo || !userInfo.id) {
      ctx.body = {
        code: 500,
        msg: '账号不存在',
        data: null
      }
      return
    }

    // 判断密码是否正确
    if (userInfo && userInfo.password !== password) {
      ctx.body = {
        code: 500,
        msg: '账号密码错误',
        data: null
      }
      return
    }

    // 校验通过，生成令牌
    const token = app.jwt.sign({
      id: userInfo.id,
      username,
      exp: Math.floor(Date.now()/1000) + 60 * 60 * 24
    }, app.config.jwt.secret)

    ctx.body = {
      code: 200,
      msg: '登录成功',
      data: {
        token
      }
    }
  }

  async getUserInfo () {
    const { ctx } = this
    const { decodeUser } = ctx
    if (decodeUser && decodeUser.id) {
      const result = await ctx.service.user.getUserByName(decodeUser.username)
      if (!result) {
        ctx.body = {
          code: 500,
          msg: '账号不存在',
          data: null
        }
        return
      }
      const { id, username, signature, avatar, ctime } = result
      ctx.body = {
        code: 200,
        msg: '操作成功',
        data: {
          id,
          username,
          signature,
          avatar,
          ctime
        }
      }
    }
  }

  async editUserInfo() {
    const { ctx } = this
    const { decodeUser } = ctx
    const { signature, avatar } = ctx.request.body

    const userInfo = await ctx.service.user.getUserByName(decodeUser.username)
    if (!userInfo) {
      ctx.body = {
        code: 500,
        msg: '用户不存在',
        data: null
      }
      return
    }
    const result = await ctx.service.user.editUserInfo({
      ...userInfo,
      signature,
      avatar
    })
    if (!result) {
      ctx.body = {
        code: 500,
        msg: '操作失败',
        data: null
      }
      return
    }
    ctx.body = {
      code: 200,
      msg: '修改成功',
      data: null
    }
  }
}

module.exports = userController