import Vue from 'vue';
import BeerOverApp from './Element/BeerOverApp.vue';

window.Vue = Vue;

Vue.component('beerover-app', BeerOverApp);

console.log('Coucou');
var deviceName = 'Palm'

function isWebBluetoothEnabled() {
	if (!navigator.bluetooth) {
		console.log('Web Bluetooth API is not available in this browser!')
		return false
	}

	return true
}

function getDeviceInfo() {
	let options = {
		acceptAllDevices: true // Option to accept all devices
		/*"filters": [
			{ "name": deviceName }
		]*/
	}

	console.log('Requesting Bluetooth Device...')
	navigator.bluetooth.requestDevice(options).then(device => {
		console.log('> Name: ' + device.name)
	}).catch(error => {
		console.log('Argh! ' + error)
	})
}

document.querySelector('form').addEventListener('submit', function(event) {
	event.stopPropagation()
	event.preventDefault()

	getDeviceInfo()
	/*if (isWebBluetoothEnabled()) {
	}*/
})