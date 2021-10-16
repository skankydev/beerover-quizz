

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
		this.initStatus();
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
			this.bettery = battery;
			return battery.readValue();
		}).then((value)=>{
			//Bon j ai un truc mais pas sur du truc 

			this.batteryValue = asString(value);
		}).catch(error => {
			console.log('Battery marche pas !' + error);
		});
	}

	initStatus(){
		this.service.getCharacteristic(STATUS_UUID).then(status => {
			this.statusBle = status;
			return this.statusBle;
		}).catch(error => {
			console.log('Battery marche pas !' + error);
		});
	}

	setStatus(status){
		this.status = status;
		var enc = new TextEncoder(); 
		this.statusBle.writeValueWithoutResponse(enc.encode(status));
	}

	getBattery(){
		battery.readValue().then((value)=>{
			this.batteryValue = asString(value);
		});
		return this.batteryValue 
	}


	newNotif(event) {
		let value = event.target.value;
		let text = asString(value);
		let emit = new CustomEvent('BuzzerPush',{ detail: {
			message:text,
			id:this.id
		} })
		console.log('befor dispatch',emit);
		document.dispatchEvent(emit);
	}
}
