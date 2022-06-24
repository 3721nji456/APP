<template>
	<view class="shop">
		<view class="shop-item" v-for="(item,index) in datalist" :key="index">
			<view class="shop-big">
			<image class="shop-big" :src="item.bigUrl"></image>
			</view>
			
			<scroll-view scroll-x="true" class="scroll-content">
				<view class="scroll-item">
					<Commonedity :datalist="item.data"
								 wrap="no-wrap"
								 itemwidth="400rpx"
								 imgh="200rpx"
								 namesize="10rpx"
					></Commonedity>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import Commonedity from '../common/Commondity.vue'
	export default{
		props:{
			datalist:Array
		},
			components:{
				Commonedity,
			}
	}

</script>

<style scoped>
	.shop-big{
		width: 100%;
		height: 350rpx;
	}
	.scroll-content{
		width: 100%;
		white-space: nowrap;
	}
	.scroll-item{
		display: inline-block;
		width: 100%;
		height: 360rpx;
	}
</style>