<template>
	<view class="commondity" :style="'flex-wrap:'+wrap+';'">
		
		<view class="commondity-item"
			v-for="(item,index) in datalist"
			:key="index"
			:style="'width:'+itemwidth+';'"
			@tap="goDetails(item.id)"
		>
			<image class="commondity-img" :src="item.imgUrl" :style="'height:'+imgh+';'"></image>
			<view class="commondity-content">
				<text class="commondity-name" :style="'font-size:'+namesize+';'">
					{{item.name}}
				</text>
				<view>
					<text class="pprice">${{item.pprice}}</text>
					<text class="oprice">${{item.oprice}}</text>
				</view>
					<text class="discount">{{item.discount}}折</text>
			</view>
		</view>
		


		
		
	</view>
</template>

<script>
	export default{
		props:{
			datalist:Array,
			hotlist:Array,
			itemwidth:{
				type:String,
				default:"375rpx"
			},
			imgh:{
				type:String,
				default:"375rpx"
			},
			wrap:{
				type:String,
				default:"wrap"
			},
			namesize:{
				type:String,
				default:"26rpx"
			}
		},
		methods:{
			goDetails(id){
				uni.navigateTo({
					url:'../../pages/details/details?id='+id+''
				})
			}
		}
		
	}
</script>

<style scoped>
	.commondity{
		display: flex;
	}
	.commondity-item{

		padding-bottom: 20rpx;
	}
	.commondity-img{
		width: 100%;

	}
	.commondity-content{
		text-align: center;
	}
	.commondity-name{
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		color: #333333;
		word-break: break-all;
		padding: 6rpx 20rpx;
	}
	.oprice{
		text-decoration: line-through;
		font-size: 24rpx;
		color: #999999;
	}
	.discount{
		border-radius: 4rpx;
		border: 1px solid #FF3333;
		padding: 2rpx 10rpx;
		font-size: 20rpx;
		color: #FF3333;
	}
</style>