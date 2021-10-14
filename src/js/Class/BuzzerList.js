import Buzzer from "./Buzzer.js"

class BuzzerList{
	constructor(){
		if(! BuzzerList.instance){
			this.list = [];
			BuzzerList.instance = this;
		}
		return BuzzerList.instance;
	}

	findNewBuzzer(){
		let options = {
			optionalServices: [SERVICE_UUID],
			acceptAllDevices: true
		}

		navigator.bluetooth.requestDevice(options).then((device) => {

			let buzzer = new Buzzer(device,this.list.length);
			buzzer.init();
			//buzzer.getBattery();
			this.list.push(buzzer);

		}).catch(error => {
			console.log('List Argh! ' + error);
		});
	}

	

}


const instance = new BuzzerList();
export default instance;
