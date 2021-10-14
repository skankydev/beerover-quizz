

export default class Buzzer {
	
	constructor(device,key){
		this.id = makeId();
		this.key = key;
		this.device = device;
		this.battery = 0;
		this.service = {};
		this.name = 'Team';
		console.log('device',this.device);

	}

	async init(){

		this.service = await this.device.gatt.connect().then((server) => {
			return server.getPrimaryService(SERVICE_UUID);
		}).then((service) => {
			return service
		}).catch(error => {
			console.log('Buzzer  marche pas !' + error);
		});
		this.initNotifieur();
		this.initBattery();
	}

	initNotifieur(){
		this.service.getCharacteristic(NOTIFIEUR_UUID).then((notifieur) => {
			this.notifieur = notifieur;
			return this.notifieur.startNotifications().then( () => {
				this.notifieur.addEventListener('characteristicvaluechanged',this.newNotif.bind(this));
			});
		}).catch(error => {
			console.log('Notifieur marche pas !' + error);
		});
	}

	initBattery(){
		this.service.getCharacteristic(BATTERY_UUID).then(battery => {
			return battery.readValue();
		}).then((value)=>{
			console.log(value)
			//Bon j ai un truc mais pas sur du truc 
			this.battery = value.getFloat32();
			console.log(this.battery);

		}).catch(error => {
			console.log('Battery marche pas !' + error);
		});
	}

	newNotif(event) {
		let value = event.target.value;
		let a = [];
		for (let i = 0; i < value.byteLength; i++) {
			a.push('0x' + ('00' + value.getUint8(i).toString(16)).slice(-2));
		}
		let text = String.fromCharCode.apply(null, new Uint16Array(a));
		let emit = new CustomEvent('BuzzerPush',{ detail: {
			message:text,
			id:this.id
		} })
		console.log('befor dispatch',emit);
		document.dispatchEvent(emit);
	}
}
