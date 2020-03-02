const getters = {
	userInfo: state => state.user,
	categoryList: state => state.category.list,
	orderInfo: state => state.order.item
}

export default getters
