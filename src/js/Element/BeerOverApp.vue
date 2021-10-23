<template>
	<div id="Main">
		<header class="main-header">
			<img src="img/logo.png" alt="" class="main-logo">
		</header>
		<section class="buzzer-list-wrapper">
			<header class="buzzer-list-header">
				<button type="button" @click="addBuzzer">Add Buzzer</button>
			</header>
			<div class="buzzer-list">
			<template v-for="(buzzer,key) in buzzerList.list">
				<buzzer-display
					:buzzer="buzzer"
				></buzzer-display>
			</template>
			</div>
		</section>
		<section class="result-container">
			<header class="result-header">
				<button type="button" @click="resetBuzzer">Reset</button>
			</header>
			<div class="result-list">
				<template v-for="(elem,key) in log">
					<div :class="'result-element '+( getResultClass(key) ) ">
						<h1>{{elem.name}}</h1>
						<div class="result-btn-wrapper">
							<span class="input-btn btn-success" @click="setResult(key,true)">
								<i class="icon-check" ></i>
							</span>
							<span class="input-btn btn-cancel" @click="setResult(key,false)">
								<i class="icon-close" ></i>
							</span>
						</div>
					</div>
				</template>
			</div>
			<footer class="result-footer">
				<button type="button" @click="validResult">Validate</button>
			</footer>
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
			interval:false,
			score:10,
		}
	},
	methods:{
		addBuzzer:function(){
			this.buzzerList.findNewBuzzer()
		},
		buzzerPushed:function(event){
			let test = this.log.findIndex( (e) =>{
				return e.uid == event.detail.uid;
			});
			if(test == -1){
				this.buzzerList.setStatusById(event.detail.uid,'win')
				let info = {
					resultSet:false,
					result:false,
				};
				Object.assign(info,event.detail);
				this.log.push(info);
				if(this.log.length > 50){
					this.log.shift();
				}
			}
		},
		resetBuzzer:function(event){
			this.log = [];
			this.buzzerList.resetAll();
			this.score = 10;
		},
		getResultClass:function(key){
			if(!this.log[key].resultSet){
				return '';
			}
			if(this.log[key].result){
				return ' buzzer-element-win';
			}
			return ' buzzer-element-lost';
		},
		setResult:function(key,win){
			this.log[key].resultSet = true;
			this.log[key].result = win;
		},
		unsetResult:function(key){
			this.log[key].resultSet = false;
			this.log[key].result = false;
		},
		validResult:function(){
			for(let k in this.log){
				if(this.log[k].result){
					
					this.buzzerList.addScoreById(this.log[k].uid,this.score)
					this.score -= 1;
				}
			}
			this.resetBuzzer();
		}
	}
}
</script>
