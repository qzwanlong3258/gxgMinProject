<template>
	<!-- <view class="container">
		<image class="gxg-logo" :src="gxgLogo"></image> -->
		<!-- #ifdef MP-WEIXIN -->
		<!-- <button class="auth-btn" open-type="getUserInfo" @getuserinfo="getUserInfo">
			<image :src="gxgBtn"></image>
		</button> -->
		<!-- #endif -->
		<!-- <image class="gxg-enter" :src="gxgEnter"></image>
	</view> -->
	<view class="box" style="width: 100%;height:100%;">
		<button style="width: 100%;height:100%;z-index:9999;opacity:0;" open-type="getUserInfo" @getuserinfo="getUserInfo" >
			<image :src="gxgBtn"></image>
		</button>
	</view>
</template>

<script>
	// #ifdef MP-WEIXIN
	import wxAuth from './wxAuth.js'
	export default {
		...wxAuth,
	}
	// #endif
</script>

<style lang="scss" >
	// .container {
	// 	display: flex;
	// 	justify-content: center;
	// 	align-items: center;
	// 	.gxg-logo {
	// 		position: absolute;
	// 		margin-top: -150upx;
	// 		width: 368upx;
	// 		height: 119upx;
	// 	}
	// 	.auth-btn {
	// 		position: absolute;
	// 		background: none;
	// 		width: 250upx;
	// 		height: 100upx;
	// 		image {
	// 			width: 200upx;
	// 			height: 50upx;
	// 		}
	// 	}
	// 	.gxg-enter {
	// 		position: fixed;
	// 		bottom: 8%;
	// 		width: 134upx;
	// 		height: 30upx;
	// 	}
	// }
	.btn{
		position:fixed;width: 100%;height:100%;z-index:9999;opacity:0;
	}
// 	.auth-bg {
// 		width: 100%;
// 		height: 100%;
// 		position: absolute;
// 	}
// 
// 	.auth-btn {
// 		position: fixed;
// 		color: #fff;
// 		background: none;
// 		display: flex;
// 		width: 500upx;
// 		height: 80upx;
// 		font-size: 32upx;
// 		line-height: 80upx;
// 		border: 1upx solid;
// 		border-radius: 0;
// 		bottom: 180upx;
// 		margin: 0 auto;
// 		left: 0;
// 		right: 0;
// 		text-align: center;
// 		justify-content: center;
// 
// 		i {
// 			font-size: 36upx;
// 			margin-right: 22upx;
// 		}
// 	}
</style>
