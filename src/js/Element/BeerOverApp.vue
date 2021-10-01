<template>
	<div class="example">
		{{ msg }}
		<span class="count" @click="addOne">{{count}}</span></div>
</template>

<script>
export default {
	data () {
		return {
			msg: 'Hello world!',
			count:0,
		}
	},
	methods:{
		addOne:function(){
			this.count+=1
		}
	}
}
</script>
