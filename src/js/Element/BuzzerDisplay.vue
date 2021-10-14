<template>
	<div class="buzzer-element">
		<div class="buzzer-name">{{buzzer.key}} - {{name}}</div>
	</div>
</template>

<script>

export default {
	props:['buzzer'],
	mounted:function(){
		this.name = this.buzzer.name
	},
	data:function() {
		return {
			name:"",
		}
	},
	methods:{

	}
}
</script>
