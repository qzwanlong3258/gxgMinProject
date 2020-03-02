<template>
	<scroll-view v-if="isLoading" scroll-y @scrolltolower="scrolltolower" class='container'>
		<view v-if="addressList.length" class='form-list'>
			<view v-for="(item,index) in addressList" :key="index" :data-index='index' :data-id="item.id" @click="changeAdress" class='list-column'>
				<view @click.stop='exitAddress' :data-id="item.id" class='column-top'>
					<view class='column-name'>{{item.userName}}</view>
					<view class='column-phone'>{{item.phone}}</view>
				</view>
				<view class='column-bottom'>
					<view @click.stop='exitAddress' :data-index='index'  :data-id="item.id" v-if="item.isDefault" class='tip-font default-logo'>默认</view>
					<view @click.stop='exitAddress' :data-index='index'  :data-id="item.id" :style="{width:item.isDefault?'65%':'75%'}" class='column-address'>{{item.address}}</view>
					<view @click.stop='exitAddress' :data-index='index'  :data-id="item.id" class='column-exit'>{{rightName}}</view>
				</view>
			</view>
		</view>
		<view v-if="!addressList.length">
			<image class='default-image' :src='defaultImg'></image>
		</view>
		<gxg-button class="start-todo" @clickBtn='addAddress'>添加收货地址</gxg-button>
	</scroll-view>
</template>

<script>
	import {
		NULL_DATA
	} from '@/config/image.js';
	import {
		ADDRESS_DETAIL
	} from '@/config/router.js';
	import GxgButton from '@/components/GxgButton.vue';
	import {getReceiveAddress,updateOrderAddress} from '@/api/addressIndex.js';
	import types from '@/store/mutationTypes'
	import {
		mapMutations
	} from 'vuex';
	
	export default {
		data() {
			return {
				page: 1,
				pages: 0,
				addressList: [],
				pageSize: 10,
				defaultImg: NULL_DATA,
				isLoading: true,
				isChoose: false,
				isIpx: false,
				pageSrouce: 'mine',
				rightName: '编辑',
			};
		},
		onLoad: function(options){
			this.options = options
			if(options.srouce) {
				this.pageSrouce = options.srouce;
				if(this.pageSrouce != 'mine'){
					this.rightName = '选择'
				}
			}
		},
		onShow() {
			this.loadData();
		},
		methods: {
			...mapMutations('order', [types.SET_ORDER_ITEM]),
			loadData() {
				getReceiveAddress().then(res => {
					this.addressList = res;
				});
			},
			//选择地址
			changeAdress: function(e) {
				const addressId = e.currentTarget.dataset.id;
				const addressIndex = e.currentTarget.dataset.index;
				let item = this.addressList.find(item => item.id == addressId);
				if (this.pageSrouce == 'orderBtn') {
					return updateOrderAddress({
						orderid: this.options.orderid,
						receiveid: addressId
					}).then(res => {
						uni.navigateBack({
							delta: 1
						});
					})
				} else if (this.pageSrouce == 'gxgAddress') {
					getApp().globalData.addressInfor = item
					uni.navigateBack({
						delta: 1
					});
				}
			},
			
			// 添加地址
			addAddress: function() {
				uni.navigateTo({
					url: `${ADDRESS_DETAIL}?srouce=${this.pageSrouce}`,
				});
			},
			//编辑地址
			exitAddress: function(e) {
				if (this.pageSrouce == 'mine') {
					let address = this.addressList.find(item => item.id == e.currentTarget.dataset.id)
					wx.navigateTo({
						url: `${ADDRESS_DETAIL}?address=${JSON.stringify(address)}`,
					})
				} else {
					this.changeAdress(e)
				}
			},
		},
		components: {
			GxgButton
		},
	}
</script>

<style>
	.form-list {
		width: 100%;
		background: #fff;
	}

	.form-list .list-column {
		width: 100%;
		min-height: 180upx;
		border-bottom: 1upx solid #eee;
	}

	.list-column .column-top {
		width: 100%;
		height: 80upx;
		font-size: 32upx;
		line-height: 80upx;
		display: flex;
		display: -webkit-flex;
		padding-left: 20upx;
	}

	.column-top .column-phone {
		font-size: 24upx;
		color: #666;
		margin-left: 20upx;
		line-height: 90upx;
	}

	.list-column .column-bottom {
		width: 710upx;
		margin-left: 20upx;
		display: -webkit-flex;
		font-size: 28upx;
	}

	.list-column .default-logo {
		width: 80upx;
		height: 42upx;
		background: #000000;
		border-radius: 30upx;
		text-align: center;
		line-height: 40upx;
		color: #fff;
		margin-top: 14upx;
		margin-right: 30upx;
	}

	.list-column .column-address {
		width: 65%;
		display: flex;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		min-height: 70upx;
		flex-direction: column;
		justify-content: center;
	}

	.list-column .column-exit {
		width: 95upx;
		height: 40upx;
		border-left: 1upx solid #eee;
		text-align: right;
		line-height: 40upx;
		position: absolute;
		right: 30upx;
		font-size: 30upx;
	}

	.default-image {
		width: 400upx;
		height: 300upx;
		margin: auto;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		position: absolute;
	}

	.default-image image {
		width: 100%;
		height: 100%;
	}
</style>
