<template>
	<div class="Main">
		<header class="main-header">
			<img src="img/logo.png" alt="" class="main-logo">
		</header>
		<section class="main-content">
			<section class="buzzer-list-wrapper">
				<header class="buzzer-list-header">
					<button type="button" class="add-buzzer" @click="addBuzzer">Add Buzzer</button>
				</header>
				<div class="buzzer-list">
				<template v-for="(buzzer,key) in buzzerList.list">
					<buzzer-display
						:buzzer="buzzer"
					></buzzer-display>
				</template>
				</div>
			</section>
			<section class="buzzer-message">
				<button type="button" class="add-buzzer" @click="resetBuzzer">Reset</button>
				<template v-for="(elem,key) in log">
					<div> {{elem.uid}} - {{elem.message}} </div>
				</template>
			</section>
		</section>
	</div>
</template>

<script>

import BuzzerDisplay from "./BuzzerDisplay.vue";
import BuzzerList from '../Class/BuzzerList.js';

export default {
	components: { BuzzerDisplay },
	mounted:function(){
		document.addEventListener('BuzzerPush',this.buzzerPushed.bind(this));
	},
	data:function() {
		return {
			msg: 'Hello Beerover !',
			count:0,
			log:[],
			buzzerList:BuzzerList,
		}
	},
	methods:{
		addBuzzer:function(){
			this.buzzerList.findNewBuzzer()
		},
		buzzerPushed:function(event){
			let test = this.log.findIndex( (e) =>{
				return e.uid == event.uid;
			});
			console.log(test);
			if(test == -1){
				this.buzzerList.setStatusById(event.detail.uid,'win')
				this.log.push(event.detail);
				if(this.log.length > 50){
					this.log.shift();
				}
			}

		},
		resetBuzzer:function(event){
			this.log = [];
			this.buzzerList.resetAll();
		}

	}
}
</script>
