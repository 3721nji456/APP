<template>
	<view class="commondity-list">
		<Commondity :datalist="datalist"></Commondity>
	</view>
</template>

<script>
	import Commondity from './Commondity.vue'
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