<template>
	<view class="shot-card">
		<!--自定义导航-->
		<template v-if="list.length>0">
			<uniSatarBar title="购物车" :right-text='isNavBar?"完成":"编辑"' fixed="true" status-bar="true"
				@clickRight="isNavBar=!isNavBar"></uniSatarBar>

			<!--商品-->
			<view class="shop-list">
				<view class="shop-item" v-for="(item,index) in list" :key="index">
					<view class="radio" @tap='selectItem(index)'>
						<radio value="" color="#FF3333" :checked="item.checked"></radio>
					</view>
					<image class="shop-img" :src="item.imgUrl" mode=""></image>
					<view class="shop-text">
						<view class="shop-name">{{item.name}}</view>
						<view class="shop-color f-color">{{item.color}}</view>
						<view class="shop-price">
							
							<view>${{item.pprice}}</view>
							
							<template v-if="!isNavBar">
								<view>×{{item.num}}</view>
							</template>
							
							<template v-else>
								<uniNumberBox
									:value="item.num"
									min:1
									@change="changeNum($event,index,item)"
								></uniNumberBox>
							</template>
							
						</view>
					</view>
				</view>
			</view>
			<!--底部-->
			<view class="shop-foot">
				<label class="radio  foot-radio" @tap="checkedAll">
					<radio value="" color="#FF3333" :checked="checkedA"></radio>
					<text>全选</text>
				</label>
				<template v-if="!isNavBar">
					<view class="foot-total">
						<view class="foot-count">合计:<text class="f-active-color">${{totalCount.pprice}}</text></view>
						<view class="foot-num" @tap="goComfirm">结算({{totalCount.num}})</view>
					</view>
				</template>
				
				<template v-else>
					<view class="foot-total">
						<view class="foot-num" style="background-color:#000000;">移入收藏夹</view>
						<view class="foot-num" @tap="delGoodsFn">删除</view>
					</view>
				</template>
				
			</view>
		</template>
		<template v-else>
			<uniSatarBar title="购物车" status-bar='true' fixed="true"></uniSatarBar>
			<view class="shop-else-list">
				<text>囧.....购物车还是空的</text>
			</view>
		</template>
		<Tarbar currentPage='shopcar'></Tarbar>
	</view>
</template>

<script>
	import $http from '@/common/api/request.js'
	import Tarbar from '@/component/common/Tarbar.vue'
	import {
		mapState,mapActions,mapGetters,mapMutations
	} from 'vuex'
	import uniSatarBar from '@/component/uni/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue'
	import uniNumberBox from '@/component/uni/uni-number-box/components/uni-number-box/uni-number-box.vue'
	export default {
		data() {
			return {
				isNavBar: false,

			}
		},
		computed: {
			...mapState({
				list: state => state.cart.list,
				selectList:state=>state.cart.selectList
			}),
			...mapGetters(['checkedA','totalCount']),
			
		},
		components: {
			uniSatarBar,
			uniNumberBox,
			Tarbar
		},
		onShow() {
			this.getData();
		},
		methods: {
			...mapActions(['checkedAll','delGoodsFn']),
			...mapMutations(['selectItem','inigetData','initorder']),
			getData(){
				$http.request({
					url:'/getshop',
					method:'post',
					header:{
						token:true
					}
				}).then((res)=>{
					this.inigetData(res);
				})
			},
			changeNum(value,index,item){
				if(item.num==value) return;
				$http.request({
					url:'/updateshopnum',
					method:'post', 
					header:{
						token:true
					},
					data:{
						goodsid:item.goods_id,
						num:value						
					}
				}).then((res)=>{
					this.list[index].num=value;
				})

			},
			goComfirm(){
				if(this.selectList.length==0){
					return uni.showToast({
						title:'请指示选中一件商品',
						icon:'none'
					})
				}
				
				let newlist=[];
				this.list.forEach(item=>{
					this.selectList.filter(v=>{
						if(item.id==v){
							newlist.push(item);
						}
					})
				})
				
				$http.request({
					url:'/addorder',
					method:'post',
					header:{
						token:true
					},
					data:{
						arr:newlist
					}
				}).then((res)=>{
					console.log(JSON.stringify(res));
					//储存订单号
					this.initorder(res.data[0].order_id);
					console.log("qeqe"+res.data[0].order_id);
					uni.navigateTo({
						url:`../confirm-order/confirm-order?detail=${JSON.stringify(this.selectList)}`
					})
				})
				
				
			}
		}
	}
</script>

<style scoped>
	.shop-item {
		display: flex;
		padding: 20rpx;
		align-items: center;
		background-color: #F7F7F7;
		margin-bottom: 10rpx;
	}
	.shop-else-list{
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #F7F7F7;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.shop-img {
		width: 200rpx;
		height: 200rpx;
	}

	.shop-color {
		font-size: 24rpx;
	}

	.shop-price {
		display: flex;
		justify-content: space-between;
	}

	.shop-text {
		flex: 1;
		padding-left: 20rpx;
	}

	.shop-foot {
		border-top: 2rpx solid #F7F7F7;
		background-color: #FFFFFF;
		position: fixed;
		bottom: 120rpx;
		left: 0;
		width: 100%;
		height: 100rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.foot-radio {
		padding-left: 20rpx;
	}

	.foot-total {
		display: flex;
	}

	.foot-count {
		line-height: 100rpx;
		padding: 0 20rpx;
	}

	.foot-num {
		background-color: #49BDFB;
		color: #FFFFFF;
		padding: 0 60rpx;
		line-height: 100rpx;
	}
</style>
