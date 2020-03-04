<template>
	<scroll-view scroll-y class="container" @scrolltolower="worksLower">
		<view class="user-infor">
			<mine-infor :userInfo="userInfo" :isLogin="isLogin"></mine-infor>
		</view>
		<view class="user-order">
			<order-nav :orderList='status' :isMinePage='false' @changeOrderList='changeOrderList'></order-nav>
		</view>
		<view class="detail-list">
			<view v-for='(item,index) in list' :key='index' :data-id='item.id' class="detail-content">
				<view class="order-status">{{orderStatusValue}}</view>
				<!-- <i @click='deleteOrder' :data-id='item.id' class="iconfont iconcha"></i> -->
				<view @click='goOrderStatusPage' :data-id='item.id'>
					<order-infor :order='item'></order-infor>
				</view>
				<view class="infor-tip">共{{item.counts}}件,商品合计￥ <span style='font-size: 28rpx'>{{item.allPrice}}</span>(含配送费: ￥{{item.deliveryPrice}})</view>
				<view class="btn-list">
					<order-button @updateList='loadData(4)' :btnList='item.showBtn' :item='item' :orderid='item.id' @deleteSuccess='deleteOrderSuccess'></order-button>
				</view>
			</view>
		</view>
		<NoMoreData :isShow='isShowNoMoreData' />
	</scroll-view>
</template>

<script>
	import OrderNav from '@/components/OrderNav';
	import MineInfor from '@/components/MineInfor';
	import OrderInfor from '@/components/OrderInfor';
	import OrderButton from '@/components/OrderButton';
	import NoMoreData from '@/components/NoMoreData.vue';

	import {
		ORDER_STATUS
	} from '@/config/router'
	import {
		TODO_CLOTHE,
		TODO_CLOTHE_TODO
	} from '@/config/image.js'
	import {
		gxgConfirm
	} from '@/config/package.js'
	import {
		mapState,
		mapActions
	} from 'vuex';
	import {
		getStorage
	} from '@/utils/storage.js';
	import {
		getOrderList
	} from '@/api/orderList.js';

	export default {
		data() {
			return {
				isLogin: false,
				userInfo: {},
				orderStatusValue: '',
				list: [],
				state: 0,
				worksPagination: {
					page: 1,
					size: 5
				},
				count: 0,
				isShowNoMoreData: false
			};
		},
		computed: {
			...mapState('order', ['status'])
		},
		onLoad(options) {
			this.state = options.state;
		},
		onShow() {
			this.loadData();
			this.userInfo = getStorage("userInfo");
		},
		methods: {
			...mapActions('order', ['getOrderStatus']),
			loadData(stateId) {
				this.changeOrderList({
					id: this.state ? this.state : stateId
				});
			},
			changeOrderList: function(data) {
				this.state = data.id
				this.worksPagination.page = 1
				getOrderList({ ...this.worksPagination,
					state: data.id
				}).then(res => {
					this.list = res.list;
					this.count = res.count;
					this.orderStatusValue = this.status.length && this.status.find(item => item.id == data.id).title;
				}).then(res => {
					!this.orderStatusValue && this.getOrderStatus().then(res => {
						this.orderStatusValue = this.status.find(item => item.id == data.id).title;
					})
				})
			},
			goOrderStatusPage: function(e) {
				uni.navigateTo({
					url: `${ORDER_STATUS}?id=${e.currentTarget.dataset.id}`
				})
			},
			deleteOrder: function(e) {
				gxgConfirm({
					successFunction: () => {

					}
				})
			},
			worksLower() {
				if (this.list.length < Number(this.count)) {
					this.worksPagination.page++;
					getOrderList({ ...this.worksPagination,
						state: this.state
					}, true).then(res => {
						this.list.push(...res.list);
						this.count = res.count;
					});
				} else {
					this.isShowNoMoreData = true;
					setTimeout(() => {
						this.isShowNoMoreData = false;
					}, 1000);
				}
			},
			deleteOrderSuccess({id}) {
				let index = this.list.findIndex(item => item.id == id);
				this.list.splice(index,1);
				this.count--;
				this.getOrderStatus();
			}
		},
		components: {
			OrderNav,
			MineInfor,
			OrderInfor,
			OrderButton,
			NoMoreData
		},
	}
</script>

<style lang="scss" scoped>
	.user-order {
		width: 100%;
		position: absolute;
		margin-top: -100upx;
	}

	.detail-list {
		width: 82%;
		margin: 260upx 9% 0;

		.detail-content {
			width: 100%;
			border: 1upx solid #dcdcdc;
			border-radius: 10upx;
			margin-bottom: 30upx;

			.order-status {
				position: absolute;
				right: 90upx;
				color: #baa16d;
				margin-top: 15upx;
				font-size: 28upx;
			}

			.iconcha {
				position: absolute;
				right: 80upx;
				margin-top: 12upx;
			}

			.infor-tip {
				color: #000;
				position: relative;
				top: -42upx;
				margin-left: 50upx;
				font-size: 20upx;
			}

			.btn-list {
				position: relative;
				top: -30upx;
				margin-bottom: 10upx;
			}

		}
	}
</style>
