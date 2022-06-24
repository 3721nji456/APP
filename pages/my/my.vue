<template>
	<view class="my">
		<!--头部-->
		<view class="my-header">
			<view class="header-main">
				<view class="hearder-config" @tap="goConfig">
					<image class="config-img" src="../../static/img/config.webp"></image>
				</view>
				<view class="hearder-logo">
					<image class="logo-img" :src="loginStatus?userInfo.imgUrl:'../../static/img/q.jpg'"></image>
					<view class="logo-name">
						{{ loginStatus?userInfo.nickname:"用户昵称" }}
					</view>
				</view>
			</view>
		</view>
		<!--订单-->
		<view class="order">
			<view class="order-title" @tap="gorder">
				<view>我的订单</view>
				<view>全部订单 ></view>
			</view>
			<view class="order-list">
				<view class="order-item">
					<image class="order-img" src="../../static/img/a (5).webp"></image>
					<view>待付款</view>
				</view>
				<view class="order-item">
					<image class="order-img" src="../../static/img/a (4).webp"></image>
					<view>待发货</view>
				</view>
				<view class="order-item">
					<image class="order-img" src="../../static/img/a (6).webp"></image>
					<view>待收货</view>
				</view>
				<view class="order-item">
					<image class="order-img" src="../../static/img/a (1).webp"></image>
					<view>待评价</view>
				</view>
				<view class="order-item">
					<image class="order-img" src="../../static/img/a (3).webp"></image>
					<view>退款处理</view>
				</view>
			</view>
		</view>
		<!--内容列表-->
		<view class="my-content">
			<view class="my-content-list">
				<view class="my-content-item">
					<view>我的收藏</view>
					<view>></view>
				</view>
				<view class="my-content-item">
					<view>领券中心</view>
					<view>></view>
				</view>
				<view class="my-content-item">
					<view>店铺会员</view>
					<view>></view>
				</view>
				<view class="my-content-item">
					<view>我的评价</view>
					<view>></view>
				</view>
			</view>
			<view class="my-content-list">
				<view class="my-content-item">
					<view>我的快递</view>
					<view>></view>
				</view>
				<view class="my-content-item">
					<view>更多</view>
					<view>></view>
				</view>
			</view>
		</view>
		<Tarbar currentPage='my'></Tarbar>
	</view>
</template>

<script>
	import Tarbar from '@/component/common/Tarbar.vue'
	import {mapState} from 'vuex';
	export default {
		data() {
			return {
				
			}
		},
		components:{
			Tarbar
		},
		computed:{
			...mapState({
				loginStatus:state=>state.user.loginStatus,
				userInfo:state=>state.user.userInfo
			})
		},
		methods: {
			goConfig(){
				uni.navigateTo({
					url:'../my-config/my-config',
				})
			},
			gorder(){
				uni.navigateTo({
					url:'../my-order/my-order'
				})
			},
			goLogin(){
				uni.navigateTo({
					url:'../login/login'
				})
			}
		}
	}
</script>

<style scoped>
	.my{
		
	}
	.my-header {
		background: url('@/static/img/qwq.webp') no-repeat;
		width: 100%;
		height: 400rpx;
	}

	.header-main {
		position: relative;
		top: 120rpx;
	}

	.hearder-logo {
		position: absolute;
		left: 50%;
		margin-left: -60rpx;
		width: 120rpx;

	}

	.hearder-config {
		position: absolute;
		left: 40rpx;
	}

	.config-img {
		border-radius: 100%;
		width: 40rpx;
		height: 40rpx;
	}

	.logo-img {
		border-radius: 100%;
		border: 2rpx solid #cccccc;
		width: 120rpx;
		height: 120rpx;
	}

	.logo-name {
		color: black;
		font-weight: bold;
		text-align: center;
	}

	.order-title {
		font-size: 24rpx;
		font-weight: bold;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx;
	}

	.order-list {
		padding: 20rpx;
		display: flex;
		border-bottom: 4rpx solid #cccccc;
	}

	.order-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.order-img {
		width: 64rpx;
		height: 64rpx;
	}

	.my-content-list {

		margin-bottom: 30rpx;
	}

	.my-content-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 0;
		border-bottom: 2rpx solid #cccccc;
	}

	.my-content {
		margin: 20rpx 0;
		padding: 0 20rpx;
	}
</style>
