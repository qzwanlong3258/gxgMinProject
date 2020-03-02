/**
 * 储存页面路径，对应app.json的路由，用于页面跳转
 */

module.exports = {
  /**
   * 登录
   */
  AUTH: '/pages/auth/auth', //授权登录页
  
  /**
   * 首页
   */
  HOME_INDEX: '/pages/tabbar/home/home' ,//首页
  
  /**
   * 私人定制 
   **/
   PRIVATE_INDEX: '/pages/tabbar/todo/todo', //私人订制首页
   SELECT_TYPE: '/pages/selectType/selectType', //选择具体的衣服款式
   TODO_DETAIL: '/pages/todoDetail/todoDetail', //开始定制
   PERVIEW_DETAIL: '/pages/preview/preview', //预览设计
   WRITE_ORDER: '/pages/writeOrder/writeOrder', //填写订单
   ORDER_STATUS: '/pages/orderStatus/orderStatus', //订单状态
   
   /**
	* 个人中心
	* */
	MINE_IDNEX: '/pages/tabbar/mine/mine', //个人中心
	ADDRESS_INDEX: '/pages/addressIndex/addressIndex', //地址列表页
	ADDRESS_DETAIL: '/pages/addressDetail/addressDetail', //地址操作，增删改
	ORDER_LIST: '/pages/orderList/orderList', //订单列表
	REFUND_DETAIL: '/pages/refundOrder/refundOrder', //维权退款
  
}