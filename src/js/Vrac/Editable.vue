<template>
	<div>
		<template v-if="!edit">
			<div class="buzzer-name">
				<div class="buzzer-name-text">
					{{name}}
				</div>
				<div class="buzzer-name-btn-wrapper">
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
					<button class="input-btn btn-success" @click="saveEdit">
						<i class="icon-check" ></i>
					</button>
					<span class="input-btn btn-cancel" @click="cancelEdit">
						<i class="icon-close" ></i>
					</span>
				</div>
			</div>
		</template>
	</div>
</template>

<script>

export default {

	props:['value'],
	mounted:function(){
		console.log(this.value);
		this.name = this.value;
	},
	watch: {
		value:function (){
			this.name = this.value,
			this.$forceUpdate();
		}
	},
	data:function() {
		return {
			name:'',
			edit:false,
		}
	},
	methods:{
		editMode:function(){
			this.edit = true;
		},
		saveEdit:function(){
			this.edit = false;
			this.$emit('input', this.name);
		},
		cancelEdit:function(){
			this.edit = false;
			this.name = this.value;
		},
	}
}
</script>
