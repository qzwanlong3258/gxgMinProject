import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

//导入数据管理模块

import user from './modules/user';
import category from './modules/category';
import order from './modules/order';

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        user,
		category,
		order
    },
    getters
})

export default store