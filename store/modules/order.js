import types from '../mutationTypes'

import {
	request
} from '../../config/http.js';
import {
	GET_ORDER_STATUS,
} from '@/config/api.js';
import {getOrderDetail} from '@/api/orderStatus';
import regeneratorRuntime from '@/utils/regenerator-runtime/runtime.js';
import {
	formatOrderState,
	formatOrderStateIcon
} from '@/config/filter.js';

export default {
	namespaced: true,
	state: {
		item: {},
		status: {}
	},
	mutations: {
		[types.SET_ORDER_ITEM](state, data) {
			state.item = data;
		},
		[types.SET_ORDER_STATUS](state, data) {
			for (let i=1;i<5;i++) {
				if (!data.find(item => item.id==i)) data.push({
					id: i,
					title: formatOrderState(i),
					icon: formatOrderStateIcon(i),
					counts: 0
				});
			};
			data.sort((v1,v2) => {
				return v1.id-v2.id;
			});
			state.status = data;
		}
	},
	actions: {
		getOrderItem({
			commit,
			state
		}, data) {
			return getOrderDetail(data).then(res => {
				commit(types.SET_ORDER_ITEM, res)
				return res
			});
		},
		async getOrderStatus({
			commit,
			state
		}, data) {
			let orderStatus = await request({
				url: GET_ORDER_STATUS,
				showLoading: false
			});
			commit(types.SET_ORDER_STATUS, orderStatus.list.map(item => {
				return {
					id: Number(item.state),
					title: formatOrderState(item.state),
					icon: formatOrderStateIcon(item.state),
					counts: item.count
				}
			}).filter(item => item.id != 0));
		}
	}
}
