<template>
	<view>

		<ShopList :keyword="keyword"></ShopList>
	</view>
</template>

<script>
	import ShopList from '../../component/common/ShopList.vue'
	export default {
		data() {
			return {
				keyword:""
			}
		},
		onLoad(e) {
			this.keyword=e.keyword;
			//#ifdef APP-PLUS
			var webView = this.$mp.page.$getAppWebview();  
				// var webView = this.$mp.page[0].$getAppWebview();  
				webView.setTitleNViewSearchInputFocus(e.keyword);
				
			//#endif

		},
		components:{
			ShopList,
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
