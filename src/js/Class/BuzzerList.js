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

	resetAll(){
		for(let k in this.list){
			this.list[k].setStatus('wait');
		}
	}

	setStatusById(id,status){
		let k = this.findById(id)
		if(k>-1){
			this.list[k].setStatus(status);
		}
	}

	findById(id){
		for(let i in this.list){
			if(this.list[i].uid == id){
				return i;
			}
		}
		return -1;
	}
	

}


const instance = new BuzzerList();
export default instance;
