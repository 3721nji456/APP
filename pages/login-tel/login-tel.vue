<template>
	<view>
		<Lines></Lines>
		
		<view class="login-tel">
			<view class="login-main">
				<view class="login-form">
					<view class="login-user">
							<text class="user-text">手机号</text>
							<input type="number" focus="true" v-model="userTel" value="" placeholder="请输入手机号"/>
						</view>
					<view class="tel" @tap='goNext'>注册手机号</view>
				</view>
			</view>
		</view>
		
	</view>
	
</template>

<script>
	import Lines from '@/component/common/Line.vue'
	import $http from '@/common/api/request.js'
	export default {
		data() {
			return {
				userTel:'',
				rules:{
					userTel:{
						rule:/^1[23456789]\d{9}$/,
						msg:"请输入11位手机号"
					}
				}
			}
		},
		components:{
			Lines
		},
		methods: {
			//判断是否符合规则
			validata(key){
				let bool=true;
				if(!this.rules[key].rule.test(this[key])){
					uni.showToast({
						title:this.rules[key].msg,
						icon:'none'
					})
					bool=false;
					return false;
				}
				return bool;
			},
			
			goNext(){
				if(!this.validata('userTel')) return;
				//请求验证手机号
				$http.request({
					url:'/register',
					method:'post',
					data:{
						phone:this.userTel
					}
				}).then((res)=>{
					if(res.success==true){
						uni.navigateTo({
							url:'../login-code/login-code?phone='+this.userTel+''
						})
					}else{
						uni.showToast({
							title:res.msg,
							icon:'none'
						})

					}
				})
				
				

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
