import Vue from 'vue';
import BeerOverApp from './Element/BeerOverApp.vue';

window.Vue = Vue;

Vue.component('beerover-app', BeerOverApp);

console.log('Coucou');