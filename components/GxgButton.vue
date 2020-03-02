<template>
	<view>
		<button class="btn-box" @click.capture.self="clickEvent">
			<slot></slot>
		</button>
	</view>
</template>

<script>
	export default {
		methods: {
			clickEvent: function() {
				this.$emit('clickBtn')
			}
		}
	}
</script>

<style>
	.btn-box {
		width: 300upx;
		height: 70upx;
		border-radius: 32upx;
		background: #000000;
		color: #fff;
		font-size: 30upx;
		line-height: 70upx;
		text-align: center;
	}
</style>
