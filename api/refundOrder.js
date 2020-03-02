import {
	request
} from '@/config/http.js';
import {
	GET_ALTER_SALE
} from '@/config/api.js';

export function getAlterSale(data) {
	return request({
		method: 'POST',
		url: GET_ALTER_SALE,
		data,
	})
}