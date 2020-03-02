<template>
	<view class='module-box'>
		<view class='module-top'>
			<image :src='dataObj.topImg' mode='widthFix'></image>
		</view>
		<view class='things-list'>
			<view class='list-clonum' v-for="(item,index) in dataObj.clothesList" :key="index" v-if='index<dataObj.componentCounts' :data-id='item.id' @click="goSatrtTodo">
				<view class='clonum-img'>
					<image :src='item.clothesImg' mode='aspectFit'></image>
					<view class='start-todo-home' :data-id='item.id'>
						<image :src='dataObj.btnImg' mode='aspectFit'></image>
					</view>
				</view>
				<view class='thing-info title-font'>
					<view class='thing-name one-line-elipsis'>{{item.name}}</view>
					<view class='thing-price'>￥{{item.price}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { SELECT_TYPE } from '@/config/router.js'
	export default {
		data() {
			return {

			};
		},
		props: {
			dataObj: {
				type: Object,
				value: ''
			}
		},
		methods: {
			goSatrtTodo: function(e){
				uni.navigateTo({
					url: `${SELECT_TYPE}?id=${e.currentTarget.dataset.id}&type=0`  
				});
			}
		}
	}
</script>

<style>
.module-box {
  width: 98%;
  margin-left: 1%;
  background: #fff;
  border-radius: 24rpx;
  box-shadow: 0 10rpx 20rpx 8rpx rgba(0, 0, 0, .1);
  margin-bottom:70rpx;
}
.module-box .module-top {
  width: 100%;
  height: 365rpx;
  text-align: center;
  overflow:hidden;
  background: #e1e1e1;
  border-top-left-radius: 24rpx;
  border-top-right-radius: 24rpx;
}
.module-top image {
  width: 100%;
  height: 100%;
  border-top-left-radius: 24rpx;
  border-top-right-radius: 24rpx;
}
.module-box .decoration-logo {
  width: 100%;
  height: 112rpx;
}
.decoration-logo image {
  height: 100%;
  width: 100%;
}
.module-box .things-list {
  width: 100%;
  display: flex;
  flex-wrap:wrap;
  margin: 40upx 0;
}
.things-list .list-clonum {
  width: 290rpx;
  height: 505rpx;
  margin-left: 42rpx;
  margin-bottom: 12rpx;
}
.list-clonum .clonum-img {
  width: 290rpx;
  height: 395rpx;
  border-radius: 20rpx;
}
.clonum-img image{
  width: 100%;
  height: 100%;
  border-radius: 20rpx;
}
.clonum-img .start-todo-home {
  width:152rpx;
  height:42rpx;
  background:#434343;
  font-size:20rpx;
  color:#fff;
  text-align:center;
  line-height:40rpx;
  border-radius:43rpx;
  position:absolute;
  margin-left:68rpx;
  margin-top:-100rpx;
}
.list-clonum .thing-info {
  width: 100%;
  height: 110rpx;
  text-align: center;
}
.thing-info .thing-name {
  margin-top: 18rpx;
  color: #000;
  font-size:25rpx;
}
.thing-info .thing-price {
  margin-top: 10rpx;
  font-weight: bold;
  font-size: 25rpx;
}
</style>
