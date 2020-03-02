<template>
	<scroll-view scroll-y class="container">
		<view class="clothe-infor">
			<order-infor :order='orderInformation'></order-infor>
			<i @click='goOrderListPage' class='iconfont iconcha'></i>
		</view>
		<view class="order-infor">
			<view class="address-infor">
				<view class="adress-tip title-font">收货地址</view>
				<gxg-address :address='addressInfor'></gxg-address>
			</view>
			<view class="delivery-infor">
				<view class="title-font">快递</view>
				<view class="infor-content">
					<i class='iconfont iconqueding'></i>
					<view class="tip-font delivery-name">{{deliveryInfor.name}}</view>
					<view class="tip-font">￥{{deliveryInfor.price}}</view>
				</view>
			</view>
			<view class="pay-infor">
				<view class="title-font">支付方式</view>
				<view class="infor-content">
					<view class="tip-font">微信支付</view>
				</view>
			</view>
			<view class="money-infor">
				<view class="tip-font infor-con">
					<view>商品总金额</view>
					<view>￥{{orderInformation.modelMoney}}</view>
				</view>
				<view class="tip-font infor-con">
					<view>优惠券抵扣</view>
					<view>￥ 0.00</view>
				</view>
				<view class="tip-font infor-con">
					<view>运费</view>
					<view>￥ {{deliveryInfor.price}}</view>
				</view>
				<view class="title-font infor-con">
					<view>实付款</view>
					<view>￥ {{accAdd(deliveryInfor.price,orderInformation.modelMoney)}}</view>
				</view>
			</view>
		</view>
		<gxg-button class="start-todo" @clickBtn='startTodo'>提交订单</gxg-button>
		<gxg-model v-if='isShowModel' :modelData='modelSetting' @cancelClick='cancelModelStatus' @sureClick='sureModelStatus'>
		   <view>亲爱的顾客，感谢使用“GXGBASIC定制服务”，使用前请阅读规则提示：</view>
		   <view>1、定制商品是消费者定做的商品，付款后即开始制作，不支持取消订单或任何形式退换货行为（除商品本身质量问题外）。</view>
		   <view>2、由于屏幕的不同，定制商品与应用中显示的效果图有可能出现不同，因此如有色差或细节上的不一致，不属于质量问题不支持退换货。</view>
		   <view>3、如所定制内容涉及政治、宗教、不雅字词及违法内容，本店有权拒绝提供定制服务。</view>
		</gxg-model>
	</scroll-view>
</template>

<script>
	import {
		ORDER_STATUS,
		MINE_IDNEX,
		ORDER_LIST
	} from '@/config/router.js'
	import OrderInfor from '@/components/OrderInfor'
	import GxgAddress from '@/components/GxgAddress'
	import GxgButton from '@/components/GxgButton'
	import GxgModel from '@/components/GxgModel'
	import regeneratorRuntime from '@/utils/regenerator-runtime/runtime.js';
	import {
		toast,
		model,
		wxpay
	} from '@/config/package.js';
	import {
		getDeliveryInfor,
		getAddressInfor,
		submitOrder,
		unifiedOrder,
		paySuccess
	} from '@/api/writeOrder.js';
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex';
	import types from '@/store/mutationTypes'
	import {accAdd} from '@/utils/util.js'

	export default {
		data() {
			return {
				deliveryInfor: {},
				submiting: false,
				wxJsApiParam: {},
				options: {},
				orderInfor: {},
				addressInfor: {},
				isShowModel: false, //是否显示弹窗
			}
		},
		components: {
			OrderInfor,
			GxgAddress,
			GxgButton,
			GxgModel
		},
		computed: {
			...mapState({
				orderInformation: state => state.order.item
			})
		},
		onLoad(options) {
			this.options = options;
		},
		onShow() {
			this.loadData();
		},
		methods: {
			...mapMutations('order', [types.SET_ORDER_ITEM]),
			...mapActions('order', ['getOrderItem']),
			accAdd,
			
			//改变提示弹窗显示与隐藏
			changeModelStatus: function() {
				this.isShowModel = !this.isShowModel
			},
			//获取微信支付参数
			getRepayParam: function() {
				return unifiedOrder({
					id: this.orderInformation.id,
					price: this.accAdd(this.deliveryInfor.price,this.orderInformation.modelMoney)
				})
			},
			loadData() {
				getDeliveryInfor().then(res => {
					this.deliveryInfor = res;
				});
				this.getOrderItem(this.options.id).then(res => {
					let orderInfo = this.orderInformation;
					this.options.price && (orderInfo.modelMoney = res.modelMoney ? res.modelMoney : this.options.price);
					!this.orderInformation.resultList.find(item => !item.patternUrl) && (orderInfo.modelMoney = this.accAdd(orderInfo.modelMoney,50));
				})
				// 如果订单信息没有收货地址，默认获取第一个地址
				let cachingAddress = getApp().globalData.addressInfor;
				this.checkAddress(cachingAddress) ? (this.addressInfor = cachingAddress) : (getAddressInfor().then(res => {
					this.addressInfor = res
				}))
			},
			/**
			 * 地址检测
			 */
			checkAddress(info) {
				return info && info.address && info.userName && info.phone;
			},
			goOrderListPage: function() {
				uni.navigateTo({
					url: `${ORDER_LIST}?state=1`
				})
			},
			
			/**
			 * 提交操作
			 */
			startTodo: async function() {
				// 如果处于提交中
				if (this.submiting) return;
				this.submiting = true;
				// 如果没有地址
				if (!this.checkAddress(this.addressInfor)) {
					await model({
						content: '请添加收货地址'
					})
					this.submiting = false;
					return;
				}
				// 如果商品下架
				if (!this.orderInformation.canYouPay) {
					await model({
						title: '温馨提示',
						content: '该商品已经下架',
						showCancel: false
					})
					this.submiting = false;
					return;
				}
				// 规则提示
				// let ruleRes = await model({
				// 	title: '规则提示',
				// 	content: this.contentTip
				// })
				// if (ruleRes.cancel) {
				// 	this.submiting = false;
				// 	return;
				// }
				this.changeModelStatus()
				
			},
			//规则提示被拒绝
			cancelModelStatus: function(){
				this.changeModelStatus();
				this.submiting = false;
			},
			//规则提示确定
			sureModelStatus: async function(){
				this.changeModelStatus();
				let {
					orderid
				} = await submitOrder({
					orderid: this.orderInformation.id,
					receiveid: this.addressInfor.id,
					money: this.accAdd(this.deliveryInfor.price,this.orderInformation.modelMoney),
					count: 1,
				});
				// 微信支付
				const wxJsApiParam = await this.getRepayParam();
				const payRes = await wxpay(wxJsApiParam);
				if (payRes.type == 'success') {
					let notifyRes = await this.notifyBackendPaymentSuccess(orderid);
					notifyRes.type == 'success' && uni.navigateTo({
						url: `${ORDER_STATUS}?id=${orderid}&source=WRITE_ORDER`
					})
				}
				this.submiting = false;
			},
			/**
			 * 通知后端支付成功，可能因为网络问题,造成用户支付成功却没有通知到后端，这里通知接口最多调用5次
			 */
			async notifyBackendPaymentSuccess(orderid, level = 0) {
				if (level > 5) {
					await model({
						content: '抱歉，系统错误，请联系管理员退款',
						showCancel: false
					})
					return {
						type: 'error',
						msg: '通知超时'
					};
				}
				let successResult = await paySuccess(orderid)
				if (successResult.count >= 1) {
					return {
						type: 'success',
						msg: '通知成功'
					};
				} else {
					return this.notifyBackendPaymentSuccess(orderid, level + 1)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.iconcha {
		position: absolute;
		right: 64upx;
		top: 64upx;
	}

	.order-infor {
		width: 100%;
		height: calc(100% - 4upx);
		border-top: 4upx solid #dcdcdc;
		border-top-left-radius: 150upx;
		border-top-right-radius: 150upx;
		box-shadow: 0 0 1upx 1upx rgba(0, 0, 0, 0.1);

		.address-infor {
			width: 82%;
			margin-left: 9%;
			margin-top: 80upx;
			padding-bottom: 46upx;
			border-bottom: 1upx solid #dcdcdc;
		}

		.delivery-infor {
			width: 82%;
			margin-left: 9%;
			margin-top: 46upx;
			padding-bottom: 46upx;
			border-bottom: 1upx solid #dcdcdc;

			.infor-content {
				margin-top: 23upx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.delivery-name {
					margin-right: 380upx;
				}

				.tip-font {
					color: #333;
				}
			}
		}

		.pay-infor {
			width: 82%;
			margin-left: 9%;
			margin-top: 46upx;
			padding-bottom: 46upx;
			border-bottom: 1upx solid #dcdcdc;

			.tip-font {
				color: #333;
				margin-top: 22rpx;
			}
		}

		.money-infor {
			width: 82%;
			margin-left: 9%;
			margin-top: 46upx;
			padding-bottom: 46upx;
			border-bottom: 1upx solid #dcdcdc;

			.infor-con {
				display: flex;
				justify-content: space-between;
			}

			.tip-font {
				color: #333;
				margin-top: 22rpx;
			}

			.title-font {
				margin-top: 53upx;
			}
		}
	}
</style>
