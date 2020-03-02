<template>
	<view class="clothe-box">
		<view class="box-left">
			<view class="clothe-img">
				<preview-bar :backUrl='order.resultList[0].url?order.resultList[0].url:order.resultList[1].url' 
					:patternUrl="order.resultList[0].patternUrl?order.resultList[0].patternUrl:order.resultList[1].patternUrl" :width='170' :height='210' :sex="order.sexValue" />
			</view>
		</view>
		<view class="box-right">
			<view class="title-font one-line-elipsis">{{order.name}}</view>
			<view class="tip-font">版型: {{order.typeName}}</view>
			<view class="tip-font clothe-size">尺码: {{order.sizeName}}码</view>
			<view class="tip-font">款式: {{order.sexName}}</view>
			<view class="tip-font right-bottom">
				<view v-if='order.counts'>数量: {{order.counts}}</view>
				<view v-if='order.modelMoney'>总价: ￥ {{order.modelMoney}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import PreviewBar from '@/components/PreviewBar';
	
	export default {
		props: {
			order:{
				type: Object,
			}
		},
		components: {
			PreviewBar
		},
		
	}
</script>

<style lang="scss" scoped>
 .clothe-box {
	 width: 82%;
	 height: 330upx;
	 margin-left: 9%;
	 display: flex;
	 align-items: center;
	 .box-left {
		 width: 170upx;
		 height: 210upx;
		 border-radius: 10upx;
		 background: #e5e7e7;
		 display: flex;
		 justify-content: center;
		 image {
			 width: 130upx;
			 height: 156upx;
		 }
	 }
	 .box-right {
		margin-left: 34upx;
		width: 66%;
		.clothe-size {
			margin-top: 24upx;
		}
		.tip-font {
			line-height: 36upx;
		}
		.right-bottom {
			display: flex;
			justify-content: space-between;
		} 
	 }
 }
</style>
