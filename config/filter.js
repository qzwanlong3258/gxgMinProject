
/**
 * 格式化-性别
 */
export function formatGender(gender) {
	switch(Number(gender)) {
		case 1: return '男';
		case 2: return '女';
		case 3: return '儿童';
	}
}

/**
 * 格式化-订单状态
 */
export function formatOrderState(state) {
	switch(Number(state)) {
		case 0: return '退款';
		case 1: return '待付款';
		case 2: return '待发货';
		case 3: return '待收货';
		case 4: return '已完成';
		case 5: return '已关闭';
	}
}

/**
 * 格式化-订单状态icon
 */
export function formatOrderStateIcon(state) {
	switch(Number(state)) {
		case 1: return 'icondaifukuan1';
		case 2: return 'icondaifahuo';
		case 3: return 'icondaishouhuo';
		case 4: return 'iconyiwanchengdingdan';
	}
}

/**
 * 格式化-订单按钮状态
 */
export function formatOrderButtonState(state) {
	switch(Number(state)) {
		case 1: return {
			id: 1,
			name: '联系卖家',
			event: 'makePhoneCall',
			params: '0574-83017657'
		};
		case 2: return {
			id: 2,
			name: '取消订单',
			event: 'deleteOrder'
		};
		case 3: return {
			id: 3,
			name: '付款',
			event: 'linkToWriteOrder'
		};
		case 4: return {
			id: 4,
			name: '修改地址',
			event: 'linkToAddress'
		};
		case 5: return {
			id: 5,
			name: '物流单号',
			event: 'copyOrder'
		};
		case 6: return {
			id: 6,
			name: '确认收货',
			event: 'orderDelivery'
		};
		case 7: return {
			id: 7,
			name: '联系客服',
			event: 'makePhoneCall',
			params: '0574-83017657'
		};
		case 8: return {
			id: 8,
			name: '再来一单',
			event: 'linkToWriteOrder'
		};
		case 9: return {
			id: 9,
			name: '售后维权',
			event: ''
		};
		case 10: return {
			id: 10,
			name: '回到首页'
		}
	}
}