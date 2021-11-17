const { ipcMain, app, BrowserWindow } = require('electron')
const path = require('path');

var callbackForBluetoothEvent = null;


/*app
  .commandLine
  .appendSwitch('enable-web-bluetooth', true);*/

function createWindow () {
	const win = new BrowserWindow({
		width: 1280,
		height: 720,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js')
		}
	})

/*	win.webContents.on('select-bluetooth-device', (event, deviceList, callback) => {
		event.preventDefault(); //important, otherwise first available device will be selected
		console.log(deviceList); //if you want to see the devices in the shell
		let bluetoothDeviceList = deviceList;
		callbackForBluetoothEvent = callback;

		win.webContents.send('channelForBluetoothDeviceList', bluetoothDeviceList);
	});*/


	win.loadFile('./public/index.html')
}

app.whenReady().then(() => { 
	createWindow()
	app.on('activate', function () {
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})
})

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin'){
		app.quit()
	}
})
 
