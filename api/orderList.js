import {
	request
} from '@/config/http.js';
import {
	GET_ORDER_LIST,
	GET_ORDER_BUTTON
} from '@/config/api.js';
import {
	formatGender,
	formatOrderStateIcon
} from '@/config/filter';

export function getOrderList(data,showLoading) {
	let p1 = request({
		url: GET_ORDER_LIST,
		showLoading,
		data
	})
	let p2 = request({
		url: GET_ORDER_BUTTON,
		data: {state: data.state}
	})
	return Promise.all([p1,p2]).then(result => {
		let res = result[0]
		return {
			count: res.count,
			list: res.list.map(item => {
				return {
					id: item.orderid,
					resultList: [{
						    url: item.zmodelurl,
							localtion: 'positive',
							patternUrl: item.thzurl,
							choosedDesign: {
								elements: [],
								font: []
							}
						},
						{
							url: item.fmodelurl,
							localtion: 'negative',
							patternUrl: item.thfurl,
							choosedDesign: {
								elements: [],
								font: []
							}
						},
					],
					name: item.modelName,
					categoryName: item.categoryName,
					sexName: formatGender(item.sexName),
					sexValue: item.sexName,
					typeName: item.typeName,
					sizeName: item.sizeName,
					price: item.price,  //订单价格
					userName: item.name,
					address: item.address,
					phone: item.phone,
					status: formatOrderStateIcon(item.state),
					showBtn: result[1].list.map(item => item.id),
					allPrice: Number(item.modelMoney)+Number(item.logisicsMoney),
					deliveryPrice: item.logisicsMoney,
					modelMoney: item.modelMoney,
					counts: item.counts,
				}
			})
		}
	})
}
