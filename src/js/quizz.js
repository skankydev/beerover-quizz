import Vue from 'vue';
import BeerOverApp from './Element/BeerOverApp.vue';
import BuzzerList from './Class/BuzzerList.js';

window.Vue = Vue;
window.BuzzerList = BuzzerList;
Vue.component('beerover-app', BeerOverApp);



/*
var deviceName = 'Beerover'
var bleService = '110a4526-2552-11ec-9621-0242ac130002'
var bleCharacteristic = '243b1e7c-2552-11ec-9621-0242ac130002'
var bluetoothDeviceDetected 
var gattCharacteristic
var myCharacteristic = [];

document.querySelector('#Connect').addEventListener('click', function() {
	if (isWebBluetoothEnabled()) { getDevice() }
})

document.querySelector('#Start').addEventListener('click', function(event) {
	if (isWebBluetoothEnabled()) { start() }
})

document.querySelector('#Stop').addEventListener('click', function(event) {
	if (isWebBluetoothEnabled()) { stop() }
})

function isWebBluetoothEnabled() {
	if (!navigator.bluetooth) {
		console.log('Web Bluetooth API is not available in this browser!')
		return false
	}
	return true
}

function getDevice() {
	let options = {
		optionalServices: [bleService],
		acceptAllDevices: true
		filters: [
			{ "name": deviceName }
		]
	}

	console.log('Cherche le buzzer')
	navigator.bluetooth.requestDevice(options).then((device) => {
		console.log('buzzer trouver',device);
		return device.gatt.connect();

	}).then((server) => {
		console.log('server',server);
		return server.getPrimaryService(bleService);

	}).then((service) => {
		console.log('service',service);

		return service.getCharacteristic(bleCharacteristic);

	}).then((characteristic) => {
		let key = myCharacteristic.push(characteristic) - 1;
		console.log('characteristic',characteristic);
		console.log('myCharacteristic',myCharacteristic);
		console.log('key',key);
		return myCharacteristic[key].startNotifications().then( () => {
			console.log('> Notifications started');
			myCharacteristic[key].addEventListener('characteristicvaluechanged',handleNotifications);
		});
	}).catch(error => {
		console.log('Argh! ' + error);
	});
}

function handleNotifications(event) {
	let value = event.target.value;
	console.log('event',event)
	console.log('myCharacteristic',myCharacteristic);
	
	
	let a = [];
	for (let i = 0; i < value.byteLength; i++) {
		a.push('0x' + ('00' + value.getUint8(i).toString(16)).slice(-2));
	}
	let text = String.fromCharCode.apply(null, new Uint16Array(a));
	console.log(text);
}
*/