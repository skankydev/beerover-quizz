

export default class Buzzer {
	
	constructor(device,key){
		this.uid = makeId();
		this.key = key;
		this.device = device;
		this.service = {};
		this.server = {};

		this.notifieur = {};
		this.battery = {};
		this.statusBle = {};
		this.status = "wait";
		
		this.connected = true;

		this.batteryValue = 0;
		this.score = 0;
		this.name = 'Team - '+key;

		this.device.addEventListener('gattserverdisconnected', this.onDisconnected.bind(this));
		this.device.addEventListener('advertisementreceived', this.onAdvertisment.bind(this));
	}

	addScore(score){
		this.score += score
	}

	async init(){

		this.service = await this.device.gatt.connect().then((server) => {
			this.server = server
			return this.server.getPrimaryService(SERVICE_UUID);
		}).then((service) => {
			return service
		}).catch(error => {
			console.log('Buzzer  marche pas !' + error);
		});
		this.initNotifieur();
		this.initBattery();
		this.initStatus();

		this.startUpdateBattery();
		
	}

	onAdvertisment(event){
		console.log('Advertisement received.');
		console.log('  Device Name: ' + event.device.name);
		console.log('  Device ID: ' + event.device.id);
		console.log('  RSSI: ' + event.rssi);
		console.log('  TX Power: ' + event.txPower);
		console.log('  UUIDs: ' + event.uuids);
		event.manufacturerData.forEach((valueDataView, key) => {
			this.logDataView('Manufacturer', key, valueDataView);
		});
		event.serviceData.forEach((valueDataView, key) => {
			this.logDataView('Service', key, valueDataView);
		});
	}

	logDataView(labelOfDataSource, key, valueDataView) {
		const hexString = [...new Uint8Array(valueDataView.buffer)].map(b => {
			return b.toString(16).padStart(2, '0');
		}).join(' ');
		const textDecoder = new TextDecoder('ascii');
		const asciiString = textDecoder.decode(valueDataView.buffer);
		console.log(`  ${labelOfDataSource} Data: ` + key +
		  '\n    (Hex) ' + hexString +
		  '\n    (ASCII) ' + asciiString);
	};

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
			this.battery = battery;
			return this.battery.readValue();
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

	getStatus(){
		return this.status;
	}


	getBattery(){
		this.battery.readValue().then((value)=>{
			this.batteryValue = asString(value);
		});
		return this.batteryValue;
	}

	startUpdateBattery(){
		this.intervalId = setInterval(this.getBattery.bind(this), 10000);
	}
	stopUpdateBattery(){
		clearInterval(this.intervalId)
	}

	newNotif(event) {
		let value = event.target.value;
		let text = asString(value);
		let emit = new CustomEvent('BuzzerPush',{ detail: {
			message:text,
			name:this.name,
			uid:this.uid
		} })
		document.dispatchEvent(emit);
	}

	onDisconnected(){
		this.connected = false;
		this.stopUpdateBattery();
	}

	reconnectDevice() {
		if (!this.device) {
			return;
		}
		if (this.device.gatt.connected) {
			return;
		}
		this.init();
		this.connected = true;
	}

}
