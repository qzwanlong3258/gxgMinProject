import {
	request
} from '@/config/http.js';
import {
	GET_ORDER_LIST,
	GET_WORKS,
	SEND_VERIFICATION_CODE,
	DELETE_WORKS,
	BIND_PHONE
} from '@/config/api.js';

export function getCreationList(data,showLoading) {
	return request({
		url: GET_WORKS,
		showLoading,
		data: {
			...{
				page: 1,
				size: 6
			},
			...data
		}
	}).then(res => {
		return {
			list: res.list.map(item => {
				return {
					id: item.gid,
					url: item.zurl?item.zurl:item.furl,
					clothesUrl: item.zurl?item.zmodelurl:item.fmodelurl,
					size: {
						sizeId: item.sizeid,
						name: item.size,
						value: item.size
					},
					price: item.money
				}
			}),
			count: res.count
		}
	})
}

export function sendVerificationCode(phone) {
	return request({
		method: 'POST',
		url: SEND_VERIFICATION_CODE,
		showSuccessToast: true,
		data: {phone}
	})
}

export function deleteWorks(id) {
	return request({
		method: 'POST',
		url: DELETE_WORKS,
		data: {id:id},
		showLoading: true
	}).then(res => {
		
	})
}

export function bindPhone(data) {
	return request({
		method: 'POST',
		url: BIND_PHONE,
		data
	})
}