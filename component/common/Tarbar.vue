<template>
	<view class="tarbar">
		<view class="tab" 
		v-for="(item,index) in TarbarList" 
		:key="index"
		@tap="navto(item.pagePath)"
		>
			<image v-if="item.pagePath==currentPage" :src="item.selectedIconPath" mode=""></image>
			<image v-else :src="item.iconPath" mode=""></image>
			<view class="text">{{item.text}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			currentPage:{
				type:String,
				default:'index'
			}
			
		},
		data() {
			return {
				TarbarList:[
					{
						"pagePath": "index",
						"iconPath": "/static/tar/index.png",
						"selectedIconPath": "/static/tar/indexselect.png",
						"text": "主页"
					},
					{
						"pagePath": "list",
						"iconPath": "/static/tar/list.png",
						"selectedIconPath": "/static/tar/listselect.png",
						"text": "分类"
					},
					{
						"pagePath": "shopcar",
						"iconPath": "/static/tar/shop.png",
						"selectedIconPath": "/static/tar/shopselect.png",
						"text": "购物车"
					},
					{
						"pagePath": "my",
						"iconPath": "/static/tar/my.png",
						"selectedIconPath": "/static/tar/myselect.png",
						"text": "我的"
					}
				]
			}
		},
		methods:{
			navto(path){
				if(path=='shopcar'||path=='my'){
					this.navigateTo({
						url:`../../pages/${path}/${path}`
					})
				}else{
					uni.redirectTo({
						url:`../../pages/${path}/${path}`
					})
				}
			}
		}
	}
</script>

<style scpoed>
	.tarbar{
		border: 2rpx solid #636263;
		background-color: #FFFFFF;
		z-index: 9999;
		position: fixed;
		left: 0;
		bottom: 0;

		width: 100%;
		height: 120rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.tab{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	image{
		width: 54rpx;
		height: 54rpx;
	}
	.text{
		padding-top: 10rpx;
		font-size: 24rpx;
	}
	
</style>
