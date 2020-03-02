import types from '../mutationTypes'


const user = {
	namespaced: true,
	state: {
		name: '',
		role: '',
	},
	mutations: {
		[types.GET_USER_INFOR](state, data) {
			const tempState = state
			for (let item in tempState) {
				if (data.hasOwnProperty(item)) {
					tempState[item] = data[item]
				}
			}
			state = tempState
		},
		[types.CLEAR_USER_INFO](state) {
			const tempState = {
				name: '',
				role: ''
			}
			state = tempState
		}
	},
	actions: {
		login({
			commit,
			state
		}, data) {

		},
		clearToken({
			commit,
			state
		}) {

		}
	}
}

export default user
