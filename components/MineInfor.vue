<template>
	<view class="user-box">
		<view class="user-avatar">
			<image :src='avatar'></image>
		</view>
		<view v-if='getStorageData' class="show-btn" @click="!userInfo.phone&&showLoginModel()">{{value}}</view>
		<button style="display: block;" v-if='!getStorageData' class="show-btn" open-type="getUserInfo" @getuserinfo="getUserInfo" >
			登录<image :src="gxgBtn"></image>
		</button>
		<view class="login-bg">
			<image :src="loginbg"></image>
		</view>
		<view v-if="isShowModel" class='transparent-background fixed-document'>
			<view class='model-box'>
				<view class='column-box' style='border:none'><text>注册手机</text></view>
				<view class='column-box input-phone'><input type='number' placeholder='请输入手机号码' v-model="phoneNum" maxlength="11"></input></view>
				<view class='column-box' style='border:none;display:flex;display:-webkit-flex;'><input style='width:46%' type='number'
					 placeholder='验证码' v-model="codeNum"></input>
					<view class='get-code' @click='getCode'>{{codeValue}}</view>
				</view>
				<!-- <view class='column-box'><button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" class='customize-button'
					 style='height:80upx;line-height:80upx;margin-left:5%;width:88%;font-size: 30upx;'>一键绑定微信号码</button></view> -->
				<view class='column-box bottom-btn' style='border:none'>
					<view style='color:#999;border-right:1upx solid #eee;' @click='showLoginModel'>取消</view>
					<view class='primary-color' @click='getCardInfro'>确定</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {
		LOGIN_BG,AVATAR
	} from '@/config/image.js';
	import {sendVerificationCode,bindPhone} from '@/api/mine.js';
	import {toast} from '@/config/package.js';
	import {
		AUTH
	} from '@/config/router.js';
	import {
		getStorage
	} from '@/utils/storage.js';
	import Login from '../pages/auth/auth';
	import MineCreation from '@/components/MineCreation';
	// 微信登录
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
	const regeneratorRuntime = require('@/utils/regenerator-runtime/runtime.js')

	export default {
		props: {
			isLogin: {
				type: Boolean,
				default: false
			},
			userInfo: {
				type: Object,
				default: () => {
					return {};
				}
			},
			session_key: {
				type: String,
				default: ''
			},
			getStorageData: {
				type: Boolean,
				default: false
			}
		},
		components: {
		      Login,
			  // RegisteredPhone
		    },
		data() {
			return {
				loginbg: LOGIN_BG,
				isShowModel: false,
				codeValue: '获取验证码',
				avatar: AVATAR,
				phoneNum: '',
				value: '注册会员',
				codeNum: '',
				// 微信登录
				gxgLogo: AUTH_GXG_LOGO,
				gxgEnter: AUTH_ENTER_IMG,
				gxgBtn: AUTH_BTN_IMG
				
				
			};
		},
		watch: {
			userInfo(userInfo) {
				this.avatar = userInfo.avatarUrl;
				this.phoneNum = userInfo.phone;
				this.value = userInfo.phone ? userInfo.nickName : '注册会员';
			}
		},
		methods: {
			showLoginModel: function() {
				this.isShowModel = !this.isShowModel
			},
			
			//获取验证码
			getCode: function() {
				const _this = this;
				if (this.codeValue == '获取验证码' && /^1\d{0,10}$/g.test(this.phoneNum)) {
					sendVerificationCode(this.phoneNum).then(res => {
						this.getCodeTime();
					});
				} else {
					wx.showToast({
						title: '请填写手机号码',
						icon: 'none',
						duration: 2000
					})
				}
			},
			
			//验证码倒计时
			getCodeTime: function (options) {
			  var that = this;
			  var currentTime = 90;
			  that.codeValue = currentTime + '秒'
			  let interval = setInterval(function () {
			    that.codeValue = (currentTime - 1) + '秒'
			    currentTime--;
			    if (currentTime <= 0) {
			      clearInterval(interval)
				  that.codeValue = '获取验证码'
			    }
			  }, 1000)
			},
			
			getPhoneNumber(e) {
				let iv = e.detail.iv;
				let encryptedData = e.detail.encryptedData;
			},
			
			getCardInfro() {
				bindPhone({
					phone: this.phoneNum,
					code: this.codeNum,
					name: this.userInfo.nickName
				}).then(res => {
					this.value = this.userInfo.nickName;
					this.showLoginModel();
				})
			},
			// 微信登录
			getUserInfo: async function(e) {
					if (!this.session_key) {
						return wx.showToast({
							title: '登录失败，重新授权试试',
							icon: 'none'
						})
					}
					if(!e.detail.iv){
					        uni.showToast({
					         title:"您取消了授权,登录失败",
					         icon:"none"
					        });
					        return false;
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
					page.onLoad()
					page.onShow()
					// let pages = getCurrentPages();
					// (pages.length === 0 || pages[pages.length - 1].route !== AUTH) && uni.reLaunch({ url: pages[pages.length - 1].route});
				}
			
		}
	}
</script>

<style lang="scss" scoped>
	.user-box {
		width: 100%;
		height: 490upx;

		.user-avatar {
			position: relative;
			z-index: 2;
			width: 176upx;
			height: 176upx;
			border-radius: 50%;
			margin: 64upx auto;

			image {
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
		}

		.show-btn {
			position: absolute;
			z-index: 1;
			width: 620upx;
			height: 70upx;
			background: #000000;
			color: #FFFFFF;
			font-size: 28upx;
			border-radius: 10upx;
			text-align: center;
			line-height: 70upx;
			margin-left: 65upx;
		}
		

		.login-bg {
			height: 500upx;
			width: 100%;
			position: absolute;
			top: 50upx;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	.fixed-document {
		position: fixed;
		z-index: 3;
	}

	.model-box view {
		font-size: 30upx;
	}

	.user-phone {
		display: block;
		font-size: 30upx;
	}

	.flash-pay {
		width: 614upx;
		height: 800upx;
		margin: 156upx 68upx;
		background: #fff;
		border-radius: 20upx;
	}

	.content-top {
		width: 574upx;
		margin-left: 20upx;
		padding-top: 15px;
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		font-size: 30upx;
	}

	.content-bottom {
		margin-left: 20upx;
		margin-top: 16upx;
		font-size: 28upx;
	}

	.content-bottom text {
		font-size: 38upx;
		margin-left: 10upx;
	}

	.content-wxacode {
		width: 452upx;
		height: 452upx;
		margin-top: 54upx;
		margin-left: 80upx;
	}

	.content-wxacode image {
		width: 100%;
		height: 100%;
	}

	.falsh-pay {
		width: 690upx;
		margin-left: 30upx;
		margin-top: 30upx;
		height: 350upx;
		border-radius: 14upx;
		background: #fff;
	}

	.content-tip {
		width: 100%;
		text-align: center;
		font-size: 28upx;
		margin-top: 30upx;
	}

	.form-list {
		background: #fff;
		margin-top: 22upx;
	}

	.list-column {
		display: flex;
		display: -webkit-flex;
		height: 100upx;
		border-bottom: 1upx solid #eee;
		line-height: 100upx;
		font-size: 30upx;
		padding: 0 20upx;
	}


	.column-input input {
		margin-top: 24upx;
		font-size: 30upx;
		margin-left: 20upx;
		width: 500upx;
	}

	.column-input text {
		font-size: 30upx;
		margin-left: 20upx;
		width: 400upx;
	}

	.list-column .adress-icon {
		position: absolute;
		right: 30upx;
	}

	.adress-icon i {
		font-size: 40upx;
	}

	.do-reservation {
		margin-left: 105upx;
	}

	.model-box {
		width: 84%;
		height: 426upx;
		background: #fff;
		border-radius: 14upx;
		margin-left: 7%;
		margin-top: 40%;
	}

	.column-box {
		width: 100%;
		height: 100upx;
		border-bottom: 1upx solid #eee;
		text-align: center;
		line-height: 100upx;
		font-size: 32upx;
	}

	.column-box text {
		font-weight: bold;
		font-size: 32upx;
	}

	.bottom-btn {
		display: flex;
		display: -webkit-flex;
	}

	.input-phone {
		border-bottom: none;
		border-top: 1upx solid #eee;
		padding-top: 24upx;
	}

	.bottom-btn view {
		width: 50%;
		text-align: center;
	}

	.column-box i {
		position: absolute;
		margin-left: 20upx;
	}

	.column-box input {
		width: 84%;
		margin-left: 5%;
		height: 70upx;
		border-radius: 14upx;
		background: #eee;
		text-align: left;
		padding-left: 22upx;
	}

	.column-box .get-code {
		width: 30%;
		height: 56upx;
		line-height: 56upx;
		border-radius: 30upx;
		border: 1upx solid #000;
		color: #000;
		margin-left: 50upx;
		font-size: 28upx;
		margin-top: 6upx;
	}
</style>

