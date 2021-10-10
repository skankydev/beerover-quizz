import Buzzer from "./Buzzer.js"


class BuzzerList{
	constructor(){
		if(! BuzzerList.instance){
			this.list = [];
			this.bleService = '110a4526-2552-11ec-9621-0242ac130002'
			this.bleCharacteristic = '243b1e7c-2552-11ec-9621-0242ac130002'
			document.addEventListener('BuzzerSay',this.buzzerListener.bind(this))
			BuzzerList.instance = this;
		}
		return BuzzerList.instance;
	}

	setDisplay(display){
		console.log('setDisplay',display)
		this.display = display;
	}
	buzzerListener(event){
		console.log(event)
		this.display.setText(event.value);
	}

	findNewBuzzer(){
		let options = {
			optionalServices: [this.bleService],
			acceptAllDevices: true
		}

		console.log('Cherche le buzzer')
		navigator.bluetooth.requestDevice(options).then((device) => {
			console.log('buzzer trouver',device);
			return device.gatt.connect();

		}).then((server) => {

			console.log('server',server);
			return server.getPrimaryService(this.bleService);

		}).then((service) => {

			console.log('service',service);
			return service.getCharacteristic(this.bleCharacteristic);

		}).then((characteristic) => {
			let key = this.list.push(characteristic) - 1;
			return this.list[key].startNotifications().then( () => {
				this.list[key].addEventListener('characteristicvaluechanged',this.newNotif.bind(this));
			});
		}).catch(error => {
			console.log('Argh! ' + error);
		});
	}

	newNotif(event) {
		let value = event.target.value;
		console.log('event',event)
		console.log('myCharacteristic',this);
		
		
		let a = [];
		for (let i = 0; i < value.byteLength; i++) {
			a.push('0x' + ('00' + value.getUint8(i).toString(16)).slice(-2));
		}
		let text = String.fromCharCode.apply(null, new Uint16Array(a));
		console.log(text);
		let message = new Event('BuzzerSay');
		message.value = text;
		document.dispatchEvent(message);
		
	}

}


const instance = new BuzzerList();
export default instance;
