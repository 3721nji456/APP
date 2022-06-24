<template>
	<view class="confirm-order bg-active-color">
		<Lines></Lines>
		<!--地址-->
		<view class="order-map" @tap="goPathList">
			<template v-if="path">
				<view class="order-img">
					<image class="map-img" src="../../static/img/city.webp"></image>
				</view>
				<view class="order-content">
					<view class="map-title">
						<view class="map-name">收件人：{{path.name}}</view>
						<view>{{path.tel}}</view>
					</view>
					<view class="map-city">
						收货地址: {{path.city}} {{path.details}}
					</view>
				</view>
				<view>></view>
			</template>
			<template v-else>
				<view class="map-title">
					<view class="map-name">请选择地址</view>
				</view>
			</template>
		</view>
		<!--商品-->
		<view class="goods-list">
			<view class="goods-content"
				v-for="(item,index) in goodslist"
				:key="index"
			>
				<image class="goods-img" src='item.img' mode=""></image>
				<view class="goods-text">
					<view class="goods-name">{{item.name}}</view>		
					<view class="goods-size f-color">颜色分类：黑色</view>
					<view class="f-active-color" style="font-size: 24rpx;">7天无理由</view>
				</view>
				<view>
					<view class="goods-price">￥{{item.pprice}}</view>
					<view class="goods-num f-color">*{{item.num}}</view>
				</view>
			</view>

			
		</view>
		<!--底部 提交订单-->
		<view class="order-foot">
			<view>合计：</view>
			<view class="prices f-active-color">${{totalCount.pprice}} </view>
			<view class="confirm" @tap="goPayment">提交订单</view>
		</view>
	</view>
</template>

<script>
	import $http from '@/common/api/request.js'
	import Lines from '@/component/common/Line.vue'
	import {
		mapGetters,mapState,mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				path: false,
			}
		},
		computed: {
			...mapState({
				list: state => state.cart.list,
				ordernum: state=> state.order.ordernum,
				selectlist: state=>state.cart.selectList
			}),
			...mapGetters(['defaultPath','totalCount']),

			//根据商品列表找到对应e.detail数据的id，返回数据
			goodslist(){
				return this.item.map(id=>{
					return this.list.find(v=>v.id==id)
				})
			}
		},
		onLoad(e) {
			
			
			//选中商品id
			this.item=JSON.parse(e.detail);
			console.log(this.item);
			//有默认地址赋值
			
			$http.request({
				url:'/selectaddress',
				method:'post',
				header:{
					token:true
				}
			}).then((res)=>{
				this.initAddresslist(res);
				console.log(this.defaultPath+"qwq");
				if (this.defaultPath.length) {
					this.path = this.defaultPath[0];
				}
			})
			
			

			//出发自定义事件
			uni.$on("selectPathItem",(res)=>{
				this.path=res;
			})
		},
		onUnload() {
			uni.$off("selectPathItem",()=>{
				console.log("yic");
			})
		},
		components: {
			Lines
		},
		methods: {
			...mapMutations(['initAddresslist']),
			goPathList(){
				uni.navigateTo({
					url:'../my-path-list/my-path-list?type=selectpath'
				})
			},
			goPayment(){
				
				
				
				if(!this.path){
					return uni.showToast({
						title:'请选择地址',
						icon:'none'
					})
				}
				
				

				$http.request({
					url:'/submit',
					method:'post',
					header:{
						token:true
					},
					data:{
						orderid:this.ordernum,
						shoparr:this.selectlist
					}
				}).then((res)=>{
					if(res.success){
						let newName=[];
						this.goodslist.forEach(v=>{
							newName.push(v.name);
						})
						uni.navigateTo({
							url:'../payment/payment?detail='+JSON.stringify({
								price:this.totalCount.pprice,
								list:newName
							})
						})
					}
				})
				
				
			}
		}
	}
</script>

<style scoped>
	
	.confirm-order {
		position: absolute;
		left: 0%;
		right: 0%;
		top: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
	}

	.order-map {
		display: flex;
		padding: 0 30rpx;
		background-color: #FFFFFF;
		line-height: 60rpx;
		align-items: center;
		border-bottom: 6rpx solid #F7F7F7;
	}

	.map-title {
		width: 550rpx;
		display: flex;
		justify-content: space-between;
	}

	.map-name {
		font-weight: bold;
	}

	.map-city {
		font-size: 26rpx;
	}

	.order-img {
		align-items: center;
		text-align: center;
	}

	.map-img {
		width: 40rpx;
		height: 40rpx;
	}

	.order-content {
		padding: 0 40rpx;
	}

	.goods-list {
		background-color: #FFFFFF;
		padding-top: 20rpx;
	}

	.goods-content {
		background-color: #F7F7F7;
		margin-top: 20rpx;
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

	.order-foot {
		height: 100rpx;
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: #FFFFFF;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.prices {
		margin-right: 14rpx;
	}

	.confirm {

		color: #FFFFFF;
		background-color: #49BDFB;
		padding: 30rpx 32rpx;
	}
</style>
