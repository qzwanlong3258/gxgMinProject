import types from '../mutationTypes';
import {
	request
} from '../../config/http.js';
import {
	GET_THEME,
	GET_CATEGORY,
	GET_STYLE_LIST
} from '../../config/api.js';

export default {
	namespaced: true,
	state: {
		list: []
	},
	mutations: {
		[types.SET_CATEGORY_LIST](state, data) {
			state.list = data;
		}
	},
	actions: {
		getCategoryList({
			commit,
			state
		}, data) {
			return request({
				url: GET_CATEGORY,
				data: {
					size: 999,
					...data
				}
			}).then(res => {
				let list = res.list.map((item,index) => {
					return {
						id: item.id,
						index: index,
						imgUrl: item.imgurl,
						name: item.NAME
					}
				});
				commit(types.SET_CATEGORY_LIST, list);
			});
		}
	}
}
