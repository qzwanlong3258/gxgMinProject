<template>
	<view v-if="creationList.length" class="mine-creation">
		<view class="creation-tip">我的作品</view>
		<view class="creation-list">
			<view v-for='(item,index) in creationList' :key='index' class="creation-clonum">
				<view class="creation-img">
					
					<preview-bar :patternUrl='item.url' :width="280" :height="390" :backUrl="item.clothesUrl" />
					<view class="delete-icon" @click="deleteCreation" :data-id='item.id'>
						<i class="iconfont iconcha"></i>
					</view>
				</view>
				<view class="show-btn-list">
					<view v-for="(v,k) in btnList" :key='k' :data-id='v.id' :data-goodsid='item.id' @click='changeCreation($event,item)' class="show-btn-clonum">{{v.name}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		gxgConfirm
	} from '@/config/package.js';
	import PreviewBar from '@/components/PreviewBar.vue';
	import {
		TODO_DETAIL,
		WRITE_ORDER
	} from '@/config/router.js';
	import {
		deleteWorks,
		getCreationList
	} from '@/api/mine.js';
	import {createOrder} from '@/api/preview.js'
	import regeneratorRuntime from '@/utils/regenerator-runtime/runtime.js';

	export default {
		props: {
			creationList: {
				type: Object
			}
		},
		data() {
			return {
				btnList: [{
						id: 1,
						name: '修改'
					},
					{
						id: 2,
						name: '购买'
					}
				]
			};
		},
		methods: {
			deleteCreation: function(e) {
				gxgConfirm({
					successFunction: () => {
						let id = e.currentTarget.dataset.id;
						deleteWorks(id).then(res => {
							this.$emit('deleteSuccess',{id});
						});
					}
				});
			},
			changeCreation: async function(e,item) {
				let index = e.currentTarget.dataset.id
				let goodsid = e.currentTarget.dataset.goodsid
				getApp().globalData.clotheInfo.size = item.size
				if (index == 1) {
					uni.navigateTo({
						url: `${TODO_DETAIL}?id=${goodsid}&type=2`
					})
				} else if (index == 2) {
					let orderid = await createOrder({goodsid:goodsid,size:item.size.sizeId})
					uni.navigateTo({
						url: `${WRITE_ORDER}?id=${orderid}&price=${item.price}&type=2`
					})
				}
			}
		},
		components: {
			PreviewBar
		}
	}
</script>

<style lang="scss" scoped>
	.mine-creation {
		width: 94%;
		margin-left: 3%;
		margin-bottom: 50rpx;

		.creation-tip {
			width: 100%;
			text-align: center;
			font-size: 38upx;
			font-weight: 500;
			color: #000;
		}

		.creation-list {
			width: 100%;
			margin-bottom: 46upx;
			border-radius: 10upx;
			box-shadow: 0 20rpx 20rpx 4rpx rgba(0, 0, 0, 0.1);
			display: flex;
			flex-wrap: wrap;
			padding-bottom: 64upx;

			.creation-clonum {
				width: 280upx;
				height: 454upx;
				margin-left: 46upx;
				margin-top: 46upx;

				.creation-img {
					position: relative;
					width: 280upx;
					height: 390upx;
					background: #dededd;
					border-radius: 20upx;
					display: flex;
					align-items: center;

					image {
						width: 100%;
						height: 100%;
					}

					.delete-icon {
						position: absolute;
						top: 0;
						right: 0;
						width: 40upx;
						height: 40upx;
						background: #eee;
						border-radius: 50%;
						text-align: center;
						line-height: 40upx;
						// margin-top: -400upx;
						// margin-left: 245upx;
						z-index: 99;

						i {
							font-size: 30upx;
							color: #666;
						}
					}
				}

				.show-btn-list {
					display: flex;
					justify-content: space-around;
					margin-top: 24upx;

					.show-btn-clonum {
						width: 100upx;
						height: 36upx;
						line-height: 36upx;
						text-align: center;
						font-size: 24upx;
						color: #fff;
						background: #000;
						border-radius: 50upx;
					}
				}
			}
		}

		.scroll-view {
			margin-top: 22upx;
			width: 100%;
		}
	}
</style>
