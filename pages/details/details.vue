<template>
	<view class="details">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item >
				<view class="swiper-item">
					<image class="swiper-img" :src="goodscontent.imgUrl"></image>
				</view>
			</swiper-item>
		</swiper>
		<!--价格名称-->
		<view class="details-goods">
			<view class='goods-pprice'>折扣价：${{goodscontent.pprice}}</view>
			<view class='goods-oprice'>原价：${{goodscontent.oprice}}</view>
			<view class='goods-name'>{{goodscontent.name}}</view>
		</view>
		<!--商品详情图-->
		<view>
			<view><image class="details-img" src="../../static/img/qaq4.webp"></image></view>
			<view><image class="details-img" src="../../static/img/qaq4.webp"></image></view>
			<view><image class="details-img" src="../../static/img/qaq4.webp"></image></view>
			<view><image class="details-img" src="../../static/img/qaq4.webp"></image></view>
			<view><image class="details-img" src="../../static/img/qaq4.webp"></image></view>
			<view><image class="details-img" src="../../static/img/qaq4.webp"></image></view>
		</view>
		<!--商品列表-->
		<Card cardTitle="再看看"></Card>
		<CommondityList :datalist="dataList"></CommondityList>
		<!--底部-->
		<view class="details-foot">
			<view class="iconfont icon-xiaoxi"></view>
			<view class="iconfont icon-gouwuche_o" @tap="goShopCart"></view>
			<view class="addshopcard" @tap="showPop">加入购物车</view>
			<view class="purchase" @tap="showPop">立即购买</view>
		</view>
		
		<!--弹出-->
		<view v-show="isShow" @touchmove.stop.prevent='' class="pop">
			<!--蒙层-->
			<view class='pop-msk' @tap="hidePop"></view>
			<!--内容-->
			<view class='pop-box' :animation="animationData">
				<view>
					<image class="pop-img" :src="goodscontent.imgUrl"></image>
				</view>
				<view class="pop-num">
					<view>购买数量</view>
					<uniNumberBox
						:value='num'
						@change='changeNum'
					></uniNumberBox>
				</view>
				<view class="pop-sub" @tap="addCart">
					<view>确定</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import $http from '@/common/api/request.js'
	import uniNumberBox from '@/component/uni/uni-number-box/components/uni-number-box/uni-number-box.vue'
	import Card from '@/component/common/Card.vue'
	import CommondityList from '@/component/common/CommondityList.vue'
	import {mapMutations} from 'vuex'
	export default {
		data() {
			return {
				num:1,
				goodscontent:[],
				animationData:[],
				isShow:false,
				swiperList:[
					{imgUrl:'../../static/img/19.jpg'},
					{imgUrl:'../../static/img/1.jpg'},
					{imgUrl:'../../static/img/18.jpg'},
				],

				
				dataList:[
					{
					                            id:1,
					                            imgUrl:"../../static/img/018.jpg",
					                            name:"外婆家克罗米和撒东欧回来",
					                            pprice:"299",
					                            oprice:"659",
					                            discount:"5.2"
					                        },
					                        {
					                            id:2,
					                            imgUrl:"../../static/img/018.jpg",
					                            name:"外婆家克罗米和撒东欧回来",
					                            pprice:"299",
					                            oprice:"659",
					                            discount:"5.2"
					                        },
					                        {
					                            id:3,
					                            imgUrl:"../../static/img/018.jpg",
					                            name:"外婆家克罗米和撒东欧回来",
					                            pprice:"299",
					                            oprice:"659",
					                            discount:"5.2"
					                        },
					                        {
					                            id:4,
					                            imgUrl:"../../static/img/018.jpg",
					                            name:"外婆家克罗米和撒东欧回来",
					                            pprice:"299",
					                            oprice:"659",
					                            discount:"5.2"
					                        }
				]
			}
		},
		components:{
			Card,
			CommondityList,
			uniNumberBox
		},
		//修改默认返回行为
		onBackPress() {
			if(this.isShow){
				this.hidePop();
				return true;
			}
		},
		//点击分享
		onNavigationBarButtonTap(e) {
			if(e.type=="share"){
				uni.share({
					"provider":"weixin",
					"type":0,
					"scene":"WXSceneSession",
					"title":this.goodscontent.name,
					"href":"http://192.168.1.9:8080/#/pages/details/details?id="+this.goodscontent.id+"",
					"imageUrl":"http://192.168.1.9:8080/static/img/1.jpg",
					success:function(res) {
						uni.showToast({
							title:"分享成功"
						})
					}
				})
				
			}
		},
		onLoad(e) {
			this.getData(e.id);
		},
		methods: {
			...mapMutations(['addShopCart']),
			//确认加入
			addCart(){
				console.log("qwwww");
				let goods=this.goodscontent;
				let goodsid=goods.id;
				let num=this.num;
				
				$http.request({
					url:'/addcart',
					method:'post',
					header:{
						token:true
					},
					data:{
						goodsid:goodsid,
						num:num
					}
				}).then((res)=>{
					//隐藏弹出框
					this.hidePop();
					//提示
					uni.showToast({
						title:'成功加入购物车',
						icon:'none'
					})
				})
				
				// let goods=this.goodscontent;
				// this.goodscontent['checked']=false;
				// this.goodscontent['num']=this.num;
				// //加入购物车
				// this.addShopCart(goods);
				
			},
			//跳转购物车
			goShopCart(){
				uni.navigateTo({
					url:'../shopcar/shopcar'
				})
			},
			//改变数量
			changeNum(value){
				this.num=value;
			},
			getData(id){
				$http.request({
					url:"/goods/id",
					data:{
						id:id,
					}
				}).then((res)=>{
					this.goodscontent=res[0];
				}).catch(()=>{
					uni.showToast({
						title:'请求失败',
						icon:'none'
					})
				})
			},
			showPop(){
				
				var animation=uni.createAnimation({
					duration:200,
				})
				animation.translateY(600).step();
				this.animationData=animation.export();
				this.isShow=true;
				setTimeout(()=>{
					animation.translateY(0).step();
					this.animationData=animation.export(); 
				},200)
			},
			hidePop(){
				var animation=uni.createAnimation({
					duration:200,
				})
				animation.translateY(600).step();
				this.animationData=animation.export();
				this.isShow=true;
				setTimeout(()=>{
					animation.translateY(0).step();
					this.isShow=false;
				},200)

			}
		}
	}
</script>

<style scoped>
	.details{

		padding-bottom: 90rpx;
	}
	swiper{
		width: 100%;
		height: 400rpx;
	}
	.swiper-img{
		width: 100%;
		height: 400rpx;
	}
	.details-goods{
		text-align: center;
		font-weight: bold;
		font-size: 36rpx;
		padding: 10rpx 0;
	}
	.details-img{
		width: 100%;
	}
	.details-foot{
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 90rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #ffffff;
	}
	.details-foot .iconfont{
		width: 60rpx;
		height: 60rpx;
		border-radius: 100%;
		background-color: #000000;
		color: #ffffff;
		text-align: center;
		padding:20rpx 10rpx 0rpx 10rpx;
	}
	.addshopcard{
		margin: 0 30rpx;
		padding: 6rpx 30rpx;
		background-color: #000000;
		color: #ffffff;
		border-radius: 40rpx;
	}
	.purchase{
		margin: 0 30rpx; 
		padding: 6rpx 30rpx;
		background-color: #49BDFB;
		color: #ffffff;
		border-radius: 40rpx;
	}
	.pop{
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 999;
	}
	.pop-msk{
		position: absolute;
		left:0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.3);
	}
	.pop-box{
		position: absolute;
		left:0;
		bottom: 0;
		width: 100%;

		background-color: #ffffff;
	}
	.pop-img{
		width: 260rpx;
		height: 260rpx;
	}
	.pop-sub{
		line-height: 80rpx;
		background-color: #49BDFB;
		color: #ffffff;
		text-align: center;
	}
	.pop-num{
		padding: 20rpx;
		display: flex;
		justify-content: space-between;
	}
</style>
