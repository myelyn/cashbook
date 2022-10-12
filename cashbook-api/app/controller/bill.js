const Controller = require('egg').Controller

class BillController extends Controller {
  async add () {
    const { ctx } = this
    const { amount, type_id, type_name, date, pay_type, remark = '' } = ctx.request.body;
    if (!amount || !type_id || !type_name || !date || !pay_type) {
      ctx.body = {
        code: 400,
        msg: '参数错误',
        data: null
      }
      return
    }
    const { decodeUser } = ctx
    const user_id = decodeUser.id
    try {
      await ctx.service.bill.add({
        amount,
        type_id,
        type_name,
        date,
        pay_type,
        remark,
        user_id
      })
      ctx.body = {
        code: 200,
        msg: '请求成功',
        data: null
      }
    } catch(e) {
      console.log(e)
      ctx.body = {
        code: 500,
        msg: '系统错误',
        data: null
      }
    }
  }
}

module.exports = BillController