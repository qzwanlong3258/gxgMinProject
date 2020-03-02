<template>
	<scroll-view scroll-y class="container">
		<view class="swiper-bg">
			<swiper-img :imgList="clotheInfo.imgList" heightNum="680" />
		</view>
		<view class="clothe-info">
			<view class="info-top">
				<view class="top-colnum title-font"><text class="important-font">{{clotheInfo.name}}</text> /{{clotheInfo.type}}</view>
				<view class="top-price">￥<text>{{hoverList.localIndex==2?accAdd(clotheInfo.price,50):clotheInfo.price}}</text></view>
			</view>
			<view class="info-bottom tip-font">{{clotheInfo.material}}</view>
		</view>
		<view class="select-type">
			<view class="select-content">
				<view class="select-colunm-top">
					<view class="colunm-title">定制位置</view>
					<view class="column-box">
						<view v-for="(item,index) in typeInfo.localtion" :key="index" :class="[{'hover-active': index === hoverList.localIndex}]"
						 class="clounm-content type-btn-font" @click="changeIndex('localtion','localIndex','localId',index)">{{item.name}}</view>
					</view>
				</view>
				<view class="select-colunm-top">
					<view class="colunm-title">款式选择</view>
					<view class="column-box">
						<view class="clounm-content type-btn-font" v-for="(item,index) in typeInfo.sex" :key="index" :class="[{'hover-active': index === hoverList.sexIndex}]"
						 @click="changeIndex('sex','sexIndex','sexId',index)">{{item.name}}</view>
					</view>
				</view>
			</view>
			<view class="select-content">
				<view class="select-colunm">
					<view class="colunm-title">颜色选择</view>
					<view class="column-box">
						<view class="type-btn-font color-box box-shadow-setting" v-for="(item,index) in typeInfo.sex[hoverList.sexIndex].color"
						 :key="index" v-bind:style="{background: item.name,borderColor: item.name}" :class="[{'color-click': index === hoverList.colorIndex}]"
						 @click="changeIndex('color','colorIndex','colorId',index)">
						</view>
					</view>
				</view>
			</view>
			<view class="select-content">
				<view class="select-colunm">
					<view class="colunm-title">选择尺码</view>
					<view class="column-box">
						<view class="clounm-content type-btn-font" v-for="(item,index) in sizeList" :key="index" :class="[{'hover-active': index === hoverList.sizeIndex}]"
						 @click="changeIndex('size','sizeIndex','sizeId',index)">{{item.name}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="size-img-box">
			<view class="size-title content-font">尺码信息 | SIZECHART </view>
			<image :src="clotheInfo.sizeImg" mode="aspectFit"></image>
			<view class="img-tip">备注: 尺寸单位cm,因手工测量方式不同，存在1-2cm误差，皆属合理范围</view>
		</view>
		<gxg-button class="start-todo" @clickBtn='saveSelect'>开始定制</gxg-button>
	</scroll-view>
</template>

<script>
	import {
		TODO_DETAIL
	} from '@/config/router.js';
	import SwiperImg from '@/components/SwiperImg';
	import GxgButton from '@/components/GxgButton';
	import {
		getTypeInfo,
		getClotheInfo,
		getSizeInfo
	} from '@/api/selectType.js';
	import regeneratorRuntime from '@/utils/regenerator-runtime/runtime.js';
	import {accAdd} from '@/utils/util.js';

	export default {
		data() {
			return {
				clotheInfo: {},
				typeInfo: {},
				sizeList: [],
				hoverList: {
					localIndex: 0,
					sexIndex: 0,
					colorIndex: 0,
					sizeIndex: 0
				},
				options: {},
			}
		},
		onLoad(options) {
			this.options = options;
			this.loadData();
		},
		computed: {
			queryList() {
				if (JSON.stringify(this.typeInfo) == "{}") return {};
				let sex = this.typeInfo.sex[this.hoverList.sexIndex];
				let res = {
					vid: this.typeInfo.vid,
					sex: sex.value,
					color: sex.color[this.hoverList.colorIndex].value.replace('#', '')
				}
				return res;
			}
		},
		methods: {
			accAdd,
			async loadData() {
				let key = this.options.type == 0 ? 'cid' : 'vid'
				this.typeInfo = await getTypeInfo({
					[key]: this.options.id
				});
				getClotheInfo(this.queryList).then(res => {
					this.clotheInfo = res;
				});
				getSizeInfo(this.queryList).then(res => {
					this.sizeList = res.list;
					getApp().globalData.clotheInfo = {
						id: this.clotheInfo.clotheId,
						size: this.sizeList[this.hoverList.sizeIndex]
					}
				});
			},
			changeIndex(list, eleIndex, eleId, index) {
				//2019/11/21之前版本代码
				// this.hoverList[eleIndex] = index;
				// if (eleIndex == 'sexIndex') {
				// 	this.hoverList.colorIndex = 0;
				// }
				// if (eleIndex == 'sexIndex' || eleIndex == 'colorIndex') {
				// 	getSizeInfo(this.queryList).then(res => {
				// 		this.sizeList = res.list;
				// 	});
				// 	getClotheInfo(this.queryList).then(res => {
				// 		this.clotheInfo = res;
				// 	});
				// } else {
				// 	getApp().globalData.clotheInfo = {
				// 		id: this.clotheInfo.clotheId,
				// 		size: this.sizeList[index]
				// 	}
				// }
				this.hoverList[eleIndex] = index
				if (eleIndex == 'sexIndex' || eleIndex == 'colorIndex') {
					eleIndex == 'sexIndex' && (this.hoverList.colorIndex = 0)
					getSizeInfo(this.queryList).then(res => {
						this.sizeList = res.list;
					});
					getClotheInfo(this.queryList).then(res => {
						this.clotheInfo = res;
					});
				} else if (eleIndex == 'localIndex' || eleIndex == 'sizeIndex') {
					getApp().globalData.clotheInfo = {
						id: this.clotheInfo.clotheId,
						size: this.sizeList[index]
					}
				}
			},
			saveSelect: function() {
				let localIndex = this.hoverList.localIndex
			
				getClotheInfo(this.queryList).then(res => {
					if(this.options.type == 0){
						getApp().globalData.choosedProduceId = this.options.id
					}
					uni.navigateTo({
						url: `${TODO_DETAIL}?localIndex=${localIndex}&type=${this.options.type}&id=${res.clotheId}`,
					})
				});
			}
		},
		components: {
			SwiperImg,
			GxgButton
		}
	}
</script>
<style lang="scss" scoped>
	/*点击选中颜色*/
	.swiper-bg {
		background: #dcdcdc;
	}

	.color-click {
		border-radius: 50% !important;
	}

	.clothe-info {
		width: 92%;
		margin-left: 3%;

		.info-top {
			margin-top: 20upx;
			display: flex;

			.top-colnum {
				text {
					right: 10upx;
				}
			}

			.top-price {
				font-size: 26upx;

				text {
					font-size: 32upx;
				}
			}
		}

		.info-bottom {
			margin-top: 8upx;
		}
	}

	.select-type {
		width: 92%;
		margin-left: 3%;

		.select-content {
			display: flex;
			justify-content: space-between;

			.select-colunm-top {
				margin-top: 50upx;

				.colunm-title {
					font-size: 30upx;
				}

				.column-box {
					display: flex;
					margin-top: 22upx;

					.clounm-content {
						height: 50upx;
						line-height: 50upx;
						padding: 0 18upx;
						border-radius: 8upx;
						background: #f2f2f2;
					}

					.clounm-content:not(:first-child) {
						margin-left: 16upx;
					}
				}

			}

			.select-colunm-top:last-child {
				margin-left: 80upx;
			}

			.select-colunm {
				margin-top: 50upx;

				.colunm-title {
					font-size: 30upx;
				}

				.column-box {
					display: flex;
					margin-top: 22upx;

					.clounm-content {
						height: 50upx;
						line-height: 50upx;
						padding: 0 28upx;
						border-radius: 8upx;
						background: #f2f2f2;
					}

					.clounm-content:not(:first-child) {
						margin-left: 16upx;
					}

					.color-box {
						width: 56upx;
						height: 56upx;
						border-radius: 8upx;
					}

					.color-box:not(:first-child) {
						margin-left: 16upx;
					}
				}
			}
		}
	}

	.size-img-box {
		width: 92%;
		margin-left: 4%;
		text-align: center;
		margin-top: 50upx;
		border-top: 1upx solid #eee;
		margin-bottom: 120rpx;

		.size-title {
			font-weight: bold;
			line-height: 80upx;
		}

		image {
			width: 100%;
		}

		.img-tip {
			font-size: 16upx;
		}
	}

	.start-todo {
		position: fixed;
		margin: 50rpx auto;
		left: 0;
		right: 0;
		bottom: -20upx;
	}
</style>
