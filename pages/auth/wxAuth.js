import {
	APP_ID
} from '@/config/common.js'
import {
	request
} from '@/config/http.js'
import {
	login
} from '@/utils/openLogin.js'
import {
	setStorage
} from '@/utils/storage.js'
import {
	LOGIN_WECHAT_LOGIN,
	LOGIN_WECHAT_GET_USERINFO,
	LOGIN_APP_REGISTER_LOGIN
} from '@/config/api.js'
import {
	AUTH_GXG_LOGO,
	AUTH_ENTER_IMG,
	AUTH_BTN_IMG
} from '@/config/image.js'
import {
		AUTH
	} from '@/config/router.js';
const regeneratorRuntime = require('@/utils/regenerator-runtime/runtime.js')
const wxAuth = {
	data() {
		return {
			gxgLogo: AUTH_GXG_LOGO,
			gxgEnter: AUTH_ENTER_IMG,
			gxgBtn: AUTH_BTN_IMG,
			session_key: ''
		}
	},
	methods: {
		init :async function() {
			//请求微信接口wx.login,获取code
			const code = await login();
			const {
				session_key
			} = await request({
				method: 'POST',
				url: `${LOGIN_WECHAT_LOGIN}?appId=${APP_ID}&code=${code}`,
				needToken: false,
				showLoading: false,
				showErrorModal: false
			}).catch(() => {
				console.log('调用wx.login失败')
			})
			this.session_key = session_key;
			this.getUserInfo()
		},
		getUserInfo: async function(e) {
			if (!this.session_key) {
				return wx.showToast({
					title: '登录失败，重新授权试试',
					icon: 'none'
				})
			}
			const {
				encryptedData,
				iv
			} = e.detail

			//获取用户的微信信息
			const {
				openId,
				avatarUrl,
				nickName
			} = await request({
				method: 'POST',
				url: LOGIN_WECHAT_GET_USERINFO,
				data: {
					encryptedData,
					iv,
					"appId": APP_ID,
					"session_key": this.session_key
				},
				needToken: false,
				showLoadind: false,
				hideLoading: false,
				errorText: '登录失败'
			});
			//进行用户注册或登录，将返回的信息储存在本地缓存 
			const {
				header,
				data
			} = await request({
				method: 'POST',
				url: LOGIN_APP_REGISTER_LOGIN,
				data: {
					nickName,
					appId: APP_ID,
					openid: openId,
					headImg: avatarUrl
				},
				needToken: false,
				loadingText: '正在登录',
				returnHeader: true,
				errorText: '登录失败'
			});
			setStorage('sessionKey', this.session_key)
			setStorage('tempToken', data.token)
			setStorage('refreshToken', header.Authorization)
			setStorage('userInfo', data.UserInfo)
			setStorage('isLogin', true)
			let pages = getCurrentPages();
			let page = pages[pages.length - 1];
			page.onShow()
			// let pages = getCurrentPages();
			// (pages.length === 0 || pages[pages.length - 1].route !== AUTH) && uni.reLaunch({ url: pages[pages.length - 1].route});
		}
	},
	// 组件生命周期
	created: async function(options) {
		//请求微信接口wx.login,获取code
		const code = await login();
		const {
			session_key
		} = await request({
			method: 'POST',
			url: `${LOGIN_WECHAT_LOGIN}?appId=${APP_ID}&code=${code}`,
			needToken: false,
			showLoading: false,
			showErrorModal: false
		}).catch(() => {
			console.log('调用wx.login失败')
		})
		this.session_key = session_key;
	},
	// onLoad: async function(options) {
	// 	//请求微信接口wx.login,获取code
	// 	const code = await login();
	// 	const {
	// 		session_key
	// 	} = await request({
	// 		method: 'POST',
	// 		url: `${LOGIN_WECHAT_LOGIN}?appId=${APP_ID}&code=${code}`,
	// 		needToken: false,
	// 		showLoading: false,
	// 		showErrorModal: false
	// 	}).catch(() => {
	// 		console.log('调用wx.login失败')
	// 	})
	// 	this.session_key = session_key;
	// },
	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
}

export default wxAuth;
