
const { getStorage } = require('../utils/storage.js')
/**
 * 常用的变量(appId,appSecret,reg等)
 */

module.exports = {
  APP_ID: 'wx33e656ee020dc81d',
  APP_SECRET: '7a24d78c795fc88ff792ec07db86754c',
  
  //上传上传图片路径
  uploadImageUrl: `https://gxgbasic.gxggroup.cn:6303/ftp/upload?token=${getStorage('tempToken')}`,
  
  
}