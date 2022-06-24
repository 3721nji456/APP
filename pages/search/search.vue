<template>
	<view class="search">
		 <Lines></Lines>
		 
		 <view class="search-item">
			 <view class="search-title">
				 <view class="f-color">最近搜索</view>
				 <view class="iconfont icon-shanchu" @tap="clearHistory"></view>
			 </view>
			 <view v-if="searchData.length>0">
				 <view class="search-name f-color"
						v-for='(item,index) in searchData'
						:key='index'
						@tap='toSearchList(item)'
				 >
				 {{item}}
				 </view>
			 </view>
			 <view class="search-end" v-else>暂无搜索记录</view>
		 </view>
		 

		 
	</view>
</template>

<script>
	import Lines from '../../component/common/Line.vue'
	export default {
		data() {
			return {
				//输入的关键词
				keyword:'',
				//搜索过的关键词
				searchData:[],
			}
		},
		//页面加载
		onLoad() {
			uni.getStorage({
				key:"searchData",
				success:(res)=> {
					console.log(res);
					this.searchData=res.data;
				}
			})
		},
		//监听input输入内容
		onNavigationBarSearchInputChanged(e) {
			this.keyword=e.text;
		},
		//监听搜索按钮
		onNavigationBarButtonTap(e) {
			this.search();
		},
		//监听input软件盘搜索按钮
		onNavigationBarSearchInputConfirmed() {
			this.search();
		},
		components:{
			Lines,
		},
		methods: {
			//判断关键词以及转跳页面
			search(){
				if(this.keyword==''){
					return uni.showToast({
						title:"关键词不能为空",
						icon:"none"
					})
				}else{
					this.toSearchList(this.keyword);
				}
				uni.hideKeyboard();
				this.addSearch();
			},
			//记录已经搜索词
			addSearch(){
				console.log(this.searchData);
				let idx=this.searchData.indexOf(this.keyword);
				if(idx<0){
						this.searchData.unshift(this.keyword);
				}else{
					this.searchData.unshift(this.searchData.splice(idx,1)[0]);
				}
				uni.setStorage({
					key:"searchData",
					data:this.searchData
				})
			},
			//清楚搜索记录
			clearHistory(){
				uni.showModal({
					title:"重要提示",
					content:"是否要清除搜索记录",
					cancelText:"取消",
					confirmText:"确定",
					success:(res)=>{
						if(res.confirm){
							uni.removeStorage({
								key:"searchData"
							})
							this.searchData=[];
						}
					}
				})
			},
			//点击搜索记录
			toSearchList(item){
				uni.navigateTo({
					url:"../searchlist/searchlist?keyword="+item+""
				})
			}
		},
	}
</script>

<style scoped>
	.search-item{
		padding: 20rpx;
	}
	.search-title{
		display: flex;
		justify-content: space-between;
	}
	.search-name{
		padding: 4rpx 24rpx;
		background-color: #E1E1E1;
		display: inline-block;
		border-radius: 26rpx;
		margin: 10rpx;
	}
	.search-end{
		text-align: center;
	}
</style>
