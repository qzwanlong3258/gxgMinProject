<script>
const regeneratorRuntime = require('./utils/regenerator-runtime/runtime.js');
const { setStorage, getStorage } = require('./utils/storage.js');
const { AUTH } = require('./config/router.js');
const { request } = require('./config/http.js');
const { LOGIN_TOKEN_REFRESH, LOGIN_OPENID_REFRESH } = require('./config/api.js');

export default {
	globalData: {
		typeId: '',
		fm: '',
		productImgList: [], // 选中的商品图片列表
		clotheInfo: {}, // 选中的衣服信息
		choosedProduceId: '', //选择产品后的id
		previewInfo: {}, // 预览信息
		addressInfor: null, // 选中的地址
		// backToDoOption: {}, //预览页面返回设计详情传递的参数
		//开始定制的画布大小
		moveViewWidth: 200,
		moveViewHeight: 228
	},
	data() {
		return {
			hasRefresh: true
		};
	},
	methods: {
		//判断设备是否是iPad
		isIpad: function() {
			if (getStorage('sysInfo').model.indexOf('iPad') > -1) {
				if (getStorage('sysInfo').windowWidth < 820) {
					this.$options.globalData.moveViewWidth = 350;
					this.$options.globalData.moveViewHeight = 400;
				} else {
					this.$options.globalData.moveViewWidth = 466;
					this.$options.globalData.moveViewHeight = 530;
				}
			}
		},
		canIuse: function() {
			return getStorage('isLogin') && this.data.hasRefresh;
		},
		getFrom: function(path, query) {
			for (let key in query) {
				path += path.indexOf('?') === -1 ? '?' : '&';
				path += `${key}=${query[key]}`;
			}
			this.$options.globalData.fm = `/${path}`;
		},
		handleLogin: async function() {
			//先要确保跳转的页面不请求接口
			this.hasRefresh = false;
			const isLogin = getStorage('isLogin');
			if (isLogin) {
				let tempToken = '';

				// 基于refreshToken的tempToken的刷新
				const refreshToken = getStorage('refreshToken');
				const res = await request({
					method: 'POST',
					url: `${LOGIN_TOKEN_REFRESH}?refreshToken=${refreshToken}`,
					needToken: false,
					showLoading: false,
					hideLoading: false,
					showErrorModal: false,
					errorText: 'refreshToken刷新失败'
				}).catch(err => console.log(err));
				if (res) {
					tempToken = res.token;
				} else {
					//基于openId的tempToken刷新
					const { openId } = getStorage('userInfo');
					const { header, data } = await request({
						method: 'POST',
						url: `${LOGIN_OPENID_REFRESH}?openId=${openId}`,
						needToken: false,
						showLoading: false,
						hideLoading: false,
						showErrorModal: false,
						errorText: 'openId刷新失败',
						returnHeader: true
					}).catch(err => console.log(err));
					tempToken = data.token;
					setStorage('refreshToken', header.Authorization);
				}
				setStorage('tempToken', tempToken);
				//跳转相对应的页面
				this.hasRefresh = true;
				uni.navigateTo({
					url: this.$options.globalData.fm,
					fail: () => {
						uni.switchTab({
							url: this.$options.globalData.fm
						});
					}
				});
			} 
		}
	},
	onLaunch: function(options) {
		let globalData = this.$options.data;
		if (!getStorage('sysInfo', true)) {
			const sysInfo = wx.getSystemInfoSync();
			const { screenWidth, screenHeight } = sysInfo;
			sysInfo.screenHeightRpx = (750 * screenHeight) / screenWidth;
			sysInfo.perRpx = screenWidth / 750;
			setStorage('sysInfo', sysInfo);
		}
		//判断是否是ipad
		this.isIpad();

		//获得启动项目的路径
		const { path, query } = options;
		this.getFrom(path, query);
		
		//处理token
		this.handleLogin();
	},
	onShow: function() {},
	onHide: function() {}
};
</script>

<style>
/*每个页面公共css */
@import './style/global.scss';
</style>
