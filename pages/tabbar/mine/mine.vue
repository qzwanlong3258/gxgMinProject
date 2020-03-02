<template>
	<scroll-view scroll-y class="container" @scrolltolower="worksLower">
		<view class="user-infor">
			<mine-infor :userInfo="userInfo" :isLogin="isLogin"></mine-infor>
		</view>
		<view class="user-order">
			<order-nav :orderList='status' :isMinePage='true'></order-nav>
		</view>
		<view class="user-nav">
			<view class="nav-list">
				<view v-for='(item,index) in navList' :key='index' :data-id='item.id' :data-phone='item.phone?item.phone: ""'
				 @click="clickNav" class="nav-clonum">
					<i :class='["iconfont",item.icon,"nav-icon"]'></i>
					<text class="nav-name">{{item.title}}</text>
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
		ADDRESS_INDEX
	} from '@/config/router.js';
	import {
		getCreationList
	} from '@/api/mine.js';
	import {
		getStorage
	} from '@/utils/storage.js';
	import {mapState,mapActions} from 'vuex';
	import NoMoreData from '@/components/NoMoreData.vue';

	export default {
		data() {
			return {
				isLogin: false,
				userInfo: {},
				navList: [{
						id: 1,
						title: '地址管理簿',
						icon: 'iconweizhi-tianchong'
					},
					{
						id: 2,
						title: '咨询客服',
						icon: 'iconkefu',
						phone: '0574-83017657'
					}
				],
				creationList: {},
				worksPagination: {
					page: 1,
					size: 6
				},
				count: 0,
				isShowNoMoreData: false
			}
		},
		components: {
			MineInfor,
			OrderNav,
			MineCreation,
			NoMoreData
		},
		onShow() {
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
			clickNav: function(e) {
				if (e.currentTarget.dataset.id == 1) {
					uni.navigateTo({
						url: `${ADDRESS_INDEX}?srouce=mine`
					})
				} else if (e.currentTarget.dataset.id == 2) {
					makePhoneCall({
						phone: e.currentTarget.dataset.phone
					})
				}
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
					position: absolute;
					left: 180upx;
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
