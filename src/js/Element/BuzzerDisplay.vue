<template>
	<div :class="'buzzer-element buzzer-element-'+status">
		<div class="buzzer-info">{{buzzer.batteryValue}} V</div>
		<div class="buzzer-control">
			<span class="input-btn" @click="toggleStatus">
				<i class="icon-settings"></i>
			</span>
		</div>
		<div class="buzzer-name-wrapper">
			<template v-if="!edit">
				<div class="buzzer-name">
					<div :class="'buzzer-name-text'+(!buzzer.connected?' text-error':'')">
						<span v-if="!buzzer.connected" class="input-btn btn-cancel" @click="clickReconnect">
							<i class="icon-refresh" ></i>
						</span>
						{{name}}
					</div>
					<div v-if="buzzer.connected" class="buzzer-name-btn-wrapper">
						<span class="input-btn" @click="editMode">
							<i class="icon-pencil" ></i>
						</span>
					</div>
				</div>
			</template>
			<template v-else>
				<form class="buzzer-name-input">
					<input type="text" v-model="name">
					<div class="buzzer-name-btn-wrapper">
						<button class="input-btn btn-success" @click="saveEdit">
							<i class="icon-check" ></i>
						</button>
						<span class="input-btn btn-cancel" @click="cancelEdit">
							<i class="icon-close" ></i>
						</span>
					</div>
				</form>
			</template>
			<div class="buzzer-score">
				score : {{buzzer.score}}
			</div>
		</div>
		<template v-if="displayAction">
			<div class="buzzer-action" >
				<span :class="'btn-mini'+(status == 'wait'?' disable':'')" @click="setStatus('wait')">wait</span>
				<span :class="'btn-mini'+(status == 'win'?' disable':'')" @click="setStatus('win')">win</span>
				<span :class="'btn-mini'+(status == 'lost'?' disable':'')" @click="setStatus('lost')">lost</span>
			</div>
		</template>
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
			displayAction:false,
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
		},
		toggleStatus:function(){
			this.displayAction = !this.displayAction;
		},

	}
}
</script>
