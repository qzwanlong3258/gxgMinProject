<template>
	<view class="order-nav">
		<view class="nav-box">
			<view class="order-tip title-font">我的订单</view>
			<view class="order-list">
				<view v-for='(item,index) in orderList' :key='index' class="order-clonum" :data-id='item.id' @click="changeNav">
					<i :class='["iconfont",item.icon]'></i>
					<text class="order-counts" v-if='item.counts'>{{item.counts}}</text>
					<text class="tip-font">{{item.title}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { ORDER_LIST } from '@/config/router.js'
		
	export default {
		props: {
			orderList: {
				type: Array
			},
			isMinePage:{
				type: Boolean
			},
		},
		data() {
			return {

			};
		},
		methods: {
			changeNav: function(e){
				if(this.isMinePage){
					uni.navigateTo({
						url:`${ORDER_LIST}?state=${e.currentTarget.dataset.id}`
					})
				}
				this.$emit('changeOrderList', {id: e.currentTarget.dataset.id})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.order-nav {
		width: 100%;
		border-top: 4upx solid #dcdcdc;
		border-top-left-radius: 120upx;
		border-top-right-radius: 120upx;
		background: #fff;
		.nav-box{
			width: 82%;
			margin: 70upx 9%;
			.order-tip {
				color: #000;
			}
			.order-list {
				width: 100%;
				height: 194upx;
				display: flex;
				justify-content: space-around;
				align-items: center;
				border: 1upx solid #dcdcdc;
				border-radius: 10upx;
				margin-top: 20upx;
				.order-clonum {
					i {
						font-size: 64upx;
					}
			
					.order-counts {
						width: 40upx;
						height: 40upx;
						background: #baa16d;
						position: absolute;
						font-size: 24upx;
						border-radius: 50%;
						text-align: center;
						line-height: 40upx;
						margin-top: -76upx;
						margin-left: 40upx;
					}
					.tip-font {
						color: #333;
						position: relative;
						top: -10upx;
					}
				}
			}
		}


	}
</style>
