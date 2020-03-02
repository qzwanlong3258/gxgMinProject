import {
	request
} from '@/config/http.js';
import {
	CREATE_ORDER
} from '@/config/api.js';

export function createOrder(data) {
	return request({
		method: 'POST',
		url: CREATE_ORDER,
		data
	}).then(res => res.orderid);
}