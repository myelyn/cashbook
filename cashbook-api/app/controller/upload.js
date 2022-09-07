const fs = require('fs')
const mkdirp = require('mkdirp')
const moment = require('moment')
const path = require('path')
const Controller = require('egg').Controller

class uploadController extends Controller {
  async upload() {
    const { ctx } = this
    const file = ctx.request.files[0]
    try {
      const f = fs.readFileSync(file.filepath)
      const day = moment(new Date()).format('YYYYMMDD')
      const dir = path.join(this.config.uploadDir, day)
      await mkdirp(dir)
      const uploadDir = path.join(dir, Date.now() + path.extname(file.filename))
      console.log(uploadDir)
      fs.writeFileSync(uploadDir, f)
      ctx.body = {
        code: 200,
        msg: '上传成功',
        data: uploadDir.replace('app', '')
      }
    } catch(e) {
      ctx.body = {
        code: 500,
        msg: '上传失败',
        data: null
      }
    } finally {
      ctx.cleanupRequestFiles()
    }
  }
}

module.exports = uploadController