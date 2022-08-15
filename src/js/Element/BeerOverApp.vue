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
				<div class="result-mode">
					<button type="button" :class="currentMode == 'sleep' ? 'btn-actif':'' " @click="setMode('sleep')">Sleep</button>
					<button type="button" :class="currentMode == 'wait' ? 'btn-actif':'' " @click="setMode('wait')">Buzz</button>
					<button type="button" :class="currentMode == 'choice' ? 'btn-actif':'' " @click="setMode('choice')">Choix</button>
				</div>
				<div class="result-answer">
					<template v-if="currentMode == 'choice'">
						<button type="button" :class="currentAnswer == 'A' ? 'btn-actif':'' " @click="setReponce('A')">A</button>
						<button type="button" :class="currentAnswer == 'B' ? 'btn-actif':'' " @click="setReponce('B')">B</button>
						<button type="button" :class="currentAnswer == 'C' ? 'btn-actif':'' " @click="setReponce('C')">C</button>
						<button type="button" :class="currentAnswer == 'D' ? 'btn-actif':'' " @click="setReponce('D')">D</button>
						<template v-if="currentAnswer != 'error'">
							<button type="button" @click="validAnswerResult">Validate</button>
						</template>
					</template>
				</div>
				<div  class="result-done">
					<template v-if="(currentMode == 'wait')">
						<button type="button" @click="cancelBuzzer">Reset</button>
						<button type="button" @click="validResult">Validate</button>
					</template>
				</div>
			</header>
			<div class="result-list">
				<template v-if="currentMode == 'choice'">
					<div class="result-choice">
						<template v-for="(elem,key) in log">
						<div :class="'result-element '+( getResultClass(elem) )">
							<div class="result-team-name">{{elem.name}}</div>
							<div class="result-team-answer">{{ displayAnswer(elem)}}</div>
						</div>
						</template>
					</div>
				</template>
				<template v-if="currentMode == 'wait'">
					<div class="result-buzz">
					<template v-for="(elem,key) in log">
						<div class="result-element">
							<h1>{{elem.name}}</h1>
							<!-- <div class="result-btn-wrapper">
								<span class="input-btn btn-success" @click="setResult(key,true)">
									<i class="icon-check" ></i>
								</span>
								<span class="input-btn btn-cancel" @click="setResult(key,false)">
									<i class="icon-close" ></i>
								</span> 
							</div>-->
						</div>
					</template>
					</div>
				</template>
			</div>
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
			currentMode:'sleep',
			currentAnswer:'error',
			interval:false,
			score:10,
		}
	},
	methods:{
		addBuzzer:function(){
			this.buzzerList.findNewBuzzer()
		},
		buzzerPushed:function(event){
			console.log(event.detail)
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
				if(this.currentMode == 'wait'){

					this.buzzerList.setMode('lost')
					this.buzzerList.setStatusById(info.uid,'win')

				}
			}
		},
		resetBuzzer:function(event){
			this.log = [];
			this.currentMode = 'sleep';
			this.currentAnswer = 'error',
			this.buzzerList.resetAll();
		},
		setMode:function(mode){
			this.log = [];
			this.currentMode = mode;
			this.buzzerList.setMode(mode);
		},
		setReponce:function(answer){
			this.currentAnswer = answer;
		},
		getResultClass:function(elem){
			if(this.currentMode=="choice" &&  this.currentAnswer!="error"){
				if(elem.message == 'btn'+this.currentAnswer){
					return ' buzzer-element-win';
				}
				return ' buzzer-element-lost';
			}
		},
		cancelBuzzer:function(){
			this.log = [];
			this.currentMode = 'wait';
			this.currentAnswer = 'error',
			this.buzzerList.setMode('wait');
		},
		displayAnswer:function(elem){
			//console.log('Elem',elem);
			return elem.message.replace('btn', '');
		},
		validResult:function(){
			for(let k in this.log){
				this.buzzerList.addScoreById(this.log[k].uid,1);
			}
			this.resetBuzzer();
		},
		validAnswerResult:function(){
			for(let k in this.log){
				if(this.log[k].message == 'btn'+this.currentAnswer){
					this.buzzerList.addScoreById(this.log[k].uid,1)
				}
			}
			this.resetBuzzer();
		}

	}
}
</script>
