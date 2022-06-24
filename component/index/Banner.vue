<template>
	<view class="banner">
		<image class="banner-img" :src="datalist"></image>
	</view>
</template>

<script>
	export default{
		props:{
			datalist:String
		}
	}
</script>

<style scoped>
	.banner{
		width: 100%;
		height: 400rpx;
	}
	.banner-img{
		width: 100%;
		height: 400rpx;
	}
</style>