import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

//购物车
import cart from './modeuls/cart.js'
//地址管理
import path from './modeuls/path.js'
//用户
import user from './modeuls/user.js'
//订单存储
import order from './modeuls/order.js'
export default new Vuex.Store({
	
	modules:{
		cart,
		path,
		user,
		order
	}
	
	
})