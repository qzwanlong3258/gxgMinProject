import {
	request
} from '@/config/http.js';
import {
	GET_RELEASE_BY_CATEGORY
} from '@/config/api.js';

export function getColtheInfo(id) {
	return request({
		url: GET_RELEASE_BY_CATEGORY,
		showLoading: false,
		data: {
			categoryid: id
		}
	}).then(res => {
		return {
			typeId: id,
			clothesType: res.map(item => {
				if (res.mcount < 1) return undefined;
				return {
					typeId: item.vid,
					name: item.vname,
					imgUrl: item.vimgurl,
					count: item.mcount
				}
			})
		}
	})
}
