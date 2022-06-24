<template>
	<view class="goods-content" >
		<image class="goods-img" :src="item.imgUrl" mode=""></image>
		<view class="goods-text">
			<view class="goods-name">{{item.name}}</view>
			<view class="goods-size f-color">颜色分类：{{item.attrs}}</view>
			<view class="f-active-color" style="font-size: 24rpx;">7天无理由</view>
		</view>
		<view>
			<view class="goods-price">￥{{item.pprice}}</view>
			<view class="goods-num f-color">*{{item.num}}</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		props:{
			item:Object,
			index:Number
		}
	}
</script>

<style scoped>
	.goods-content {
		background-color: #F7F7F7;
		padding: 10rpx 20rpx;
		justify-content: space-between;
		display: flex;
		align-items: center;
	}
	
	.goods-img {
		width: 160rpx;
		height: 160rpx;
	
	}
	
	.goods-size {
		font-size: 24rpx;
	}
	
	.goods-text {
		width: 400rpx;
		padding: 0 0rpx;
		font-size: 26rpx;
	}
	
	.goods-name {
		font-size: 26rpx;
		height: 70rpx;
		overflow: hidden;
	}
	
	.goods-price {
		font-size: 26rpx;
	}
	
	.goods-num {
		font-size: 24rpx;
	}
	
	.total-price {
		display: flex;
		padding: 20rpx;
		justify-content: flex-end;
		background-color: #FFFFFF;
	}
</style>