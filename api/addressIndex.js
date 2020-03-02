import {
	request
} from '@/config/http.js';
import {
	GET_RECEIVE,
	UPDATE_ORDER_ADDRESS
} from '@/config/api.js';

export function getReceiveAddress() {
	return request({
		url: GET_RECEIVE,
		showLoading: false
	}).then(res => {
		return res.list.map((item,index) => {
			return {
				id: item.id,
				userName: item.name,
				phone: item.phone,
				isDefault: index==0,
				address: item.address
			}
		});
	})
}

export function updateOrderAddress(data) {
	return request({
		method: 'POST',
		url: UPDATE_ORDER_ADDRESS,
		data
	})
}