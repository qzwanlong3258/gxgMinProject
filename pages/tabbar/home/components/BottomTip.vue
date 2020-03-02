<template>
	<view class="bottom-tip">		
		<view class="tip-content">
			<view class="content-column" @click="connectWx">
				<i class="iconfont iconxinxi"></i>
				<text>在线客服微信号</text>
			</view>
			<view class="content-column">
				<i class="iconfont icondianhua"></i>
				<text @click="makePhone('0574-83017657')">0574-83017657</text>
			</view>
			<view class="content-column">
				<text>咨询时间：每日9:00 - 18:00</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { makePhoneCall,gxgConfirm } from '@/config/package.js'
	export default {
		methods: {
			connectWx: function(){
				gxgConfirm({
					title: 'gxg微信号',
					content: 'gxgbasic001',
					showCancel: false,
					confirmText: '确认复制',
					successFunction:()=>{
						uni.setClipboardData({
						   data: 'gxgbasic001',
						    success: function () {
						        uni.showToast({
									title: '已复制到剪切板',
									icon: 'none'
								})
						    }
						});
					}
				})
			},
			makePhone: function(phone){
				makePhoneCall({phone})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bottom-tip {
		width: 100%;
		height: 110upx;
		background: #dadada;
		.tip-content {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 18upx;
			.content-column {
				width: 180upx;
				height: 24upx;
				display: flex;
				line-height: 24upx;
				border-right: 3rpx solid  #000;
				margin-left: 22rpx;
				text-align: center;
				&.content-column:last-child {
					width: 240upx;
					border: none;
				}
				i {
					font-size: 22upx;
					margin-right: 10upx;
				}
			}
		}
	}
</style>
