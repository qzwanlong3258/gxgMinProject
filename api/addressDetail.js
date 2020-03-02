import {
	request
} from '@/config/http.js';
import {
	ADD_RECEIVE_ADDRESS,
	DELETE_RECEIVE_ADDRESS,
	UPDATE_RECEIVE_ADDRESS
} from '@/config/api.js';

export function addReceiveAddress(data) {
	return request({
		method: 'POST',
		url: ADD_RECEIVE_ADDRESS,
		data: {
			name: data.userName,
			phone: data.phone,
			isdefault: data.isDefault,
			address: data.address
		}
	})
}

export function deleteReceiveAddress(id) {
	return request({
		method: 'POST',
		url: DELETE_RECEIVE_ADDRESS,
		data: {receiveid: id}
	})
}

export function updateReceiveAddress(data) {
	return request({
		method: 'POST',
		url: UPDATE_RECEIVE_ADDRESS,
		data: {
			receiveid: data.id,
			name: data.userName,
			phone: data.phone,
			isdefault: data.isDefault,
			address: data.address
		}
	});
}