<template>
	<view class="shop-list">

		<view class="shop-title f-color" >
			<view class="shop-item" 
			v-for="(item,index) in shopList.data"
				:key="index"
				@tap="changeTap(index)"
				>
				<view :class="shopList.currentIndex==index?'f-active-color':''">{{item.name}}</view>
				<view class="shop-icon">
					<view class="iconfont icon-shangjiantou up"
						:class='item.status==1?"f-active-color":""'
					></view>
					<view class="iconfont icon-xiajiantou down"
						:class='item.status==2?"f-active-color":""'
					></view>
				</view>
			</view>
			

			
		</view>
		
		
		
		<Lines></Lines>
		
		<CommondityList :datalist=dataList></CommondityList>
		
	</view>
</template>

<script>
	import $http from '@/common/api/request.js'
	import Lines from '@/component/common/Line.vue'
	import CommondityList from './CommondityList.vue'
	export default{
		props:{
			keyword:String,
		},
		data(){
			return{
				shopList:{
					currentIndex:0,
					data:[
						{name:"价格",status:1,key:"pprice"},
						{name:"折扣",status:0,key:"discount"},
						{name:"品牌",status:0},
					]
				},
				dataList:[],
			}
		},
		computed:{
			orderBy(){
				//拿到当前对象
				let obj=this.shopList.data[this.shopList.currentIndex];
				let val=obj.status=="1"?"desc":"asc";
				return{
					[obj.key]:val
				}
				
			}
		},
		components:{
			Lines,
			CommondityList,
		},
		mounted(){
			this.getData();
		},
		methods:{

			getData(){
				$http.request({
					url:"/goods/search",
					data:{
						name:this.keyword,
						...this.orderBy
					}
				}).then((res)=>{
					this.dataList=res;
				}).catch((res)=>{
					uni.showToast({
						title:"请求失败",
						icon:"none"
					})
				});
				let obj=this.shopList.data[this.shopList.currentIndex];
				console.log(obj.status);
			},
			changeTap(index){
				//点击重新获取
				this.getData();
				//索引值
				let idx=this.shopList.currentIndex;
				//具体值
				let item=this.shopList.data[idx];

				if(idx==index){
					return item.status=item.status===1 ? 2:1;
					
				}

				let newItem = this.shopList.data[index];
				item.status=0;
				this.shopList.currentIndex=index;
				newItem.status=1;

			}
		},
	}
</script>

<style scoped>

	.shop-title{
		display: flex;
		justify-content: center;
	}
	.shop-item{
		flex:1;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 80rpx; 
		
	}
 	.shop-icon{
		position: relative;
		margin-left: 10rpx;
	}
	.iconfont{
		width: 6rpx;
		height: 8rpx;
		position: absolute;
		left: 0;
	}
	.up{
		top:-24rpx;
	}
	.down{
		top:-0rpx;
	}
</style>