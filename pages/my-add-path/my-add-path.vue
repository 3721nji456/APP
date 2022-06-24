<template>
	<view class="my-add-path ">
		<view class="path-item">
			<view>收件人</view>
			<input type="text" value="" placeholder="收件人姓名" v-model="pathobj.name"/>
		</view>
		
		<view class="path-item">
			<view>手机号</view>
			<input type="text" value="" placeholder="11位手机号" v-model="pathobj.tel"/>
		</view>
		
		<view class="path-item">
			<view>收货地址</view>
			<text @tap='showCityPicker'>{{pathCity}}</text>
			<mpvue-city-picker ref="mpvueCityPicker" :pickerValueDefault="pickerValueDefault" @onConfirm="onConfirm"></mpvue-city-picker>
			
		</view>
		
		<view class="path-item">
			<view>详细地址</view>
			<input type="text" value="" placeholder="5到60个字符" v-model="pathobj.address"/>
		</view>

		<view class="path-item">
			<view>设为默认地址</view>
			<radio-group name="" @tap="radioChange">

				<radio  color="#FF3333" :checked="pathobj.isDefault==1?true:false"></radio>
			</radio-group>
			
		</view>
		
	</view>
</template>

<script>
	import $http from '@/common/api/request.js'
	import {mapActions} from 'vuex'
	import mpvueCityPicker from '@/component/uni/mpvue-citypicker/mpvueCityPicker.vue'
	
	export default {
		data() {
			return {
				
				pickerValueDefault:[0,0,1],
				pathobj:{
					name:"",//收货人姓名
					tel:"",//电话
					province:"",//省
					city:"请选择 >",//市
					district:"",//区
					address:"",//收货人详细地址
					isDefault:false//是否为默认地址
				},
				i:-1,
				isStatus:false
			}
		},
		onLoad(e) {
			if(e.data){
				uni.setNavigationBarTitle({
					title:'修改地址'
				})
				let result=JSON.parse(e.data);
				this.pathobj=result.item;
				this.i=result.index;
				this.isStatus=true;
				console.log(e.data);

			}
		},
		components:{
			mpvueCityPicker
		},
		//页面按钮生命周期
		onNavigationBarButtonTap() {
			
			if(this.isStatus){
				$http.request({
					url:'/updateaddress',
					method:'post',
					header:{
						token:true
					},
					data:{
						...this.pathobj 
					}
				}).then((res)=>{
					//修改
					this.pathobj.isDefault=this.pathobj.isDefault==true?1:0;
					this.updatePassFn({
						index:this.i,
						item:this.pathobj,
					})
					uni.showToast({
						title:'修改成功',
						icon:'none' 
					})
					uni.navigateTo({
						url:'../my-path-list/my-path-list'
					})

				});
				
			}else{
					this.pathobj.isDefault=this.pathobj.isDefault==true?1:0;
					$http.request({
						url:'/addaddress',
						method:'post',
						header:{
							token:true
						},
						data:{
							...this.pathobj 
						}
					}).then((res)=>{
						//新增
						this.createPassFn(this.pathobj);
						uni.navigateTo({
						url:'../my-path-list/my-path-list'
						})
					});
				
				
			}
			
			
		},
		computed:{
			pathCity(){
				if(this.pathobj.province){
					return `${this.pathobj.province}-${this.pathobj.city}-${this.pathobj.district}`;
				}else{
					return '请选择 >';
				}
			}
		},
		methods:{
			...mapActions(['createPassFn','updatePassFn']),
			showCityPicker(){
				this.$refs.mpvueCityPicker.show()	
			},
			onConfirm(e) {
				let arr=e.label.split("-");
				this.pathobj.province=arr[0];
				this.pathobj.city=arr[1];
				this.pathobj.district=arr[2];
				// this.pathobj.city=e.label;
			},
			radioChange(){
				this.pathobj.isDefault=this.pathobj.isDefault==1?true:false;
				this.pathobj.isDefault=!this.pathobj.isDefault; 
				console.log(this.pathobj.isDefault);
			},
		}
	}
</script>

<style scoped>
	.my-add-path{
		padding-left: 20rpx ;
	}
	.path-item{
		display:  flex;
		justify-content: space-between;
		align-items: center;
		padding: 16rpx 0;
		width: 100%;
		border-bottom: 2rpx solid #CCCCCC;
	}
	.path-item input{
		flex:1;
		text-align: left;
		padding-left: 10rpx;
	}
	
</style>
