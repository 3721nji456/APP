<template>
	<view>
		<uniSatarBar title="确认支付" left-text='关闭' fixed="true" status-bar="true"
			@clickLeft="goBack"></uniSatarBar>
			
		<view class="pay-main">
			<radio-group>
				<label>
				<view class="pay-item">
					<image class="pay-img" src="../../static/img/q (1).png"></image>
					<view>
						<view>微信支付</view>
						<view class="pay-title">推荐微信用户使用</view>
					</view>
					<label class="radio">
						<radio value="" color="#FF3333"></radio><text></text>
					</label>
				</view>
				</label>
				
				<label>
				<view class="pay-item">
					<image class="pay-img" src="../../static/img/qw.png"></image>
					<view>
						<view>支付宝支付</view>
						<view class="pay-title">推荐支付宝用户使用</view>
					</view>
					<label class="radio">
						<radio value="" color="#FF3333"></radio><text></text>
					</label>
				</view>
				</label>
			</radio-group>
			
		</view>
		
		<!--底部-->
		<view class="pay-foot">
			<view class="total">
				<text class="f-color">合计：</text>
				<text class="total-price">${{detail.price}}</text>
			</view>
			<view class="go-pay" @tap="goPayment">去支付</view>
		</view>
	</view>
</template>

<script>
	import $http from '@/common/api/request.js'
		import uniSatarBar from '@/component/uni/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue'
		import {mapState} from 'vuex'
	export default {
		data() {
			return {
				detail:{
					price:0,
					list:[]
				}
			}
		},
		computed:{
			...mapState({
				ordernum:state=>state.order.ordernum
			})
		},
		components:{
			uniSatarBar
		},
		onLoad(e) {
			this.detail=JSON.parse(e.detail);
			console.log(this.detail);
		},
		methods: {
			//返回上一页
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			//支付成功跳转
			goPayment(){
				console.log('去支付');
				console.log('this.detail.price:'+this.detail.price);
				console.log('this.detail.list:'+this.detail.list);
				$http.request({
					url:'/payment',
					method:'post',
					header:{
						token:true
					},
					data:{
						orderid:this.ordernum,
						price:this.detail.price,
						list:this.detail.list
					}
				}).then((res)=>{
					console.log(res);
					plus.runtime.openURL(res.paymentUrl);
				})
				// uni.navigateTo({
				// 	url:'../payment-success/payment-success'
				// })
			}
		}
	}
</script>

<style scoped>
	.pay-item{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx;
		border: 2rpx solid #CCCCCC;
	}
	.pay-title{
		color: #CCCCCC;
	}
	.pay-img{
		width: 100rpx;
		height: 100rpx;
	}
	.pay-foot{
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		height: 100rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.total{
		padding-left: 40rpx;
		line-height: 100rpx;
		background-color: #000000;
		flex:1;
	}
	.go-pay{
		color: #FFFFFF;
		background-color: #49BDFB;
		line-height: 100rpx;
		width: 200rpx;
		text-align: center;
	}
	.total-price{
		color: #FFFFFF;
	}
</style>
