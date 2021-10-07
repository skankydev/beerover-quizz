import Vue from 'vue';
import BeerOverApp from './Element/BeerOverApp.vue';

window.Vue = Vue;

Vue.component('beerover-app', BeerOverApp);

console.log('Youpi');

var deviceName = 'Beerover'
var bleService = '110a4526-2552-11ec-9621-0242ac130002'
var bleCharacteristic = '243b1e7c-2552-11ec-9621-0242ac130002'
var bluetoothDeviceDetected
var gattCharacteristic
var myCharacteristic

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
		/*filters: [
			{ "name": deviceName }
		]*/
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
		myCharacteristic = characteristic;
		return myCharacteristic.startNotifications().then( () => {
			console.log('> Notifications started');
			myCharacteristic.addEventListener('characteristicvaluechanged',handleNotifications);
		});
	}).catch(error => {
		console.log('Argh! ' + error);
	});
}

function handleNotifications(event) {
	let value = event.target.value;
	console.log('event',event)
	console.log('value',String.fromCharCode.apply(null, value))
	let a = [];
	// Convert raw data bytes to hex values just for the sake of showing something.
	// In the "real" world, you'd use data.getUint8, data.getUint16 or even
	// TextDecoder to process raw data bytes.
	for (let i = 0; i < value.byteLength; i++) {
		a.push('0x' + ('00' + value.getUint8(i).toString(16)).slice(-2));
	}
	let text = String.fromCharCode.apply(null, new Uint16Array(a));
	console.log(text);
}
