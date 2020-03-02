<template>
	<view class='container'>
		<view class='form-imfor primary-text-color content-font'>
			<view><input class="content-font" v-model="addressInfo.userName" placeholder-class="font-color" placeholder='收货人'></input></view>
			<view><input class="content-font" type="number" v-model="addressInfo.phone" placeholder-class="font-color" maxlength='11'
				 placeholder='手机号码'></input></view>
			<view class="choose-region content-font" >
				<picker style="width: 100%;" mode="region" @change="bindRegionChange" :value="addressInfo.region" :custom-item="customItem">
					<view :style="{color: addressInfo.region?'':'#8f8fa7'}">{{addressInfo.region?addressInfo.region:'所在地区'}}</view>
					<i class="iconfont iconright" :style="{color: addressInfo.region?'':'#8f8fa7'}"></i>
				</picker>
			</view>
			<textarea class="detail-address content-font" placeholder-class="font-color" :placeholder="placeholderArea" v-model="addressInfo.detailAddress"></textarea>
			<text class="line-box"></text>
			<!-- <view>
				<input v-model="addressInfo.address" placeholder='收货地址'></input>
				<i @click="getLoacation" class="iconfont iconweizhi-tianchong"></i>
			</view> -->
		</view>
		<view class='colunm-slider title-font'>
			<view class="setting-address">设为默认地址</view>
			<switch color="#000" :checked="addressInfo.isDefault" @change="switch1Change" />
		</view>
		<view v-if="isExit" class='colunm-slider' @click='deleteAddress' style='margin:0;'>
			<view class='theme-color'>删除收货地址</view>
		</view>
		<view class='start-todo' @click='saveAddress'>
			<gxg-button class='cus-big-button'>立即保存</gxg-button>
		</view>
	</view>
</template>

<script>
	import GxgButton from '@/components/GxgButton.vue';
	import {
		ADDRESS_INDEX
	} from '@/config/router.js';
	import {
		addReceiveAddress,
		deleteReceiveAddress,
		updateReceiveAddress
	} from '@/api/addressDetail.js';

	export default {
		data() {
			return {
				addressInfo: {
					userName: '',
					phone: '',
					region: '',
					detailAddress: '',
					address: '',
				},
				placeholderArea: '详情地址：如道路、门牌号、小区、楼栋号、单元室等',
				customItem: '全部',
				isExit: false,
				isDefault: false,
				pageSrouce: 'mine'
			};
		},
		components: {
			GxgButton
		},
		onLoad: function(options) {
			if (options.address) {
				this.isExit = true
				let optionsAddress = JSON.parse(options.address)
				this.addressInfo = {
					...optionsAddress,
					region: optionsAddress.address.split(' ')[0],
					detailAddress: optionsAddress.address.split(' ')[1],
				};
				
			}
			if (options.srouce) {
				this.pageSrouce = options.srouce
			}
		},
		methods: {
			//选择地区
			bindRegionChange: function(e) {
				this.addressInfo.region = e.detail.value.join('')
			},
			// getLoacation: function() {
			// 	uni.getSetting({
			// 		success: (res) => {
			// 			if (!res.authSetting['scope.userLocation']) {
			// 				uni.authorize({
			// 					scope: 'scope.userLocation',
			// 					success: () => {
			// 						uni.chooseLocation({
			// 							success: (result) => {
			// 								console.log(result)
			// 								this.addressInfo.address = `${result.address}(${result.name})`
			// 							},
			// 							fail: () => {
			// 								uni.showToast({
			// 									title: '获取位置失败',
			// 									icon: 'none'
			// 								})
			// 							}
			// 						})
			// 					}
			// 				})
			// 			} else {
			// 				uni.chooseLocation({
			// 					success: (res) => {
			// 						console.log(res)
			// 						this.addressInfo.address=`${res.address}(${res.name})`
			// 					},
			// 					fail: function() {
			// 						uni.showToast({
			// 							title: '获取位置失败',
			// 							icon: 'none'
			// 						})
			// 					}
			// 				})
			// 			}
			// 		}
			// 	})
			// },
			switch1Change: function(e) {
				this.addressInfo.isDefault = e.detail.value
			},
			saveAddress: function() {
				this.addressInfo.address = `${this.addressInfo.region} ${this.addressInfo.detailAddress}`
				if (this.addressInfo.id) {
					updateReceiveAddress(this.addressInfo).then(res => {
						this.backToAddress();
					});
				} else {
					addReceiveAddress(this.addressInfo).then(res => {
						this.backToAddress();
					});
				}
			},
			deleteAddress() {
				wx.showModal({
					title: '删除确认',
					content: '请问是否确认删除？',
					showCancel: true,
					success: res => {
						if (res.confirm) {
							deleteReceiveAddress(this.addressInfo.id).then(res => {
								this.backToAddress();
							});
						}
					}
				})
			},

			/**
			 * 回退到 pages/addressIndex/addressIndex
			 */
			backToAddress() {
				let pages = getCurrentPages();
				let pageIndex = pages.findIndex(item => item.route == ADDRESS_INDEX.substring(1));
				if (pageIndex != -1) {
					uni.navigateBack({
						delta: pages.length - pageIndex - 1
					});
				} else {
					uni.navigateTo({
						url: `${ADDRESS_INDEX}?srouce=${this.pageSrouce}`
					});
				}
			}
		}
	}
</script>

<style lang="scss">
	.font-color {
		color: #8f8fa7;
	}

	.form-imfor {
		width: 100%;
		background: #fff;
		font-size: 30upx;
	}

	.form-imfor view {
		height: 90upx;
		border-bottom: 1upx solid #eee;
		line-height: 90upx;
	}

	.form-imfor input {
		width: 640upx;
		line-height: 90upx;
		padding-top: 20upx;
		margin-left: 20upx;
	}

	.form-imfor .iconweizhi-tianchong {
		position: absolute;
		right: 24upx;
		font-size: 50upx;
		margin-top: -72upx;
	}

	.choose-region {
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
	}

	.choose-region view {
		margin-left: 20upx;
	}

	.choose-region i {
		
		position: absolute;
		z-index: 2;
		right: 20rpx;
		margin-top: -92rpx;
		border: none;

	}

	.detail-address {
		width: 94%;
		height: 140rpx;
		background: #fff;
		padding: 20rpx 0;
		margin-left: 3%;
	}

	.line-box {
		border-bottom: 0.5px solid #eee;
		width: 100%;
		height: 2rpx;
		display: block;
	}

	.left-logo {
		right: 20upx;
	}

	.colunm-slider {
		width: 100%;
		height: 90upx;
		border-top: 1upx solid #eee;
		border-bottom: 1upx solid #eee;
		line-height: 90upx;
		display: flex;
		display: -webkit-flex;
		background: #fff;
		margin-top: 40upx;
		font-size: 32upx;
	}

	.setting-address {
		margin-left: 20upx;
	}

	.colunm-slider switch {
		position: absolute;
		right: 20upx;
	}

	.theme-color {
		margin-left: 20upx;
	}
</style>
