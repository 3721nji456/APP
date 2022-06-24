<template>
	<view>
		<view class="my-path-list">
			<view>
				<view class="path-list"
						v-for="(item,index) in list" :key="index"
						@tap="toAddpath(index)"
				>
					<view class="path-item" @tap="goOrder(item)">	
						<view class="item-name">
							<view class="i-name">{{item.name}}</view>
							<view>{{item.tel}}</view>
						</view>
						<view class="item-name">
							<view class="active" v-if="item.isDefault==1">默认</view>
							<view>{{item.province}} {{item.city}} {{item.district}} {{item.address}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="add-path">
				<view class="add-path-btn" @tap="goAddpath">新增地址</view>
			</view>
		</view>
	</view>
</template>

<script>
	import $http from '@/common/api/request.js'
	import {mapState,mapMutations} from 'vuex'
	export default {
		data() {
			return {
				isSelectPath:false
			}
		},
		computed:{
			...mapState({
				list:state=>state.path.list
			})
		},
		onLoad(e) {
			if(e.type==="selectpath"){
				this.isSelectPath=true;
				console.log("从确认订单而来");
			}
		//初始话拿到地址
			this.initAddress();
		},
		onReady() {
			
		},
		methods: {
			...mapMutations(['initAddresslist']),
			//初始化（请求收货地址）
			initAddress(){
				$http.request({
					url:'/selectaddress',
					method:'post',
					header:{
						token:true
					}
				}).then((res)=>{
					this.initAddresslist(res);
				})
			},
			goAddpath(){
				uni.navigateTo({
					url:'../my-add-path/my-add-path'
				})
			},
			//修改页面
			toAddpath(index){
				let pathObj=JSON.stringify({
					index:index,
					item:this.list[index]
				})
				console.log(pathObj);
				uni.navigateTo({
					url:"../my-add-path/my-add-path?data="+pathObj+""
				})

			},
			//返回确认订单页面
			goOrder(item){
				//从确认订单来执行
				if(this.isSelectPath){
					//页面自定义事件
					uni.$emit("selectPathItem",item);
					//返回上一页
					uni.navigateBack({
						delta:1
					})
				}
			}
		}
	}
</script>

<style scoped>
	.add-path{
		padding: 30rpx 0;
		width: 100%;
		display: flex;
		justify-content: center;
	}
	.add-path-btn{
		border: 2rpx solid #49BDFB ;
		color: #49BDFB;
		border-radius:  30rpx;
		padding: 6rpx 60rpx;
	}
	.path-list{
		padding-left: 20rpx;
	}
	.path-item{
		padding-top: 10rpx ;
		border-bottom: 2rpx solid #CCCCCC;
	}
	.item-name{
		display: flex;
		align-items: center;
	}
	.active{
		padding-left: 10rpx;
		padding-right: 10rpx;
		background-color: #49BDFB;
		color: #FFFFFF;
		border-radius: 20rpx;
		font-size: 26rpx;
		text-align: center;
		margin-right: 10rpx;
	}
	.i-name{
		padding-right: 10rpx;
	}
</style>
