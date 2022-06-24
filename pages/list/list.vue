<template>

	<view>
			<Lines></Lines>
			
		<view class="list">
			<!--左侧滑动-->
			<scroll-view scroll-y="true" class="list-left" :style="'height:'+clentHeight+'px;'"> 
				<view v-for="(item,index) in leftData" 
						:key="index"
				class="left-item" 
				@tap="changeleft(index,item.id)">
					<view class="left-name "
						:class='acativeIndex==index?"left-name-active":""'
					>{{item.name}}</view>
				</view>
			</scroll-view>
			<!--右侧滑动-->
			<scroll-view scroll-y="true" class="list-right" :style="'height:'+clentHeight+'px;'">
				<view class="right-list"
					v-for="(item,index) in rightData"
					:key="index"
				>
				<block v-for="(k,i) in item">
					<view class="list-title">{{k.name}}</view>
						<view class="right-title">
							<view class="right-content">
								<view class="right-item" v-for="(j,idx) in k.list" :key="idx">
									<image class="right-image" :src="j.imgUrl" mode=""></image>
									<view class="right-name">{{j.name}}</view>
								</view>
							</view>
							
						</view>
				</block>
				</view>
				
				
			</scroll-view>
		</view>
		<Tarbar currentPage='list'></Tarbar>
	</view>
</template>

<script>
	import Tarbar from '@/component/common/Tarbar.vue'
	import $http from '@/common/api/request.js'
	import Lines from '../../component/common/Line.vue'
	export default {//输入框点击事件
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url:'../index/index'
			})	
		},
		onReady() {
			uni.getSystemInfo({
				success:(res)=>{
					this.clentHeight=res.windowHeight;
				}
			});
		},
		components:{
			Lines,
			Tarbar
		},
		data() {
			return {
				clentHeight:0,
				acativeIndex:0,
				leftData:[],
				rightData:[],
			}
		},
		onLoad() {
			this.get();
		},
		methods: {
			//获取左侧点击
			changeleft(index,id){
				this.get(id);
				this.acativeIndex=index;
			},
			get(id){
				if(id==(this.acativeIndex+1)){
					return;
				}
				$http.request({
					url:"/goods/list",
				}).then((res)=>{
					let leftData=[];
					let rightData=[];
					res.forEach(v=>{
						leftData.push({
							id:v.id,
							name:v.name
						})
						//如果点击的id值相同
						if(v.id==(this.acativeIndex+1)){
							rightData.push(v.data)
						}
					})
					this.leftData=leftData;
					this.rightData=rightData;
				}).catch(()=>{
					uni.showToast({
						title:'请求失败',
						icon:'none'
					})
				})
			}
		},
		//监听搜索按钮
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url:'../search/search'
			})
		},
	}
</script>

<style scoped>
	.list{
		display: flex;
	}
	.list-left{
		width: 200rpx;
	}
	.left-item{
		border-bottom: 2rpx solid #FFFFFF;
		font-size: 28rpx;
		font-weight: bold;
		background-color: #F7F7F7;
	}
	.left-name{
		padding: 30rpx 6rpx;
		text-align: center;
	}
	.left-name-active{
		border-left: 8rpx solid #49BDFB;
		background-color: #FFFFFF;
	}
	.list-right{
		flex: 1;
		padding-left: 30rpx;
	}
	.list-title{
		font-weight: bold;
		padding: 30rpx 0;
	}
	.right-content{
		display: flex;
		flex-wrap: wrap;
	}
	.right-item{
		width: 150rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 10rpx;
	}
	.right-name{
		padding: 16rpx 0;
	}
	.right-image{
		width: 150rpx;
		height: 150rpx;
	}
</style>
