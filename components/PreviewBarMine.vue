<template>
		<view :style="'width:'+width+'rpx;' + (height?'height:'+height+'rpx':'')" class="preview-bar">
			
			<image class="back-img" :src="backUrl" mode="widthFix"></image> 
			 <view class="pattern-img">
				<!-- <image
					:style="'width:' + patternImgWidth + 'rpx;height:' + patternImgHeight + 'rpx;margin-top:' + (sex==3?'-12%':'-15%')"
					:src="patternUrl"
					mode="aspectFit"
				></image> -->
				<image
					
					:src="patternUrl"
					mode="aspectFit"
				></image>
			</view> 
	</view>
</template>

<script>
const { setStorage, getStorage } = require('@/utils/storage.js');
var _self;

export default {
	data() {
		return {
			windowWidth: getStorage('sysInfo', true).windowWidth,
			moveViewWidth: Number(getApp().globalData.moveViewWidth),
			moveViewHeight: Number(getApp().globalData.moveViewHeight),
			moveViewTop: 110,
			clotheMariginTop: 0,
			
		};
	},
	props: {
		backUrl: {
			type: String,
			default: ''
		},
		patternUrl: {
			type: String,
			default: ''
		},
		width: {
			type: Number,
			default: 0
		},
		height: {
			type: Number,
			default: 0
		},
		sex: {
			type: Number,
			default: 0
		}
	},
	computed: {
		ratio() {
			return (this.windowWidth  * this.getRpxToPxRatio()) / this.width;
		},
		patternImgWidth() {
			let width = parseInt(this.moveViewWidth * this.getRpxToPxRatio() / this.ratio);
			return this.sex == 3?width * 0.7:width;
		},
		patternImgHeight() {
			let height = parseInt(this.moveViewHeight * this.getRpxToPxRatio() / this.ratio);
			return  this.sex == 3?height * 0.7:height;
		},
		// patternImgTop() {
		// 	this.getMoveViewTop();
		// 	console.info(this.clotheMariginTop * this.getRpxToPxRatio())
		// 	return parseInt(this.moveViewTop / this.ratio) - (this.clotheMariginTop / this.getRpxToPxRatio());
		// },
		
	},
	methods: {
		getMoveViewTop() {
			const phoneHeight = getStorage('sysInfo').windowHeight - 624
			if(getStorage('sysInfo').windowWidth <= 750) {
				if (phoneHeight < 0) {
					if (getStorage('sysInfo').model == "iPhone 5") {
						this.clotheMariginTop = -26
					} else {
						this.clotheMariginTop = phoneHeight / 2;
					}
				} else {
					this.moveViewTop = 150
				}
			}else{
				this.clotheMariginTop = -260
				this.moveViewTop = 90
			}
		},
		getRpxToPxRatio() {
			return 750 / this.windowWidth
		},
		
	},
	
};
</script>

<style lang="scss">
.preview-bar {
	position: relative;
	display: flex;
	justify-content: center;
	margin: 0 auto;
}
.back-img {
	// max-height: 100%;
	width: 100%;
	height: 100%;
	display: block;
	z-index: 1;
}
.pattern-img {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	// display: flex;
	// align-items: center;
	// justify-content: center;
	z-index: 2;
}
.pattern-img image{
	position: absolute;
	width: 120rpx;
	height: 120rpx;
	left: 80rpx;
	top:90rpx
}
</style>
