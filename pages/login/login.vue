<template>
	<view class="login">
		
		<swiper vertical="true" style="height: 100vh;">
			<swiper-item>
				<scroll-view>
					<view class="login-tel">
						<view class="tel-main">
					
							<view class="close" @tap="Back">
								<image class="close-img" src="../../static/img/a (3).webp" mode=""></image>
							</view>
							<view class="logo">
								<image class="logo-img" src="../../static/img/a (6).webp" mode=""></image>
							</view>
							<view class="tel" @tap="goLoginTel">
								手机号注册
							</view>
							<LoginOther></LoginOther>
							<view class="login-go">
								<view>已有帐号，去登录</view>
								<image src="../../static/img/city.webp" mode=""></image>
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view>
					<view class="login-tel">
						<view class="tel-main">
							<view class="close close-center">
								<view @tap="Back">
									<image class="close-img" src="../../static/img/a (3).webp" mode=""></image>
								</view>
								<view class="login-go">
									<image class="close-img" src="../../static/img/city.webp"></image>
									<view>没有账号,去注册</view>
								</view>
								<view></view>
							</view>
							<view class="login-form">
								<view class="login-user">
									<text class="user-text">账号</text>
									<input type="text" v-model="userName" value="" placeholder="请输入账号"/>
								</view>
								<view class="login-user">
									<text class="user-text">密码</text>
									<input type="text" v-model="userPwd" value="" placeholder="请输入密码"/>
								</view>
							</view>
							<view class="login-quick">
								<view>忘记密码</view>
								<view>免密登录</view>
							</view>
							<view class="tel" @tap='subMit'>登录</view>
							<view class="reminder">温馨提示：你可以选择免密登录，更加方便</view>
							<LoginOther></LoginOther>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		
		
		
		
		
	</view>
</template>

<script>
	import $http from '../../common/api/request.js'
	import LoginOther from '@/component/login/login-other.vue'
	import {mapMutations} from 'vuex'
	export default {
		data() {
			return {
				qaq:'1234',
				userName:'',
				userPwd:'',
				rules:{
					userName:{
						rule:/\S/,
						msg:"账号不能为空"
					},
					userPwd:{
						rule:/^[0-9a-zA-z]{6,16}$/,
						msg:"密码应为6-16的字符"
					}
				}
			}
		},
		components:{
			LoginOther
		},
		methods: {
			...mapMutations(['login']),
			Back(){
				uni.navigateBack({
					delta:1
				})
			},
			//登陆方法
			subMit(){

				if(!this.validata('userName')) return; 
				if(!this.validata('userPwd')) return; 
				
				uni.showLoading({
					title:'登录中.....'
				})
				
				
				
				//请求
				$http.request({
					url:'/login',
					method:'POST',
					data:{
						userName:this.userName,
						userPwd:this.userPwd
					}
				}).then((res)=>{
					
					if(res.success){
						//保存用户信息
						this.login(res.data);
						
						
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
						
						console.log(res.msg);
						uni.hideLoading();
						// uni.showLoading();
						uni.navigateBack({
							delta:1
						})
					}else{
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
					}
					
				}).catch(()=>{
					
				})
				
				

			},
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
			goLoginTel(){
				
				uni.navigateTo({
					url:'../login-tel/login-tel'
				})
			},

		}
	}
</script>

<style scoped>
	.login-tel{
		width: 100vw;
		height: 100vh;
	}
	.tel-main{
		padding: 0 20rpx;
	}
	.close{
		padding: 120rpx 0;
	}
	.close-img{
		width: 60rpx;
		height: 60rpx;
	}
	.logo{
		padding-bottom: 100rpx;
		display: flex;
		justify-content: center;
	}
	.logo-img{
		width: 200rpx;
		height: 200rpx;
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
	
	
	.login-other{
		padding: 100rpx 0;
		
	}
	.other-text{
		display: flex;
		padding: 50rpx  0;
		
	}
	.other-text view{
		line-height: 0;
		padding: 0 10px;
	}
	.other-text:after{
		flex:1;
		content: '';
		height: 2rpx;
		background-color: #CCCCCC;
	}
	.other-text:before{
		flex:1;
		content: '';
		height: 2rpx;
		background-color: #CCCCCC;
	}
	.other{
		display: flex;
		justify-content: space-around;
	}
	.other-item{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.other-item image{
		width: 80px;
		height: 80px;
	}
	
	
	.login-go{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		
	}
	.login-go image{
		width: 60rpx;
		height: 60rpx;
	}
	
	.close-center{
		display: flex;
		
	}
	.close-center view{
		flex:1;
	}
	
	.login-form{
		padding-top: 100rpx;
		
	}
	.login-user{
		font-size: 32rpx;
		padding: 10rpx 0;
		display: flex;
		align-items: center;
		border-bottom: 2rpx solid #F7F7F7;
	}
	.user-text{
		padding-right: 20rpx;
	}
	.login-quick{
		display: flex;
		justify-content: space-between;
		padding: 20rpx 0;
	}
	.reminder{
		color:#CCCCCC;
		padding: 20rpx 0;
		text-align: center;
		font-size: 28rpx;
	}
</style>
