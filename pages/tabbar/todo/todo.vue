<template>
	<view class="container">
		<swiper class="swiper" @change='changeDot' :current="dotIndex">
			<swiper-item v-for="(item,i) in list" :key="i">
				<view class="swiper-item">
					<view class="nav-list" :style="{marginTop:`${navMarginTop}rpx`}">
						<view v-for="(info,j) in item.clothesType" :key='j' :class="[{'nav-active':j===navIndex},'nav-column']" @click="changeNav(j)">{{info.name}}</view>
					</view>
					<view class="show-clothe" :style="{height: `${clotheheight}rpx`,width:`${clothewidth}rpx`}">
						<image v-if='item.clothesType.length' :src='item.clothesType[navIndex].imgUrl' />
						<text class="null-clothe-tip" v-if='item.hasOwnProperty("clothesType")&&!item.clothesType.length'>暂无商品敬请期待</text>
					</view>
				</view>
			</swiper-item>
		</swiper>
		<view v-if="list.length" class='show-swiper'>
			<view v-for="index in swiperLength" :key="index" :class="[{'swiper-dot-active':index===dotIndex},'swiper-dot']"></view>
		</view>
		<left-tip />
		<gxg-button class="start-todo" @clickBtn='startTodo'>开始定制</gxg-button>
	</view>
</template>

<script>
	import {
		TODO_CLOTHE
	} from '@/config/image.js'
	import GxgButton from '@/components/GxgButton'
	import LeftTip from './components/LeftTip'
	import {
		SELECT_TYPE
	} from '@/config/router';

	import {
		mapState,
		mapActions
	} from 'vuex';
	import {
		getColtheInfo
	} from '@/api/todo.js';
	import {
		toast,
	} from '@/config/package.js';
	import {
		getStorage
	} from '@/utils/storage.js';
	export default {
		data() {
			return {
				navIndex: 0, // 版式切换
				dotIndex: 0, // 切换标志
				coltheInfo: null, // 版型信息 
				coltheInfoList: [], // 版型列表
				list: [],
				swiperLength: 1,
				clotheheight: 680,
				clothewidth: 500,
				navMarginTop: 0
			}
		},
		components: {
			GxgButton,
			LeftTip,
		},
		onShow() {
			this.ipadEvent()
			if (!this.typeCounts) {
				this.getCategoryList().then(res => {
					this.loadData();
				});
			} else {
				this.loadData();
			}
		},
		onHide() {
			getApp().globalData.typeId = ''
		},
		methods: {
			...mapActions('category', ['getCategoryList']),
			loadData() {
				this.list = this.$store.getters.categoryList;
				(getApp().globalData.typeId)&&(this.dotIndex = this.list.findIndex(item => item.id == getApp().globalData.typeId));
				this.changeDot({
					index: this.dotIndex 
				})
			},
			changeNav: function(index) {
				this.navIndex = index;
			},
			//做iPad的兼容
			ipadEvent() {
				if (getStorage('sysInfo').model.indexOf('iPad') > -1) {
					this.clotheheight = 580
					this.clothewidth = 450
					this.navMarginTop = 30
				}
			},
			changeDot: function({
				detail = {},
				index = 0
			} = {}) {
				this.navIndex = 0;
				this.dotIndex = detail.current || index;
				let category = this.list.find(item => item.index == this.dotIndex);
				let item = this.list[this.dotIndex];
				getColtheInfo(category.id).then(res => {
					this.$set(item, 'clothesType', res.clothesType);
					this.updateSwiperLength()
				})
				uni.setNavigationBarTitle({
					title: category.name
				})

			},
			updateSwiperLength() {
				this.swiperLength = this.list.length
			},
			startTodo: function() {
				let info = this.list[this.dotIndex].clothesType[this.navIndex];
				if (info.count < 1) {
					toast({
						title: '该版型还没有商品',
						icon: 'none'
					});
					return;
				}
				const id = info.typeId
				uni.navigateTo({
					url: `${SELECT_TYPE}?id=${id}&type=1`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		text-align: center;
		height: 400upx;
		margin-top: 200upx;
	}

	.null-clothe-tip {
		font-size: 30upx;
	}

	.swiper {
		width: 100%;
		height: calc(100% - 150upx);
		background: #dcdcdc;

		.swiper-item {
			width: 100%;
			height: 100%;

			.nav-list {
				width: 96%;
				margin-left: 2%;
				height: calc(50% - 345upx);
				display: flex;
				justify-content: center;
				align-items: center;
				flex-wrap: nowrap;

				.nav-column {
					width: 160upx;
					height: 50upx;
					line-height: 50upx;
					text-align: center;
					background: #fff;
					font-size: 30upx;
					color: #000;
					border-radius: 24upx;

					&.nav-column:not(:first-child) {
						margin-left: 22rpx;
					}
				}

				.nav-active {
					background: #000;
					color: #fff;
				}
			}

			.show-clothe {
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 12upx;
				background: #fff;
				box-shadow: 0 0 6rpx 6rpx rgba(0, 0, 0, 0.1);
				position: absolute;
				margin: auto;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;

				image {
					width: 100%;
					height: 100%;
					border-radius: 12upx;
				}
			}
		}

	}

	.show-swiper {
		position: absolute;
		z-index: 3;
		width: 100%;
		height: 30rpx;
		margin: -40rpx auto 0;
		display: flex;
		justify-content: center;

		.swiper-dot {
			width: 70rpx;
			height: 14rpx;
			border-radius: 20rpx;
			background: #fff;

			&.swiper-dot:not(:first-child) {
				margin-left: 8rpx;
			}
		}

		.swiper-dot-active {
			background: #000;
			color: #fff;
		}
	}
</style>
