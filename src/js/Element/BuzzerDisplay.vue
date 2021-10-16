<template>
	<div class="buzzer-element">

		<div class="buzzer-name">
			{{buzzer.key}} - {{name}}
		</div>
		<div class="buzzer-action">
			<span class="btn-mini" @click="setStatus('wait')">wait</span>
			<span class="btn-mini" @click="setStatus('win')">win</span>
			<span class="btn-mini" @click="setStatus('lost')">lost</span>

		</div>
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
		setStatus:function(status){
			this.buzzer.setStatus(status);
		}
	}
}
</script>
