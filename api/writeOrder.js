import {
	request
} from '@/config/http.js';
import {
	GET_LOGISTICS,
	GET_RECEIVE,
	SUBMIT_ORDER,
	UNIFIED_ORDER,
	PAY_SUCCESS
} from '@/config/api.js';

export function paySuccess(id) {
	return request({
		method: 'POST',
		url: PAY_SUCCESS,
		data: {orderid:id}
	})
}

export function getDeliveryInfor() {
	return request({
		url: GET_LOGISTICS
	}).then(res => {
		let item = res.list[0];
		return {
			name: item.name,
			price: item.money
		}
	});
}

/**
 * 获取收货地址
 */
export function getAddressInfor() {
	return request({
		url: GET_RECEIVE
	}).then(res => {
		let item = res.list[0];
		return item&&{
			id: item.id,
			userName: item.name,
			phone: item.phone,
			address: item.address
		}
	})
}

/**
 * 提交订单
 */
export function submitOrder(data) {
	return request({
		method: 'POST',
		url: SUBMIT_ORDER,
		data
	})
}

/**
 * 统一下单
 */
export function unifiedOrder(data) {
	return request({
		method: 'POST',
		url: UNIFIED_ORDER,
		data
	}).then(res => {
		return {
			timeStamp: res.timeStamp,
			nonceStr: res.nonceStr,
			package: res.package,
			signType: res.signType,
			paySign: res.sign
		}
	})
}
