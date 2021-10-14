import Vue from 'vue';
import BeerOverApp from './Element/BeerOverApp.vue';
//import BuzzerList from './Class/BuzzerList.js';

window.SERVICE_UUID   = "110a4526-2552-11ec-9621-0242ac130002";
window.NOTIFIEUR_UUID = "243b1e7c-2552-11ec-9621-0242ac130002";
window.BATTERY_UUID   = "14b12d85-f19a-4a82-893b-e0ac47070626";
window.STATUS_UUID    = "28f31c76-2d13-11ec-8d3d-0242ac130003";

window.makeId = function(){
	return Math.floor((1 + Math.random()) * 0x10000)
		.toString(16)
		.substring(1);
}

window.Vue = Vue;
//window.BuzzerList = BuzzerList;
Vue.component('beerover-app', BeerOverApp);

