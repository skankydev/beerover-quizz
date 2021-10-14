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
				<template v-for="(elem,key) in log">
					<div> {{elem.id}} - {{elem.message}} </div>
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
		/*setBuzzerList(buzzerList){
			this.buzzerList = buzzerList;
		},*/
		addBuzzer:function(){
			this.buzzerList.findNewBuzzer()
		},
		buzzerPushed:function(event){
			console.log(event.detail)
			this.log.push(event.detail);
			if(this.log.length > 50){
				this.log.shift();
			}
		}
	}
}
</script>
