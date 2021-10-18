<template>
	<div class="buzzer-element">
		<div class="buzzer-name-wrapper">
			<template v-if="!edit">
				<div class="buzzer-name">
					<div :class="'buzzer-name-text'+(!buzzer.connected?' text-error':'')">

						<span v-if="!buzzer.connected" class="input-btn btn-cancel" @click="clickReconnect">
							<i class="icon-refresh" ></i>
						</span>
						{{buzzer.key}} - {{name}} - {{buzzer.batteryValue}}
					</div>
					<div v-if="buzzer.connected" class="buzzer-name-btn-wrapper">
						<span class="input-btn" @click="editMode">
							<i class="icon-pencil" ></i>
						</span>
					</div>
				</div>
			</template>
			<template v-else>
				<div class="buzzer-name-input">
					<input type="text" v-model="name">
					<div class="buzzer-name-btn-wrapper">
						<span class="input-btn btn-success" @click="saveEdit">
							<i class="icon-check" ></i>
						</span>
						<span class="input-btn btn-cancel" @click="cancelEdit">
							<i class="icon-close" ></i>
						</span>
					</div>
				</div>
			</template>
		</div>
		<div class="buzzer-action" >
			<span :class="'btn-mini'+(status == 'wait'?' disable':'')" @click="setStatus('wait')">wait</span>
			<span :class="'btn-mini'+(status == 'win'?' disable':'')" @click="setStatus('win')">win</span>
			<span :class="'btn-mini'+(status == 'lost'?' disable':'')" @click="setStatus('lost')">lost</span>
		</div>
	</div>
</template>

<script>

export default {
	props:['buzzer'],
	mounted:function(){
		this.name = this.buzzer.name;
	},
	watch:{
		buzzer: {
			handler(val) {
				this.status = val.status;
			},
			deep: true,
		},
	},
	data:function() {
		return {
			name:'',
			status:'',
			edit:false,
		}
	},
	methods:{
		setStatus:function(status){
			this.buzzer.setStatus(status);
		},
		editMode:function(){
			this.edit = true;
		},
		saveEdit:function(){
			this.edit = false;
			this.buzzer.name = this.name;
		},
		cancelEdit:function(){
			this.edit = false;
			this.name = this.buzzer.name;
		},
		clickReconnect:function(event){
			this.buzzer.reconnectDevice()
		}

	}
}
</script>
