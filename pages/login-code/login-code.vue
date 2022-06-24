<template>
	<view>
		<Lines></Lines>
		
		<view class="login-tel">
			<view class="login-main">
				<view class="login-form">
					<view class="login-user">
							<text class="user-text">验证码</text>
							<input type="text" v-model="userCode" placeholder="请输入验证码"/>
							<button type="" plain="true" size="mini" :disabled="disabled" @click="sendCode">{{codeMsg}}</button>
						</view>
					<view class="tel" @tap="goNextIndex">下一步</view>
				</view>
			</view>
		</view>
		
	</view>
	
</template>

<script>
	import {mapMutations} from 'vuex'
	import $http from '@/common/api/request.js'
	import Lines from '@/component/common/Line.vue'
	export default {
		data() {
			return {
				phone:'',
				codeNumber:60,
				codeMsg:'',
				disabled:false,
				code:'',
				//用户输入的验证码
				userCode:'',
				//得到的验证码
				getCode:'',
				
			}
		},
		onLoad(e) {
			this.phone=e.phone
		},
		onReady() {
			this.codeMsg='重新发送('+this.codeNumber+')';
			this.sendCode();
		},
		components:{
			Lines
		},
		
		methods: {
			...mapMutations(['login']),
			sendCode(){
				
				$http.request({
					url:'/code',
					method:'post',
					data:{
						userName:this.phone 
					}
				}).then((res)=>{
					this.getCode=res.code;

					console.log(res.code);
				})
				
				
				this.disabled=true;
				let timer=setInterval(()=>{
					--this.codeNumber;
					this.codeMsg='重新发送('+this.codeNumber+')';
				},1000);
				setTimeout(()=>{
					clearInterval(timer);
					this.codeNumber=60;
					this.disabled=false;
					this.codeMsg='重新发送';
				},60000)
			},
			goNextIndex(){
				
				if(this.getCode=this.userCode){
					//请求接口，插入数据
					$http.request({
						url:'/test',
						method:'post',
						data:{
							userName:this.phone,
							code:this.userCode
						}
					}).then((res)=>{
						console.log("okkk");
					})
				}else{
					uni.showToast({
						title:'验证码错误',
						icon:'none'
					})
				}
				
				// if(this.getCode=this.userCode){
				// 	//请求接口，插入数据
				// 	$http.request({
				// 		url:'/addUser',
				// 		method:'post',
				// 		data:{
				// 			userName:this.phone,
				// 			code:this.userCode
				// 		}
				// 	}).then((res)=>{
				// 		//注册成功
				// 		if(res.success){
							
				// 			uni.showToast({
				// 				title:res.msg,
				// 				icon:'none'
				// 			})
							
				// 			// this.login(res.data);
							
				// 			uni.redirectTo({
				// 				url:'.../index/index'
				// 			})
				// 		}
				// 	})
				// }else{
				// 	uni.showToast({
				// 		title:'验证码错误',
				// 		icon:'none'
				// 	})
				// }
				
				// uni.switchTab({
				// 	url:'../index/index'
				// })
			}
		}
	}
</script>

<style scoped>
	.login-tel{
		width: 100vw;
		height: 100vh;
	}
	.login-main{
		padding: 0 20rpx;
	}
	.login-form{
		padding-top: 30rpx;
	}
	.login-user{
		font-size: 32rpx;
		padding: 10rpx 0;
		display: flex;
		align-items: center;
		border-bottom: 2rpx solid #F7F7F7;
		margin-bottom: 30rpx;
	}
	.user-text{
		padding-right: 20rpx;
	}
	.tel{
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		color: #FFFFFF;
		background-color: #49BDFB;
		border-radius: 40rpx;
	}
</style>
