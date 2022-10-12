const Service = require('egg').Service
class BillService extends Service {
  async add (params) {
    console.log(params)
    const { app } = this
    try {
      const result = await app.mysql.insert('bill', params)
      return result
    } catch(e) {
      console.log(e)
      throw new Error(e)
    }
  }
}
module.exports = BillService