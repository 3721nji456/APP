import $http from '@/common/api/request.js'
export default{
	state:{
		list:[],
		selectList:[]
	},
	getters:{
		//判断是否全选
		checkedA(state){
			return state.list.length===state.selectList.length;
		},
		//合计+结算数量
		totalCount(state){
			let total={
				pprice:0,
				num:0
			}
			state.list.forEach(v=>{
				//是否选中 
				if(state.selectList.indexOf(v.id)>-1){
					//合计
					total.pprice+=v.pprice*v.num;
					//结算数量
					total.num=state.selectList.length; 
				}
			})
			return total;
		}
	},
	mutations:{
		//数据赋值
		inigetData(state,list){
			state.list=list;

		},
		//全选
		checkedall(state){
			state.selectList=state.list.map(v=>{
				v.checked=true;
				return v.id;
			})
		},
		
		//全不选
		uncheckedall(state){
			state.list.forEach(v=>{
				v.checked=false;
			});
			state.selectList=[];
		},
		//单选
		selectItem(state,index){
			let id=state.list[index].id;
			let i=state.selectList.indexOf(id);
			//如果selectList已经存在，代表之前已经存在，checked=false,在selecList中删除
			if(i>-1){
				state.list[index].checked=false;
				return state.selectList.splice(i,1);
			}
			//之前未选中，把id加入selectList中，checked=true
			state.list[index].checked=true;
			state.selectList.push(id);
		},
		delGoods(state){
			state.list=state.list.filter(v=>{
				return state.selectList.indexOf(v.id)===-1;
			})
		},
		//加入购物车
		addShopCart(state,goods){
			state.list.push(goods);
		},
		
	},
	actions:{
		checkedAll({commit,getters}){
			getters.checkedA ? commit("uncheckedall"):commit("checkedall");
		},
		delGoodsFn({commit,state}){
			
			uni.showModal({
				content:'确定删除吗？',
				success:()=>{
					$http.request({
						url:'/deletecart',
						method:'post',
						header:{
							token:true
						},
						data:{
							goodsid:state.selectList
						}
					}).then((res)=>{
						commit('delGoods');
						commit('unclickedall');
						uni.showToast({
							title:'删除成功',
							icon:'none'
						})
					})
				}
			})
			
			
		}
	}
}