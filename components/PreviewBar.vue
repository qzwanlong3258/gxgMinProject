<template>
		<view :style="'width:'+width+'rpx;' + (height?'height:'+height+'rpx':'')" class="preview-bar">
			<image class="back-img" :src="backUrl" mode="widthFix" :style="'width:'+imgwidth+'px;'"></image>
			<view class="pattern-img">
				<image
					:style="'width:' + patternImgWidth + 'px;height:' + patternImgHeight + 'px;margin-top:'  + patternImgTop+'px'"
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
			imgidth:''
			
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
	created(){
		_self=this
		if(this.width == 190){
			_self.imgwidth=95
		}
		if(this.width == 280){
			_self.imgwidth=140
		}
		if(this.width == 400){
			_self.imgwidth=200
		}
	},
	computed: {
		ratio() {
			return (this.windowWidth * 1.2 * this.getRpxToPxRatio()) / this.width;
		},
		patternImgWidth() {
			if(this.width == 190){
				return 42
			}
			if(this.width == 280){
				return  62
			}
			if(this.width == 400){
				return  88
			}
			
			// let width = parseInt(this.moveViewWidth * this.getRpxToPxRatio() / (this.ratio*2));
			// console.log(width)
			// return this.sex == 3?wid * 0.7:wid;
		},
		patternImgHeight() {
			if(this.width == 190){
				return  48
			}
			if(this.width == 280){
				return  70
			}
			if(this.width == 400){
				return 101
			}
			// let height = parseInt(this.moveViewHeight * this.getRpxToPxRatio() / (this.ratio*2));
			// console.log(height)
			// return  this.sex == 3?height * 0.7:height;
		},
		patternImgTop() {
			//  let info = uni.createSelectorQuery().select(".design-top");
			// 　　　  　info.boundingClientRect(function(data) { //data - 各种参数
			// // 　　　  　console.log(data.height)
			//   setStorage('height',data.height)// 获取元素宽度
			//   setStorage('width',data.width)// 获取元素宽度
			// 　　    }).exec()
			if(this.width == 190){
				return 32
			}
			if(this.width == 280){
				return 47
			}
			if(this.width == 400){
				return 67
			}
			this.getMoveViewTop();
			console.info(this.clotheMariginTop * this.getRpxToPxRatio())
			console.log((this.clotheMariginTop / this.getRpxToPxRatio()))
			return parseInt(this.moveViewTop  / this.ratio) - (this.clotheMariginTop / this.getRpxToPxRatio());
			// return parseInt(this.moveViewTop / this.ratio) - (this.clotheMariginTop / this.getRpxToPxRatio());
		},
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
		// getDescBox() { 
		//   uni.createSelectorQuery().in(this).select('.pattern-img').boundingClientRect(result => { 
		//    if (result) { 
		//      console.log('==========',result) 
		//    }else { 
		//      this.getDescBox(); 
		//  } 
		//   }).exec(); 
		// },
	}
};
</script>

<style lang="scss" scoped>
.preview-bar {
	position: relative;
	display: flex;
	justify-content: center;
	margin: 0 auto;
}
.back-img {
	max-height: 100%;
	width: 100%;
	height: 100%;
	z-index: 1;
}
.pattern-img {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	// align-items: center;
	justify-content: center;
	z-index: 2;
	
	
}
.pattern-img image{
	
	
}
</style>
