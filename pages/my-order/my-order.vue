<template>
	<view class="my-order bg-active-color">
		<Lines></Lines>
		<view class="order-header">
			<view class="header-item" v-for="(item,index) in tableList" :key="index"
				:class='tableIndex==index?"active":""' @tap="changeTab(index)">{{item.name}}</view>

		</view>

		<block v-for="(tabItem,tabI) in tableList" :key="tabI">
			<view v-show="tabI==tableIndex">
				<view v-if="tabItem.list.length>0" class="order-main" :style="'height:'+clentHeight+'px;'">
					<!--商品-->
					<view v-for="(k,i) in tabItem.list" :key="i">
						<view class="order-goods">
							<view class="goods-status">
								<view>{{k.store}}</view>
								<view class="f-active-color">{{k.status}}</view>
							</view>
							<view class="goods-item" 									
									v-for="(item,index) in k.goods_item"
									:key="index"
									>
								<OrderList :item="item" :index="index"></OrderList>
							</view>
						</view>
						<Lines></Lines>
						<!--总价-->
						<view class="total-price">
							订单金额:<view class="f-active-color">{{k.totalPrice}}</view>(包含运费)
						</view>
						<Lines></Lines>
						<!--支付-->
						<view class="payment">
							<view class="payment-text f-active-color">支付</view>
						</view>
					</view>
				</view>

				<view v-else class="no-order" :style="'height:'+clentHeight+'px;'">
					<view>您还没有相关订单</view>
					<text class="no-order-home">去首页逛逛</text>
				</view>

			</view>
		</block>
	</view>
</template>

<script>
	import Lines from '@/component/common/Line.vue'
	import OrderList from '@/component/order/order-list.vue'
	export default {
		data() {
			return {
				clentHeight: 0,
				tableIndex: 0,
				tableList: [{
						name: "全部",
						list: [{
								store: '我的店',
								status: '待付款',
								totalPrice: '3999',
								goods_item: [
												{
												imgUrl: "../../static/img/017.jpg",
												name: "啥都按时打卡了就哦啊上的那,啥都按时打卡了就哦啊上的那",
												attrs: "黑色",
												pprice: "299",
												num: "1"
												}, 
												{
												imgUrl: "../../static/img/017.jpg",
												name: "啥都按时打卡了就哦啊上的那,啥都按时打卡了就哦啊上的那",
												attrs: "黑色",
												pprice: "299",
												num: "666"
												}, 
							]
						}, ],
					},
					{
						name: "待付款",
						list: [],
					},
					{
						name: "待发货",
						list: [],
					},
					{
						name: "待收货",
						list: [],
					},
					{
						name: "待评价",
						list: [],
					},
				],

			}
		},
		onReady() {
			uni.getSystemInfo({
				success: (res) => {
					this.clentHeight = res.windowHeight - uni.upx2px(100);
				}
			});
		},
		components: {
			Lines,
			OrderList
		},
		methods: {
			changeTab(index) {
				this.tableIndex = index;
			}

		}
	}
</script>

<style scoped>
	.order-header {
		background-color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
		border-bottom: 2rpx solid #F7F7F7;
	}

	.header-item {
		text-align: center;
		line-height: 80rpx;
		flex: 1;
	}

	.active {
		border-bottom: 4rpx solid #49BDFB;
	}

	.goods-status {
		display: flex;
		justify-content: space-between;
		padding: 20rpx 20rpx;
		background-color: #fff;
	}

	.goods-content {
		background-color: #F7F7F7;
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

	.total-price {
		display: flex;
		padding: 20rpx;
		justify-content: flex-end;
		background-color: #FFFFFF;
	}

	.payment {
		display: flex;
		padding: 20rpx;
		justify-content: flex-end;
		background-color: #FFFFFF;
	}

	.payment-text {
		border: 2rpx solid #49BDFB;
		padding: 6rpx 30rpx;
		border-radius: 30rpx;
	}

	.no-order {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #FFFFFF;
	}

	.no-order-home {
		margin-top: 40rpx;
		padding: 10rpx 60rpx;
		border: 2rpx solid #49BDFB;
		border-radius: 30rpx;
		color: #49BDFB;
	}
</style>
