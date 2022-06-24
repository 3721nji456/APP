export default{
	state:{
		list:[
			// {
			// 	name:"张三",
			// 	tel:"18511773322",
			// 	city:"北京市海定区",
			// 	details:"4号楼",
			// 	isDefault:false
			// },
			// {
			// 	name:"李四",
			// 	tel:"18511773322",
			// 	city:"北京市海定区",
			// 	details:"4号楼",
			// 	isDefault:true
			// }
		]
	},
	getters:{
		defaultPath(state){
			return state.list.filter(v=>{
				return v.isDefault==1;})
		}
	},
	mutations:{
		//初始化地址信息
		initAddresslist(state,list){
			state.list=list;
		},
		createPass(state,obj){
			state.list.unshift(obj); 
		},
		updatePass(state,{index,item}){
			 for(let key in item){
				 state.list[index][key]=item[key];
			 }
		},
		//将以前选中的变成未选中
		removePath(state){
			state.list.forEach(v=>{
				if(v.isDefault){
					v.isDefault=0;
				}
			})
		}
	},
	actions:{
		createPassFn({commit},obj){
			if(obj.isDefault){
				commit("removePath");
			}
			commit('createPass',obj);
		},
		updatePassFn({commit},obj){
			if(obj.item.isDefault){
				commit("removePath");
			}
			commit('updatePass',obj);
		}
	},
}