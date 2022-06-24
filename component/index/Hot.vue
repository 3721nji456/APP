<template>
	<view class="hot">
		<Commondity :datalist="datalist" itemwidth="250rpx" imgh="240rpx"></Commondity>
	</view>
</template>

<script>
	import Commondity from '../common/Commondity.vue'
	export default{
		props:{
			datalist:Array
		},
		components:{
			Commondity
		}
	}
</script>

<style>
</style>