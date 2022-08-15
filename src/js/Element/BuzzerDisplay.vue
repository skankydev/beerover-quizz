<template>
	<div :class="'buzzer-element buzzer-element-'+status">
		<div class="buzzer-name-wrapper">
			<span v-if="!buzzer.connected" class="input-btn btn-cancel" @click="clickReconnect">
				<i class="icon-refresh" ></i>
			</span>
			<editable v-model="name"></editable>

			<!-- <template v-if="!edit">
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
			</template>-->
			<div class="buzzer-score">
				score : <editable v-model="buzzer.score"></editable>
			</div>
		</div>
		<div class="buzzer-control">
			<!-- <span class="input-btn" @click="toggleStatus">
				<i class="icon-settings"></i>
			</span> -->
		</div>
		<template v-if="displayAction">
			<!-- <div class="buzzer-action" >
				<span :class="'btn-mini'+(status == 'wait'?' disable':'')" @click="setStatus('wait')">wait</span>
				<span :class="'btn-mini'+(status == 'choice'?' disable':'')" @click="setStatus('choice')">choice</span>
				<span :class="'btn-mini'+(status == 'win'?' disable':'')" @click="setStatus('win')">win</span>
				<span :class="'btn-mini'+(status == 'lost'?' disable':'')" @click="setStatus('lost')">lost</span>
			</div> -->
			<div class="sound-select">
				<select name="sound" id="" v-model="sound" @change="setSound">
					<option value="alert">Alert</option>
					<option value="bonus">Bonus</option>
					<option value="positive">Positive</option>
					<option value="retro">Retro</option>
				</select>
			</div>
		</template>
	</div>
</template>

<script>
import Editable from "../Vrac/Editable.vue";

export default {
	components: { Editable },
	props:['buzzer'],
	mounted:function(){
		this.name = this.buzzer.name;
		this.buzzer.setSound(this.sound)
	},
	watch:{
		buzzer: {
			handler(val) {
				this.status = val.status;
			},
			deep: true,
		},
		name:function (){
			this.buzzer.name = this.name,
			this.$forceUpdate();
		}
	},
	data:function() {
		return {
			name:'',
			status:'',
			edit:false,
			displayAction:false,
			sound:'alert',
		}
	},
	methods:{
		setStatus:function(status){
			this.buzzer.setStatus(status);
		},
		
		clickReconnect:function(event){
			this.buzzer.reconnectDevice()
		},
		toggleStatus:function(){
			this.displayAction = !this.displayAction;
		},
		setSound:function(event){
			this.buzzer.setSound(this.sound)
		}

	}
}
</script>
