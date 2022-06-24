export default{
	state:{
		//登录状态
		loginStatus:false,
		//token
		token:null,
		//用户信息
		userInfo:{}
	},
	getters:{
		
	},
	mutations:{
		//进入app，读取用户信息
		initUser(state){
			let userInfo=uni.getStorageSync('userInfo');
			if(userInfo){
				userInfo=JSON.parse(userInfo);
				state.userInfo=userInfo;
				state.loginStatus=true;
				state.token=userInfo.token;
			}
		},
		//登陆后报存用户信息
		login(state,userInfo){
			state.userInfo=userInfo;
			state.loginStatus=true;
			state.token=userInfo.token;
			console.log(userInfo.token);
			//持久化存储
			uni.setStorageSync('userInfo',JSON.stringify(userInfo));
		},
		//退出登录
		loginOut(state){
			state.loginStatus=false;
			state.userInfo={};
			state.token=null;
			//删除本地持久存储
			uni.removeStorageSync('userInfo');
		}
	},
	actions:{
		
	}
}