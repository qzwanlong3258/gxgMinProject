<template>
	<view class="container">
		<view class="top-box">
			<view class="top-left">
				<preview-bar class="preview-image" :backUrl="orderInfor.resultList[0].url" :sex="orderInfor.sexValue" :width="190" :patternUrl="orderInfor.resultList[0].patternUrl" />
			</view>
			<view class="top-right">
				<view class="clothe-infor-top">{{orderInfor.sexName}}式<span style='font-weight: 600;margin-left: 20rpx;'>{{orderInfor.categoryName}}</span></view>
				<view class="clothe-infor-bottom tip-font">{{orderInfor.typeName}} / {{clotheInfo.size.value}}码</view>
				<view class="sbumit-btn" @click="submiOrder">提交订单</view>
			</view>
		</view>
		<view class="bottom-box">
			<view class="clothe-title"><span style='font-weight: 600;'>{{orderInfor.name}}</span> / 预览效果</view>
			<view class="show-clothes">
				<swiper-img :imgList="orderInfor.resultList" heightNum='632' :sex="orderInfor.sexValue" />
			</view>
			<gxg-button class="start-todo" @clickBtn='startTodo'>修改设计</gxg-button>
		</view>
	</view>
</template>

<script>
	import {
		TODO_DETAIL,
		WRITE_ORDER
	} from '@/config/router.js';
	import {
		createOrder
	} from '@/api/preview.js';
	import SwiperImg from '@/components/SwiperImg';
	import GxgButton from '@/components/GxgButton';
	import PreviewBar from '@/components/PreviewBar';
	import regeneratorRuntime from '@/utils/regenerator-runtime/runtime.js';
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import types from '@/store/mutationTypes.js';

	export default {
		data() {
			return {
				clotheInfo: null, // 衣服信息
				orderInfor: {}	
			}
		},
		components: {
			GxgButton,
			SwiperImg,
			PreviewBar
		},
		onLoad() {
			this.clotheInfo = getApp().globalData.clotheInfo
			this.orderInfor = getApp().globalData.previewInfo
		},
		onUnload() {
			// getApp().globalData.backToDoOption = {
			// 	id: this.orderInfor.worksId,
			// 	type: 2
			// }
		},
		methods: {
			...mapMutations('order', [types.SET_ORDER_ITEM]),
			//修改设计
			startTodo: function() {
				uni.redirectTo({
					url: `${TODO_DETAIL}?id=${this.orderInfor.worksId}&type=2`
				});
				
				// let pages = getCurrentPages();
				// let todoDetail = pages[pages.length - 2];
				// todoDetail.setData({
				// 	options: {id:this.orderInfor.worksId,type:2}
				// })
				// todoDetail.options = {id:this.orderInfor.worksId,type:2}
				// console.info(pages)
				// uni.navigateBack({
				// 	delta: 1
				// });
			},
			submiOrder: async function() {
				let id = await createOrder({
					goodsid: this.orderInfor.worksId,
					size: getApp().globalData.clotheInfo.size.sizeId
				});
				this[types.SET_ORDER_ITEM]({
					...this.orderInfor,
					sizeName: getApp().globalData.clotheInfo.size.name,
					id: id
				});
				uni.navigateTo({
					url: `${WRITE_ORDER}?id=${id}&price=${this.orderInfor.price}`
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		.top-box {
			height: 30%;
			display: flex;
			align-items: center;

			.top-left {
				width: 50%;

				.preview-image {
					margin-left: 98upx;
				}
			}

			.top-right {
				width: 50%;
				margin-bottom: 10upx;

				.clothe-infor-top {
					font-size: 34upx;
					margin-bottom: 10upx;
				}

				.clothe-infor-bottom {
					margin-bottom: 30upx;
				}

				.sbumit-btn {
					width: 160upx;
					height: 50upx;
					line-height: 50upx;
					text-align: center;
					background: #000000;
					color: #fff;
					border-radius: 4upx;
					font-size: 24upx;
				}
			}
		}

		.bottom-box {
			height: calc(70% - 4upx);
			border-top: 4upx solid #dcdcdc;
			border-top-left-radius: 150upx;
			border-top-right-radius: 150upx;
			box-shadow: 0 0 1upx 1upx rgba(0, 0, 0, 0.1);

			.clothe-title {
				margin: calc(25% - 151upx) 0;
				text-align: center;
				font-size: 32upx;
			}
		}
	}
</style>
