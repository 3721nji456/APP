<template>
	<view class="payment-success">
		<view class="f-active-color" style="font-size: 52rpx;">支付成功</view>
		<view @tap="goHome" class="return-index f-active-color">返回首页</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			goHome(){
				uni.switchTab({
					url:'../index/index'
				})
			}
		}
	}
</script>

<style scoped>
	.payment-success{
		width: 100vw;
		height: 80vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.return-index{
		margin-top: 10rpx;
		padding: 20rpx 20rpx;
		border: 4rpx solid #49BDFB;
		border-radius: 40rpx;
	}
</style>
