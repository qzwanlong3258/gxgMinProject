<template>
	<view class="left-top">
		<text>左右滑动</text>
		<i class="iconfont iconright"></i>
		<text>选择品类</text>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.left-top {
		position: fixed;
		left: 0;
		top: calc(50% - 280upx);
		width: 60upx;
		height: 440upx;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 26upx;
		color: #fff;
		background: #000;
		flex-direction: column;
		border-top-right-radius: 12upx;
		border-bottom-right-radius: 12upx;
		text {
			display: block;
			writing-mode:lr-tb;
			width: 30upx;
			text-align: center;
			line-height: 30upx;
		}
		i {
			position: relative;
			display: block;
			width: 34upx;
			height: 28upx;
			background: #fff;
			color: #000;
			border-radius: 16upx;
			text-align: center;
			line-height: 28upx;
			font-weight: 600;
			margin: 22upx 0;
		}
	}
</style>
