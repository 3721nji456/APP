<template>
	

	
	
	<view class="index">
		
		<scroll-view scroll-x="true" class="scroll-content" :scroll-into-view="scrollIntoIndex">
			<view class="scroll-item"
				:id="'top'+index"
				v-for="(item,index) in topBar"
				:key="index"
				@tap='changeindex(index)'
			>
				<text :class='topBarIndex==index? "f-active-color":"f-color" '>{{item.name}}</text>
			</view>
		</scroll-view>
		
		<swiper class="demo" @change="onchangeTab" :current="topBarIndex" :style="'height:'+clentHeight+'px;'">
			<swiper-item
				v-for="(item,index) in newtopBar"
				:key="index"
			>
				<scroll-view scroll-y="true" :style="'height:'+clentHeight+'px;'" @scrolltolower="loadmore(index)">
					<block v-if="item.data.length>0">
					<block v-for="(k,i) in item.data" :key="i">
						<!--推荐-->
						<IndexSwiper v-if='k.type=="swiperList"' :datalist='k.data'></IndexSwiper>
						<template v-if='k.type=="recommondList"'>
							<Recommend  :datalist='k.data'></Recommend>
							<Card cardTitle='woc'></Card>
						</template>
						<!--好货-->
						<Banner v-if="k.type=='bannerList'" :datalist="k.imgUrl"></Banner>
						<template v-if="k.type=='iconList'">
								<Icon :datalist='k.data'></Icon>
								<Card cardTitle='hot'></Card> 
						</template>
						<template v-if="k.type=='hotList'">
								<Hot :datalist='k.data'></Hot>
								<Card cardTitle='shop'></Card> 
						</template>
						<template v-if="k.type=='shopList'">
								<Shop :datalist='k.data'></Shop>
								<Card cardTitle='com'></Card> 
						</template>
						
						<CommondityList v-if='k.type=="commodityList"' :datalist='k.data'></CommondityList>
						
						
						
						
					</block>
					</block>
					<view v-else>
						暂无数据.....
					</view>
					<view class="load-text f-color">
						{{item.loadtext}}
					</view>
				</scroll-view>
				
			</swiper-item>
		</swiper>
		
	<Tarbar currentPage='index'></Tarbar>
<!-- 		<IndexSwiper></IndexSwiper>
		<Recommend></Recommend>
		<Card cardTitle='woc'></Card>
		<CommondityList></CommondityList>
		
		<Banner></Banner>
		<Icon></Icon>
				<Card cardTitle='hot'></Card> 
		<Hot></Hot>
		<Shop></Shop> -->
	</view>
</template>

<script>
	import Tarbar from '@/component/common/Tarbar.vue'
	import $http from '../../common/api/request.js'
	import IndexSwiper from '../../component/index/indexSwiper.vue'
	import Recommend from '../../component/index/Recommend.vue'
	import Card from '../../component/common/Card.vue'
	import CommondityList from '../../component/common/CommondityList.vue'
	import Banner from '../../component/index/Banner.vue'
	import Icon from "../../component/index/Icon.vue"
	import Hot from "../../component/index/Hot.vue"
	import Shop from "../../component/index/Shop.vue"
	export default {
		data() {
			return {
				topBarIndex:0,
				scrollIntoIndex:'top0',
				clentHeight:0,
				topBar:[],
				newtopBar:[],
			}
		},
		onLoad() {
			this.init();

		},
		onReady(){
			// let view=uni.createSelectorQuery().select(".home-data");
			// view.boundingClientRect(data=>{
			// 	this.clentHeight=2000;
			// 	//this.clentHeight=data.height;
			// 	console.log(this.clentHeight);
			// }).exec();

			uni.getSystemInfo({
				success:(res)=>{
					this.clentHeight=res.windowHeight-uni.upx2px(80);
				}
			});

		},
		//标题按钮点击
		onNavigationBarButtonTap(e) {
			if(e.float=='left'){
				uni.navigateTo({
					url:'../search/search'
				})
			}
		},
		components:{
			IndexSwiper,
			Recommend,
			Card,
			CommondityList,
			Banner,
			Icon,
			Hot,
			Shop,
			Tarbar
		},
		methods: {
			init(){
				$http.request({
					url:"/index/data",
				}).then((res)=>{
					this.topBar=res.topBar;
					this.newtopBar=this.initData(res);
				}).catch(()=>{
					uni.showToast({
						title:'请求失败',
						icon:'none'
					})
				})
				
				// uni.request({
				// 	url:"http://192.168.1.9:3000/dem/api/index/data",
				// 	success:(res)=>{
				// 		let data=res.data.data;
				// 		this.topBar=data.topBar;
				// 		this.newtopBar=this.initData(data);
				// 	}
				// })
			},
			initData(res){
				let arr=[];
				for(let i=0;i<this.topBar.length;i++){
					let obj={
						data:[],
						load:"first",
						loadtext:"上拉加载更多....",
					}
					if(i==0){
						obj.data=res.data;
					}
					arr.push(obj);
				}
				return arr;
			},
			//点击顶栏
			changeindex(index){
				if(this.topBarIndex==index){
					return;
				}
				this.topBarIndex=index;
				this.scrollIntoIndex='top'+index;
				if(this.newtopBar[this.topBarIndex].load==="first"){
					this.addData();
				}
				

			},
			//对应滑动
			onchangeTab(e){
				this.changeindex(e.detail.current)
			},
			//获取可视高度
			getClientHeight(){
				const res=uni.getSystemInfoSync();
				const system=res.platform;
				if(system==='ios'){
					return 44+res.statusBarHeight;
				}else if(system==='android'){
					return 48+res.statusBarHeight; 
				}else{
					return 0; 
				}
			},
			//对应数据加载
			addData(callback){
				//获取索引
				let index=this.topBarIndex;
				//获取id
				let id=this.topBar[index].id;
				
				let page=Math.ceil(this.newtopBar[index].data.length/5)+1;
				
				$http.request({
					url:"/index/"+id+"/data/"+page+"",
				}).then((res)=>{
					this.newtopBar[index].data=[...this.newtopBar[index].data,...res];
				}).catch(()=>{
					uni.showToast({
						title:'请求失败',
						icon:'none'
					})
				})
				
				// uni.request({
				// 	url:"http://192.168.1.9:3000/dem/api/index/"+id+"/data/"+page+"",
				// 	success: (res) => {
				// 		if(res.statusCode!=200){
				// 			return;
				// 		}else{
				// 			let data=res.data.data;

				// 			this.newtopBar[index].data=[...this.newtopBar[index].data,...data];
				// 		}

				// 	}
				// });
				
				// console.log(JSON.stringify(this.newtopBar[index]));
				// console.log(this.newtopBar[index].data);
				// console.log(JSON.stringify(this.newtopBar[index].data));
				
				this.newtopBar[index].load="last";
				if(typeof callback==="function"){
					callback();
				}
			},
			//上拉加载更多
			loadmore(index){
				this.newtopBar[index].loadtext="加载中...";
				this.addData(()=>{
					this.newtopBar[index].loadtext="上拉加载更多...";
				})
			},

		}
	}
</script>

<style scoped>
/* 	.wx-nav{
		text-align: center;
		height: 200rpx;
		width: 100%;
		line-height: 200rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	} */
/* 	.demo{
		background:#FF3333;
	} */
	.scroll-content{
		width: 100%;
		height: 80rpx;
		white-space: nowrap;
	}
	.scroll-item{
		display: inline-block;
		padding: 10rpx 30rpx;
		font-size: 32rpx;
	}
	.f-active-color{
		padding: 10rpx 0;
		border-bottom: 6rpx solid #49BDFB;
	}
	.load-text{
		border-top: 2rpx solid #636263;
		line-height: 60rpx;
		text-align: center;
	}
</style>
