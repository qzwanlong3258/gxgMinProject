<template>
	<scroll-view scroll-y class="container" @scrolltolower="worksLower">
		<view class="user-infor">
			<mine-infor :userInfo="userInfo" :session_key="session_key" :isLogin="isLogin" :getStorageData="getStorageData"></mine-infor>
		</view>
		<view class="user-order">
			<order-nav :orderList='status' :isMinePage='true'></order-nav>
		</view>
		<view class="user-nav">
			<view class="nav-list">
				<!-- <view v-for='(item,index) in navList' :key='index' :data-id='item.id' :data-phone='item.phone?item.phone: ""'
				 @click="clickNav" class="nav-clonum">
					<i :class='["iconfont",item.icon,"nav-icon"]'></i>
					<text class="nav-name">{{item.title}}</text>
					<i class="iconfont iconright"></i>
				</view> -->
				<view  class="nav-clonum" v-if="getStorageData"  @click="clickNavAdress">
					<i class="iconfont iconweizhi-tianchong"></i>
					<text class="nav-name">地址管理簿</text>
					<i class="iconfont iconright"></i>
				</view>
				
				<button  v-if='!getStorageData' style="padding: 0;background:#fff ;" class="nav-clonum" open-type="getUserInfo" @getuserinfo="getUserInfo" >
					<i class="iconfont iconweizhi-tianchong"></i>
					<text class="nav-name">地址管理簿</text>
					<i class="iconfont iconright"></i>
				</button>
				<view class="nav-clonum" @click="clickNavkefu">
					<i class="iconfont iconkefu"></i>
					<text class="nav-name">咨询客服</text>
					<i class="iconfont iconright"></i>
				</view>
			</view>
		</view>
		<view class="user-creation">
			<mine-creation :creationList='creationList' @deleteSuccess='deleteWorksSuccess'></mine-creation>
		</view>
		<NoMoreData :isShow='isShowNoMoreData' />
	</scroll-view>
</template>

<script>
	import MineInfor from '@/components/MineInfor';
	import OrderNav from '@/components/OrderNav';
	import MineCreation from '@/components/MineCreation';
	import {
		TODO_CLOTHE,
		TODO_CLOTHE_TODO
	} from '@/config/image.js';
	import {
		makePhoneCall
	} from '@/config/package.js';
	import {
		ADDRESS_INDEX,AUTH
	} from '@/config/router.js';
	import {
		getCreationList
	} from '@/api/mine.js';
	import {
		getStorage
	} from '@/utils/storage.js';
	import {mapState,mapActions} from 'vuex';
	import NoMoreData from '@/components/NoMoreData.vue';
	// 微信登录
	import {
		APP_ID
	} from '@/config/common.js';
	import {
		request
	} from '@/config/http.js';
	import {
		login
	} from '@/utils/openLogin.js';
	import {
		LOGIN_WECHAT_LOGIN,
		LOGIN_WECHAT_GET_USERINFO,
		LOGIN_APP_REGISTER_LOGIN
	} from '@/config/api.js';
	import {
		setStorage
	} from '@/utils/storage.js'
	
	import {
		AUTH_GXG_LOGO,
		AUTH_ENTER_IMG,
		AUTH_BTN_IMG
	} from '@/config/image.js'
	const regeneratorRuntime = require('@/utils/regenerator-runtime/runtime.js')
	
	export default {
		data() {
			return {
				isLogin: false,
				userInfo: {},
				// navList: [{
				// 		id: 1,
				// 		title: '地址管理簿',
				// 		icon: 'iconweizhi-tianchong'
				// 	},
				// 	{
				// 		id: 2,
				// 		title: '咨询客服',
				// 		icon: 'iconkefu',
				// 		phone: '0574-83017657'
				// 	}
				// ],
				creationList: {},
				worksPagination: {
					page: 1,
					size: 6
				},
				count: 0,
				isShowNoMoreData: false,
				// 微信登录
				session_key:'',
				getStorageData:false,
				gxgLogo: AUTH_GXG_LOGO,
				gxgEnter: AUTH_ENTER_IMG,
				gxgBtn: AUTH_BTN_IMG,
			}
		},
		components: {
			MineInfor,
			OrderNav,
			MineCreation,
			NoMoreData
		},
		onLoad : async function() {
			if (!getStorage('tempToken')){
				
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
			}
			
		},
		onShow() {
			if (!getStorage('tempToken')){
				this.getStorageData = false
				let pages = getCurrentPages();
				(pages.length === 0 || pages[pages.length - 1].route !== AUTH) && uni.reLaunch({ url: pages[pages.length - 1].route});
				return;
			} else {
				this.getStorageData = true
			}
			
			
			this.loadData();
			this.userInfo = getStorage("userInfo");
		},
		computed: {
			...mapState('order',['status'])
		},
		methods: {
			...mapActions('order',['getOrderStatus']),
			loadData() {
				this.getOrderStatus();
				getStorage("isLogin",false).then(res => {
					this.isLogin = res;
				});
				this.worksPagination.page = 1;
				getCreationList(this.worksPagination).then(res => {
					this.creationList = res.list;
					this.count = res.count;  
				});
			},
			// clickNav: function(e) {
			// 	if (e.currentTarget.dataset.id == 1) {
			// 		uni.navigateTo({
			// 			url: `${ADDRESS_INDEX}?srouce=mine`
			// 		})
			// 	} else if (e.currentTarget.dataset.id == 2) {
			// 		makePhoneCall({
			// 			phone: 0574-83017657
			// 		})
			// 	}
			// },
			clickNavAdress:function() {
				uni.navigateTo({
					url: `${ADDRESS_INDEX}?srouce=mine`
				})
			},
			clickNavkefu:function() {
				makePhoneCall({
					phone: "0574-83017657"
				})
			},
			worksLower() {
				if (this.creationList.length < Number(this.count)) {
					this.worksPagination.page++;
					getCreationList(this.worksPagination,true).then(res => {
						this.creationList.push(...res.list);
						this.count = res.count;
					});
				} else {
					this.isShowNoMoreData = true;
					setTimeout(() => {
						this.isShowNoMoreData = false;
					}, 1000);
				}
			},
			deleteWorksSuccess({id}) {
				let index = this.creationList.findIndex(item => item.id == id);
				this.creationList.splice(index,1);
				this.count--;
			},
			// 微信登录
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
							page.onLoad()
							page.onShow()
							// let pages = getCurrentPages();
							// (pages.length === 0 || pages[pages.length - 1].route !== AUTH) && uni.reLaunch({ url: pages[pages.length - 1].route});
						
					
				}
			
		}
	}
</script>

<style lang="scss" scoped>
	.user-order {
		width: 100%;
		position: absolute;
		margin-top: -100upx;
	}

	.user-nav {
		width: 100%;
		border-bottom: 4upx solid #dcdcdc;
		border-bottom-left-radius: 120upx;
		border-bottom-right-radius: 120upx;
		box-shadow: 0 6upx 4upx 4upx rgba(0, 0, 0, 0.1);
		background: #fff;
		padding-bottom: 148upx;
		position: absolute;
		margin-top: 300rpx;

		.nav-list {
			width: 82%;
			margin: 0 9%;
			border: 1upx solid #dcdcdc;
			border-radius: 10upx;

			.nav-clonum {
				width: 90%;
				margin-left: 5%;
				;
				display: flex;
				height: 80upx;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1upx solid #dcdcdc;

				&.nav-clonum:last-child {
					border: none
				}

				.nav-icon {
					font-size: 50upx;
				}

				.nav-name {
					text-align: left;
					// position: absolute;
					// left: 180upx;
					font-size: 28upx;
				}
			}
		}
	}

	.user-creation {
		position: absolute;
		width: 100%;
		margin-top: 700upx;
	}
</style>
