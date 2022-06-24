<template>
	<view class="login-other">
		<view class="other-text">
			<view>或用以下方式登陆</view>
		</view>
		<view class="other">
			<view class="other-item" @tap='loginOther("weixin")'>
				<image src="../../static/img/q (1).png"></image>
				<text>微信登陆</text>
			</view>
			<view class="other-item" @tap='loginOther("sinaweibo")'>
				<image src="../../static/img/qw.png"></image>
				<text>支付宝登陆</text>
			</view>
			<view class="other-item" @tap='loginOther("qq")'>
				<image src="../../static/img/q.webp"></image>
				<text>微博</text>
			</view>
		</view>
	</view>
</template>

<script>
	import $http from '@/common/api/request.js'
	import {mapMutations} from 'vuex'
	export default{
		methods:{
			...mapMutations(['login']),
			loginOther(mode){
				console.log(mode);
				uni.login({
					//要拿openid
					provider:mode,
					success: (res) => {
						//要拿openid
						let openid = res.authResult.openid;
						uni.getUserInfo({
							provider:mode,
							success: (res) => {
								let provider=mode;
								let openid=res.userInfo.openId||res.userInfo.openid;
								let nickName=res.userInfo.nickName;
								let avatarUrl=res.userInfo.avatarUrl;
								$http.request({
									url:'/loginother',
									method:'post',
									data:{
										provider,
										openid, 
										nickName,
										avatarUrl
									}
								}).then((res)=>{
									this.login(res);
									uni.navigateBack({
										delta:1
									})
								})
							}
						})
					}
				})
			}
		}
	}
</script>

<style scoped>
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
</style>