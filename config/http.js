const {
	setStorage, getStorage
} = require('../utils/storage.js');
const {
	AUTH
} = require('./router.js');
import { LOGIN_TOKEN_REFRESH, LOGIN_OPENID_REFRESH } from '@/config/api.js';

const loading = {
	inLoading: false,
	showLoadind(loadingText) {
		!this.inLoading && uni.showLoading({
			title: loadingText,
			success: () => {
				this.inLoading = true;
			}
		});
	},
	hideLoading() {
		this.inLoading && uni.hideLoading({
			success: () => {
				this.inLoading = false;
			},
			fail(err) {
				console.warn(err);
			}
		});
	}
}

/**
 * http请求，对uni.request()的封装
 * @param {Object} obj - 整体参数
 * @param {string} [obj.method] - 请求方法
 * @param {string} [obj.url] - 开发者服务器接口
 * @param {(string|Object|Array|ArrayBuffer)} [obj.data] - 请求的参数
 * @param {string} [obj.dataType] - 对返回值的预处理
 * @param {string} [obj.responseType] - 响应数据类型
 * @param {Object} [obj.header] - 请求的Header,header中不能设置Referer
 * @return {Promise} 返回封装异步请求的Promise对象
 */
function request({
	method = 'GET',
	url = '',
	data = {},
	dataType = 'json',
	responseType = 'text',
	header = {},
	needToken = true,
	showLoading = true,
	loadingText = '数据加载中',
	hideLoading = true,
	showSucessToast = false,
	successText = "数据加载成功",
	showErrorModal = true,
	errorText = '数据加载失败',
	returnHeader = false,
	returnErrorCode = false,
	level = 1
} = {}) {
	let requestTask = null;
	const p = new Promise((resolve, reject) => {
		//判断是否显示请求的Loading
		if (showLoading) {
			loading.showLoadind(loadingText);
		}
		//判断请求是否需要带上token
		if (needToken) {
			const token = getStorage('tempToken')
			url = url + (url.indexOf('?') === -1 ? '?token=' : '&token=') + token
		}
		requestTask = uni.request({
			method,
			url,
			data,
			dataType,
			responseType,
			header,
			success: async function(res) {
				//判断是否隐藏请求的loading
				hideLoading && loading.hideLoading();
				const {
					statusCode,
					header,
					msg
				} = res
				// if (statusCode === 401) {
				// 	const {
				// 		data
				// 	} = res
				// 	const {
				// 		code
				// 	} = data
				// 	if(code === "1050"||code ==="1020"){
				// 		let pages = getCurrentPages();
				// 		(pages.length === 0 || pages[pages.length - 1].route !== AUTH) && uni.navigateTo({ url: AUTH});
				// 		return;
				// 	}
					
				// }
				if (statusCode === 200) {
					const {
						data
					} = res
					const {
						code
					} = data
					if (code === 0) {
						//判断是否显示请求成功的Toast
						if (showSucessToast) {
							uni.showToast({
								title: successText,
							})
						}
						if (returnHeader) {
							resolve({
								header,
								data: data.data
							})
						} else {
							resolve(data.data)
						}
					} else {
						const msg = `${errorText}: ${statusCode} - ${data.message || data.msg}`
						//判断是否显示请求成功的Modal
						if (showErrorModal) {
							uni.showModal({
								content: msg,
								showCancel: false
							})
						}
						if (returnErrorCode) {
							reject({
								code,
								msg
							})
						} else {
							reject(msg)
						}
					}
				} else {
					const msg = `${errorText}: ${statusCode}-${res.errMsg}`;
					// 判断是否显示请求失败的Modal
					if (statusCode === 401) {
						await refreshToken();
						if (level > 5) {
							console.error("刷新token请求超过五次");
							return;
						}
						request({
							method,
							url,
							data,
							dataType,
							responseType,
							header,
							needToken,
							showLoading,
							loadingText,
							hideLoading,
							showSucessToast,
							successText,
							showErrorModal,
							errorText,
							returnHeader,
							returnErrorCode,
							level: level + 1
						});
					} else if (showErrorModal) {
						uni.showModal({
							content: msg,
							showCancel: false
						});
						reject(msg);
					}
				}
			},
			fail(res) {
				if (hideLoading) {
					loading.hideLoading();
				}
				//判断是否显示请求失败的Modal
				if (showErrorModal) {
					uni.showModal({
						content: '哦豁，网络开小差了，再次请求试试',
						showCancel: false
					});
				}
				reject(res)
			}
		});
	});
	//将requestTask暴露出去
	p.abort = function() {
		requestTask.abort()
	}
	return p
}

/**
 * 基于refreshToken的tempToken的刷新
 */
let inRefreshToken = false;
const refreshToken = async function() {
	if (inRefreshToken === true) return;
	inRefreshToken = true;
	const isLogin = getStorage('isLogin');
	if (!isLogin) return;
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
	setStorage('tempToken', res.token);
	inRefreshToken = false;
}

module.exports = {
	request,
}
