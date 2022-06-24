<template>
	<view class="recommend bg-color">
		<view class="recommend-item" v-for='(item,index) in datalist' :key='index'>

			<image class="item-big" :src="item.bigUrl"></image>
			<view class="item-small">
				<block v-for="(k,i) in b" :key="i"> 
					<image class="item-img" :src="k"></image>
				</block>
			</view>

		</view>
		

	</view>

<!-- 
		<block v-for="(k,i) in item.data" :key="i">
			<image class="item-img" :src="k.imgUrl"></image>
		</block> -->


	
</template>

<script>
	import $http from '@/common/api/request.js'
	export default{
		props:{
			datalist:Array
		},
		data(){
			return{
				a:this.datalist,
				b:[]
			}
		},
		computed:{
			com(){
				 return this.datalist.trim().toLowerCase();
			},
			
		},
		created() {
			console.log('qqqq')
			this.go();
		},
		methods:{
			go(){
				for(let i=0;i<this.a.length;i++){
					this.b.push(this.a[i].imgUrl);
				}
				console.log(this.b);
			},
			// qaqq(){
			// 	uni.request({
			// 		method:'post',
			// 		header:{
			// 			"content-type":"application/json"
			// 		},
			// 		url:'http://192.168.1.9:3000/dem/api/test',
			// 		data:{
			// 			userName:12345678911,
			// 			code:1213
			// 		},
			// 		success:(res)=> {
			// 			console.log("success");
			// 		}
			// 	})
			// }
		}
	}
</script>

<style scoped>
	.recommend{
		padding: 20rpx;
	}
	.recommend-item{
		display: flex;
		flex-direction: column;
		border-radius: 20rpx;
		border: 2rpx solid #CCCC;
		overflow: hidden;
		margin: 20rpx 0;
	}
	.item-big{
		width: 100%;
		height: 300rpx;
	}
	.item-small{
		width: 100%;
		height: 240rpx;
	}
	.item-img{
		width: 33.333%;
		height: 240rpx;
	}
</style>