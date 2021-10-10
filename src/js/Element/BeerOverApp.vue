<template>
	<div class="Main">
		<header>
			{{ msg }}
			<button class="count" @click="addBuzzer">Find Buzzer</button>
		</header>
		<section class="buzzer-message">
			<template v-for="(text,key) in log">
				<div>
					{{key}} - {{text}}
				</div>
			</template>
		</section>
	</div>
</template>

<script>



export default {
	monted(){
		//this.buzzerList.setDisplay(this);
	},
	data () {
		return {
			msg: 'Hello Beerover !',
			count:0,
			log:[],
			buzzerList:{},
		}
	},
	methods:{
		setBuzzerList(buzzerList){
			this.buzzerList = buzzerList;
		},
		addBuzzer:function(){
			this.buzzerList.findNewBuzzer()
		},
		setText:function(text){
			this.log.push(text);
			if(this.log.length > 50){
				this.log.shift();
			}
		}
	}
}
</script>
