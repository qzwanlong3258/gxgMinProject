/**
 * 储存图片路径
 */
//const baseUrl = '/static/img';
const baseUrl = 'http://gxgbasic.gxggroup.cn'
const authUrl = 'https://gxgbasic.gxggroup.cn/images'
// const baseUrl = 'https://192.168.3.25:8081'
// const authUrl = 'https://192.168.3.25:8081/images'
const staticUrl = '/static/img'
module.exports = {
	/**
	 * 授权背景图
	 */
	//AUTH_BACKGROUND_IMG: `${baseUrl}/auth.jpg`, //授权页背景图
	AUTH_GXG_LOGO: `${authUrl}/gxglogo.png`, //授权页gxg的logo
	AUTH_ENTER_IMG: `${authUrl}/gxgenter.png`, //授权页邀请提示
	AUTH_BTN_IMG: `${authUrl}/gxgbtn.png`, //开始进入图片
	//开始定制三个按钮
	TODO_SUOFANG:`${staticUrl}/todo/suofang.png`,
	TODO_QUEDING:`${staticUrl}/todo/queding.png`,
	TODO_SHANCHU:`${staticUrl}/todo/shanchu.png`,
	/*我的*/
    LOGIN_BG: `${baseUrl}/loginbg.png`, //注册背景图
	NULL_DATA: `${baseUrl}/nullData.png`, //空数据
}
