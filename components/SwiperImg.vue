<template>
	<view>
		<swiper class="swiper" :style="{height:`${heightNum}rpx`}" @change='changeDot'>
			<swiper-item v-for="(item,index) in imgList" :key="index">
				<view class="swiper-item">
					<view class="show-clothe">
						<preview-bar class="preview-image":sex="sex" :backUrl="item.url" :width="400" :patternUrl="item.patternUrl" />
					</view>
				</view>
			</swiper-item>
		</swiper>
		<view class='show-swiper'>
			<view v-for="(item,index) in imgList.length" :key="index" v-bind:class="[{'swiper-dot-active':index===dotIndex},'swiper-dot']"></view>
		</view>
	</view>
</template>

<script>
	import PreviewBar from '@/components/PreviewBar';
		
	export default {
		props: {
			imgList: {
				type: Array,
			},
			heightNum: {
				type: Number,
				default: 662
			},
			sex: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				dotIndex: 0
			};
		},
		methods: {
			changeDot: function(e){
				this.dotIndex = e.detail.current
			}
		},
		components: {
			PreviewBar
		}
	}
</script>

<style lang="scss" scoped>
	.swiper {
		width: 100%;
		.swiper-item {
			width: 100%;
			height: 92%;
			position: relative;
			.show-clothe {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 490upx;
				margin-left: 130upx;
				height: 100%;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}

	}

	.show-swiper {
		position: absolute;
		z-index: 3;
		width: 100%;
		height: 30rpx;
		margin: -30rpx auto 0;
		display: flex;
		justify-content: center;
		.swiper-dot {
			width: 70rpx;
			height: 14rpx;
			border-radius: 20rpx;
			background: #eee;
			border: 1upx solid #eee;
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
