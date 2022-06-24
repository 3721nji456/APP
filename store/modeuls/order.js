export default{
	state:{
		ordernum:''
	},
	getters:{
		
	},
	mutations:{
		initorder(state,order){
			state.ordernum=order;
			console.log(state.ordernum+"12345eeeee");
		}
	}
}