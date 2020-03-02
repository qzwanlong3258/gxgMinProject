const baseUrl = 'https://gxgbasic.gxggroup.cn:8081';
// const baseUrl = 'https://192.168.3.25:8081';

const auth = `${baseUrl}/wx/user`;

module.exports = {
	/** 登录 */
	LOGIN_WECHAT_LOGIN: `${auth}/getSessionkey`,
	LOGIN_WECHAT_GET_USERINFO: `${auth}/getUserInfo`,
	LOGIN_WECHAT_GET_PHONENUM: `${auth}/getPhoneNumber`,
	LOGIN_APP_REGISTER_LOGIN: `${auth}/register`,
	LOGIN_TOKEN_REFRESH: `${auth}/refresh`,
	LOGIN_OPENID_REFRESH: `${auth}/refreshOpenId`,
	
	/** ---------------------- 首页 ---------------------- **/
	
	// 获取主题
	GET_THEME: `${baseUrl}/index/queryIndex`,
	// 获取品类列表
	GET_CATEGORY: `${baseUrl}/index/queryCategory`,
	// 加载样式列表
	GET_STYLE_LIST: `${baseUrl}/index/LoadIndex`,
	
	/** ---------------------- 个性定制 ---------------------- **/
	
	// 通过品类获取版型
	GET_RELEASE_BY_CATEGORY: `${baseUrl}/cust/loadVersionByCategoryId`,
	
	/** ---------------------- 选择属性 ---------------------- **/
	
	// 获取版型详情
	GET_RELEASE_DETAIL: `${baseUrl}/cust/LoadModelByVersionId`,
	// 通过版型颜色尺码性别获取商品信息
	GET_PRODUCT_BY_RELEASEID_COLOR_SIZE_SEX: `${baseUrl}/cust/LoadModelInfoByVersionId`,
	// 获取商品图片
	GET_PRODUCT_IMG_BY_RELEASEID_COLOR_SIZE_SEX: `${baseUrl}/cust/LoadModelImgByVersionId`,
	// 获取商品尺寸
	GET_PRODUCT_SIZE: `${baseUrl}/cust/getGoodsSize`,
	
	/** ---------------------- 开始定制 ---------------------- **/
	
	// 加载元素
	LOAD_ELEMENT: `${baseUrl}/cust/loadElement`,
	// 获取系列列表
	GET_SERIES: `${baseUrl}/cust/loadSeries`,
	// 获取图案列表
	GET_PATTERN: `${baseUrl}/cust/loadPrinting`,
	// 获取商品图片列表
	GET_PRODUCT_IMG: `${baseUrl}/cust/LoadModelImgByGoodsId`,
	// 获取商品详情
	GET_MODEL: `${baseUrl}/wxorder/queryModel`,
	// 获取字体颜色列表
	GET_FONT_COLOR: `${baseUrl}/cust/loadColor`,
	// 获取字体类型列表
	GET_FONT_FAMILY: `${baseUrl}/cust/loadFont`,
	// 获取字体大小列表
	GET_FONT_SIZE: `${baseUrl}/cust/loadSize`,
	// 保持设计
	SAVE_DESIGN: `${baseUrl}/cust/SaveQreview`,

	/** ---------------------- 预览设计 ---------------------- **/
	
	// 创建订单
	CREATE_ORDER: `${baseUrl}/wxorder/createOrder`,
	
	/** ---------------------- 填写订单 ---------------------- **/
	
	// 获取物流信息
	GET_LOGISTICS: `${baseUrl}/wxorder/getLogistics`,
	// 获取收货地址
	GET_RECEIVE: `${baseUrl}/wxorder/LoadReceive`,
	// 提交订单
	SUBMIT_ORDER: `${baseUrl}/wxorder/subOrder`,
	// 统一下单
	UNIFIED_ORDER: `${baseUrl}/payment/toPay`,
	// 支付成功
	PAY_SUCCESS: `${baseUrl}/wxorder/OrderPay`,
	
	/** ---------------------- 订单状态 ---------------------- **/
	
	// 获取订单详情
	GET_ORDER_DETAIL: `${baseUrl}/wxorder/queryOrderDetails`,
	// 获取订单按钮
	GET_ORDER_BUTTON: `${baseUrl}/wxorder/Loadbutton`,
	// 删除订单
	DELETE_ORDER: `${baseUrl}/wxorder/deleteOrder`,
	//确认收货
	ORDER_DELIVERY: `${baseUrl}/wxorder/OrderDelivery`,
	
    /** ---------------------- 操作地址 ---------------------- **/
	
	// 添加收货地址
	ADD_RECEIVE_ADDRESS: `${baseUrl}/wxorder/addReceive`,
	// 删除收货地址
	DELETE_RECEIVE_ADDRESS: `${baseUrl}/wxorder/deleteReceive`,
	// 更新收货地址
	UPDATE_RECEIVE_ADDRESS: `${baseUrl}/wxorder/updateReceive`,
	// 修改订单收货地址
	UPDATE_ORDER_ADDRESS: `${baseUrl}/wxorder/updateOrderReceive`,
	
	/** ---------------------- 个人中心 ---------------------- **/
	
	// 获取订单状态
	GET_ORDER_STATUS: `${baseUrl}/wxorder/LoadOrderInfo`,
	// 获取订单列表
	GET_ORDER_LIST: `${baseUrl}/wxorder/LoadOrderList`,
	// 获取我的作品
	GET_WORKS: `${baseUrl}/wxorder/LoadMyGoods`,
	// 发送验证码
	SEND_VERIFICATION_CODE: `${baseUrl}/wx/login/code`,
	// 删除作品
	DELETE_WORKS: `${baseUrl}/wxorder/deleteGoods`,
	// 绑定手机号
	BIND_PHONE: `${baseUrl}/wx/login/information`,
	
	
	/** ---------------------- 退款维权 ---------------------- **/
	
	GET_ALTER_SALE: `${baseUrl}/wxorder/returnOrder`
	
   }
