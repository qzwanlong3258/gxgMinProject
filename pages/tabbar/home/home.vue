<template>
	<scroll-view scroll-y class='container'>
		<view class='home-top'>
			<image :src='topBoxImg.navImage' mode='aspectFit'></image>
			<view class='exclusive-cus' @click="goPrivatePage()">
				<image :src='topBoxImg.privateImg' mode='aspectFit'></image>
			</view>
		</view>
		<scroll-view scroll-x class='clothes-style'>
			<view class='clothes-list'>
				<view class='style-clonum' v-for='(item,index) in clothesList' :key='index' @click="goPrivatePage(item.id)">
					<image :src='item.imgUrl' mode='aspectFit'></image>
				</view>
			</view>
		</scroll-view>
		<view class='style-module' v-for="(item,index) in styleList" :key="index">
			<view class='style-title'>
				<view class='important-font'>{{item.name}}</view>
			</view>
			<List-Module title-font='title-font' :dataObj='item.componentInfo' class='list-module' />
		</view>
		<bottom-tip />
	</scroll-view>
</template>

<script>
	import {
		PRIVATE_INDEX
	} from '@/config/router.js';
	import ListModule from './components/HomeListModule';
	import BottomTip from './components/BottomTip';
	import {getList} from '@/api/home.js';
	import {
		toast
	} from '@/config/package.js';
	
	import {
		mapState,
		mapActions
	} from 'vuex';
	import {
		login
	} from '@/utils/openLogin.js';
	import {
		LOGIN_WECHAT_LOGIN,
	} from '@/config/api.js';
	import {
		APP_ID
	} from '@/config/common.js';
	import {
		request
	} from '@/config/http.js';
	const regeneratorRuntime = require('@/utils/regenerator-runtime/runtime.js')

	export default {
		data() {
			return {
				topBoxImg: {},
				styleList: [],
				session_key:'',
				appid:APP_ID
			};
		},
		components: {
			ListModule,
			BottomTip,
		},
		onLoad : async function(options) {
			//请求微信接口wx.login,获取code
			// console.log(122 )
			// const code = await login();
			
			// console.log(code);
			// console.log(APP_ID);
			// console.log(this.appid);
			
			
			
			
			// const {
			// 	session_key
			// } = await request({
			// 	method: 'POST',
			// 	url: `${LOGIN_WECHAT_LOGIN}?appId=${APP_ID}&code=${code}`,
			// 	needToken: false,
			// 	showLoading: false,
			// 	showErrorModal: false
			// }).catch(() => {
			// 	console.log('调用wx.login失败')
			// })
			// this.session_key = session_key;
			// setStorage('sessionKey', this.session_key);
			this.loadData();
		},
		computed: {
			...mapState({
				clothesList: state => {
					return state.category.list;
				}
			})
		},
		methods: {
			...mapActions('category',['getCategoryList']),
			loadData() {
				this.getCategoryList();
				getList().then(res => {
					this.topBoxImg = res.topBoxImg;
					this.styleList = res.styleList;
				});
			},
			goPrivatePage: function(id) {
				getApp().globalData.typeId = id
				uni.switchTab({
					url: PRIVATE_INDEX,
				});
			}
		}
	};
</script>

<style>
	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}

	.home-top {
		width: 100%;
		height: 1206rpx;
	}

	.home-top image {
		width: 100%;
		height: 100%;
	}

	.exclusive-cus {
		width: 390rpx;
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
		font-size: 36rpx;
		color: #fff;
		position: absolute;
		top: 816rpx;
		margin-left: 178rpx;

	}

	.clothe-back-btn {
		width: 94%;
		margin-left: 3%;
		height: 100rpx;
		border-radius: 57rpx;
		box-shadow: 0 8rpx 20rpx 4rpx rgba(0, 0, 0, .3);
		position: absolute;
		z-index: 0;
		margin-top: -262rpx;
	}

	.clothes-style {
		position: relative;
		width: 96%;
		z-index: 2;
		height: 340rpx;
		margin: 0 2%;
	}

	.clothes-style .clothes-list {
		width: 100%;
		height: 340rpx;
		display: flex;
	}

	.clothes-style .style-clonum {
		width: 182rpx;
		height: 340rpx;
	}

	.style-clonum image {
		width: 182rpx;
		height: 340rpx;
	}

	.list-module {
		margin-top: 70rpx;
	}

	.style-module {
		width: 96%;
		margin-left: 2%;
	}

	.style-module .style-title {
		width: 96%;
		height: 80rpx;
		line-height: 80rpx;
		display: flex;
		justify-content: space-between;
		margin-left: 2%;
	}

	.style-title .view-more-btn {
		width: 152rpx;
		height: 40rpx;
		background: #434343;
		font-size: 20rpx;
		color: #fff;
		text-align: center;
		line-height: 40rpx;
		border-radius: 20rpx;
		margin-top: 20rpx;
	}

	.style-title .view-more-btn image {
		width: 100%;
		height: 100%;
	}
</style>
