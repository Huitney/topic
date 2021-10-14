class Dashboard{
	constructor(steeringWheel, board, screen, autoBT, manuBT, gear, gearFrame
				, mode1BT, mode2BT, parkBT, topViewBT, CCWBT, zoomInBT, zoomOutBT, radarOn, radarOff
				, backAlert, backAlert2, backLeftAlert, frontAlert, frontAlert2, backLeftAlert2
				, backRightAlert, backRightAlert2, frontRightAlert, frontRightAlert2, frontLeftAlert
				, frontLeftAlert2, gasIcon, brakeIcon, mapIcon, splitLine, speedometer, pointer
				, turnSignalL, turnSignalR){
		this.steeringWheel = steeringWheel;
		this.board = board;
		this.screen = screen;
		this.gear = gear;
		this.gearFrame = gearFrame;
		this.autoBT = autoBT;
		this.manuBT = manuBT;
		this.parkBT = parkBT;
		this.mode1BT = mode1BT;
		this.mode2BT = mode2BT;
		this.topViewBT = topViewBT;
		this.CCWBT = CCWBT;
		this.zoomInBT = zoomInBT;
		this.zoomOutBT = zoomOutBT;
		this.radarOn = radarOn;
		this.radarOff = radarOff;
		this.backAlert = backAlert;
		this.backAlert2 = backAlert2;
		this.frontAlert = frontAlert;
		this.frontAlert2 = frontAlert2;
		this.backLeftAlert = backLeftAlert;
		this.backLeftAlert2 = backLeftAlert2;
		this.backRightAlert = backRightAlert;
		this.backRightAlert2 = backRightAlert2;
		this.frontRightAlert = frontRightAlert;
		this.frontRightAlert2 = frontRightAlert2;
		this.frontLeftAlert = frontLeftAlert;
		this.frontLeftAlert2 = frontLeftAlert2;
		this.gasIcon = gasIcon;
		this.brakeIcon = brakeIcon;
		this.mapIcon = mapIcon;
		this.splitLine = splitLine;
		this.speedometer = speedometer;
		this.pointer = pointer;
		this.turnSignalL = turnSignalL;
		this.turnSignalR = turnSignalR;
				
		this.mesh = new THREE.Group();
		this.mesh.add(this.steeringWheel, this.board, this.screen, this.autoBT, this.manuBT
					, this.gear, this.mode1BT, this.mode2BT, this.parkBT, this.topViewBT, this.CCWBT, this.zoomInBT, this.zoomOutBT
					, this.gearFrame, this.radarOn, this.radarOff, this.backAlert, this.backAlert2, this.frontAlert, this.frontAlert2
					, this.backLeftAlert, this.backLeftAlert2, this.backRightAlert, this.backRightAlert2, this.frontRightAlert
					, this.frontRightAlert2, this.frontLeftAlert, this.frontLeftAlert2, this.gasIcon, this.brakeIcon, this.mapIcon
					, this.splitLine, this.speedometer, this.pointer, this.turnSignalL, this.turnSignalR);
		
		sceneHUD.add(this.mesh);
	}
}

function buildDashboard(){
	
	let loader = new THREE.TextureLoader();
	loader.crossOrigin = '';
	
	//steering wheel
	let texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/0ltwDD9.png'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var steeringWheel = new THREE.Mesh(new THREE.CircleGeometry(1.9, 32), texMat);
	steeringWheel.rotation.y = Math.PI/2;
	steeringWheel.position.z = -2.9;
	steeringWheel.position.y = -0.8;
			
	//dashboard
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/KV143SQ.png'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var board = new THREE.Mesh(new THREE.PlaneGeometry(13, 4.2), texMat);
	board.position.y = 1.2;
	board.position.x = 1;
	board.rotation.y = -Math.PI/2;
	
	//screen
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/Yzp5Nmi.png'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var screen = new THREE.Mesh(new THREE.PlaneGeometry(3.5, 3.5), texMat);
	screen.position.y = 0.93;
	screen.position.x = 0.5;
	screen.position.z = -0.1;
	screen.rotation.y = -Math.PI/2;
	
	//gear
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/gzWiMRh.png'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var gear = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.2), texMat);
	gear.position.y = 0.85;
	gear.position.x = 0.1;
	gear.position.z = -0.05;
	gear.rotation.y = -Math.PI/2;
	gear.name = 'gear';
	
	//gearFrame
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/oTfN2ti.png'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var gearFrame = new THREE.Mesh(new THREE.PlaneGeometry(0.18, 0.2), texMat);
	gearFrame.position.y = 0.88;
	gearFrame.position.z = -0.28;
	gearFrame.rotation.y = -Math.PI/2;
	
	//parkBT
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/AlHYNp3.png?1'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var parkBT = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.2), texMat);
	parkBT.position.y = 1.48;
	parkBT.position.z = -1.04;
	parkBT.rotation.y = -Math.PI/2;
	parkBT.name = 'parkBT';

	//autoBT
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/2wkfSV9.png'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var autoBT = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.2), texMat);
	autoBT.position.y = 1.29;
	autoBT.position.z = -1.04;
	autoBT.rotation.y = -Math.PI/2;
	autoBT.name = 'autoBT';
	autoBT.visible = false;
	
	//manuBT
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/XIsYz0D.png'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var manuBT = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.2), texMat);
	manuBT.position.y = 1.29;
	manuBT.position.z = -1.04;
	manuBT.rotation.y = -Math.PI/2;
	
	//mode1BT
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/taNvJdb.png'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var mode1BT = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.2), texMat);
	mode1BT.position.y = 1.09;
	mode1BT.position.z = -1.04;
	mode1BT.rotation.y = -Math.PI/2;
	mode1BT.name = 'mode1BT';
	
	//mode2BT
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/VtzN4y6.png'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var mode2BT = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.2), texMat);
	mode2BT.position.y = 1.09;
	mode2BT.position.z = -1.04;
	mode2BT.rotation.y = -Math.PI/2;
	mode2BT.visible = false;
	
	//radarOn
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/SLIy2b4.png?2'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var radarOn = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.2), texMat);
	radarOn.position.y = 0.89;
	radarOn.position.z = -1.04;
	radarOn.rotation.y = -Math.PI/2;
	radarOn.name = 'radarOn';
	
	//radarOff
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/7Om3su8.png?1'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var radarOff = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.2), texMat);
	radarOff.position.y = 0.89;
	radarOff.position.z = -1.04;
	radarOff.rotation.y = -Math.PI/2;
	radarOff.visible = false;
	
	//topViewBT
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/dpGfOHI.png'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var topViewBT = new THREE.Mesh(new THREE.PlaneGeometry(0.38, 0.38), texMat);
	topViewBT.position.y = 1.37;
	topViewBT.position.z = 0.92;
	topViewBT.rotation.y = -Math.PI/2;
	topViewBT.name = 'topViewBT';
	
	//frontRightAlert
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/ocrXB81.png'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var frontRightAlert = new THREE.Mesh(new THREE.PlaneGeometry(0.18, 0.18), texMat);
	frontRightAlert.position.y = 1.51;
	frontRightAlert.position.z = 0.955;
	frontRightAlert.rotation.y = -Math.PI/2;
	
	//frontRightAlert2
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/Ss58Poh.png'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var frontRightAlert2 = new THREE.Mesh(new THREE.PlaneGeometry(0.18, 0.18), texMat);
	frontRightAlert2.position.y = 1.54;
	frontRightAlert2.position.z = 0.985;
	frontRightAlert2.rotation.y = -Math.PI/2;
	
	//frontLeftAlert
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/ocrXB81.png'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var frontLeftAlert = new THREE.Mesh(new THREE.PlaneGeometry(0.18, 0.18), texMat);
	frontLeftAlert.position.y = 1.51;
	frontLeftAlert.position.z = 0.89;
	frontLeftAlert.rotation.y = -Math.PI/2;
	frontLeftAlert.rotation.x = -Math.PI/2;
	
	//frontLeftAlert2
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/Ss58Poh.png'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var frontLeftAlert2 = new THREE.Mesh(new THREE.PlaneGeometry(0.18, 0.18), texMat);
	frontLeftAlert2.position.y = 1.54;
	frontLeftAlert2.position.z = 0.86;
	frontLeftAlert2.rotation.y = -Math.PI/2;
	frontLeftAlert2.rotation.x = -Math.PI/2;
	
	//backLeftAlert
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/ocrXB81.png'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var backLeftAlert = new THREE.Mesh(new THREE.PlaneGeometry(0.18, 0.18), texMat);
	backLeftAlert.position.y = 1.22;
	backLeftAlert.position.z = 0.895;
	backLeftAlert.rotation.y = -Math.PI/2;
	backLeftAlert.rotation.x = Math.PI;
	
	//backLeftAlert2
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/Ss58Poh.png'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var backLeftAlert2 = new THREE.Mesh(new THREE.PlaneGeometry(0.18, 0.18), texMat);
	backLeftAlert2.position.y = 1.19;
	backLeftAlert2.position.z = 0.865;
	backLeftAlert2.rotation.y = -Math.PI/2;
	backLeftAlert2.rotation.x = Math.PI;
	
	//backRightAlert
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/ocrXB81.png'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var backRightAlert = new THREE.Mesh(new THREE.PlaneGeometry(0.18, 0.18), texMat);
	backRightAlert.position.y = 1.22;
	backRightAlert.position.z = 0.945;
	backRightAlert.rotation.y = -Math.PI/2;
	backRightAlert.rotation.x = Math.PI/2;
	
	//backRightAlert2
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/Ss58Poh.png'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var backRightAlert2 = new THREE.Mesh(new THREE.PlaneGeometry(0.18, 0.18), texMat);
	backRightAlert2.position.y = 1.19;
	backRightAlert2.position.z = 0.975;
	backRightAlert2.rotation.y = -Math.PI/2;
	backRightAlert2.rotation.x = Math.PI/2;
	
	//backAlert
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/OIYkcZm.png'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var backAlert = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 0.1), texMat);
	backAlert.position.y = 1.15;
	backAlert.position.z = 0.925;
	backAlert.rotation.y = -Math.PI/2;
	
	//backAlert2
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/OIYkcZm.png'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var backAlert2 = new THREE.Mesh(new THREE.PlaneGeometry(0.08, 0.08), texMat);
	backAlert2.position.y = 1.1;
	backAlert2.position.z = 0.92;
	backAlert2.rotation.y = -Math.PI/2;
	
	//frontAlert
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/OIYkcZm.png'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var frontAlert = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 0.1), texMat);
	frontAlert.position.y = 1.59;
	frontAlert.position.z = 0.925;
	frontAlert.rotation.y = -Math.PI/2;
	
	//frontAlert2
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/OIYkcZm.png'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var frontAlert2 = new THREE.Mesh(new THREE.PlaneGeometry(0.08, 0.08), texMat);
	frontAlert2.position.y = 1.63;
	frontAlert2.position.z = 0.92;
	frontAlert2.rotation.y = -Math.PI/2;
	
	//mapIcon
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/BfHiBya.png?1'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var mapIcon = new THREE.Mesh(new THREE.PlaneGeometry(0.18, 0.28), texMat);
	mapIcon.position.y = 0.98;
	mapIcon.position.z = 0.99;
	mapIcon.rotation.y = -Math.PI/2;
	mapIcon.name = 'mapIcon';
	
	//CCW
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/c7ynEsQ.png'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var CCWBT = new THREE.Mesh(new THREE.PlaneGeometry(0.13, 0.13), texMat);
	CCWBT.position.set(0, 1.08, 0.81);
	CCWBT.rotation.y = -Math.PI/2;
	CCWBT.visible = false;
	CCWBT.name = 'CCWBT';
	
	//zoomIn
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/RepKBvi.png'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var zoomInBT = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 0.1), texMat);
	zoomInBT.position.set(0, 0.95, 0.81);
	zoomInBT.rotation.y = -Math.PI/2;
	zoomInBT.visible = false;
	zoomInBT.name = 'zoomInBT';
	
	//zoomOut
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/6GixlJH.png'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var zoomOutBT = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 0.1), texMat);
	zoomOutBT.position.set(0, 0.85, 0.81);
	zoomOutBT.rotation.y = -Math.PI/2;
	zoomOutBT.visible = false;
	zoomOutBT.name = 'zoomOutBT';
	
	//gasIcon
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/P51HddP.png'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var gasIcon = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.2), texMat);
	gasIcon.position.y = 0.35;
	gasIcon.position.z = -1.1;
	gasIcon.rotation.y = -Math.PI/2;
	gasIcon.material.color.set('dimgrey');
	
	//brakeIcon
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/khjtf3o.png'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var brakeIcon = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.2), texMat);
	brakeIcon.position.y = 0.35;
	brakeIcon.position.z = -1.3;
	brakeIcon.rotation.y = -Math.PI/2;
	brakeIcon.material.color.set('dimgrey');
	
	//splitLine
	var splitLine = new THREE.Mesh(new THREE.PlaneGeometry(0.02, 0.82), new THREE.MeshBasicMaterial({color: 'blue'}));
	splitLine.position.set(0, 1.18, -0.09);
	splitLine.rotation.y = -Math.PI/2;
	splitLine.visible = false;
	
	//speedometer
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/CHfdlEr.png'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var speedometer = new THREE.Mesh(new THREE.CircleGeometry(0.6, 32), texMat);
	speedometer.position.set(0.3, 0.2, -3);
	speedometer.rotation.y = -Math.PI/2;
	
	//pointer
	let cone = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.3, 32), new THREE.MeshBasicMaterial({color: 'red'}));
	var pointer = new THREE.Group();
	pointer.add(cone);
	cone.position.z = -0.15;
	cone.rotation.x = -Math.PI/2 - Math.PI/15;
	pointer.position.set(0.3, 0.07, -3);
	
	//turnSignalL
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/QMsaXAr.png'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var turnSignalL = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.15), texMat);
	turnSignalL.position.set(0.2, 0.14, -3.6);
	turnSignalL.rotation.y = -Math.PI/2;
	turnSignalL.rotation.x = Math.PI;
	turnSignalL.material.color.set('dimgrey');
	
	//turnSignalR
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/QMsaXAr.png'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var turnSignalR = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.15), texMat);
	turnSignalR.position.set(0.2, 0.135, -2.29);
	turnSignalR.rotation.y = -Math.PI/2;
	turnSignalR.material.color.set('dimgrey');
		
	var dashboard = new Dashboard(steeringWheel, board, screen, autoBT, manuBT, gear, gearFrame
								, mode1BT, mode2BT, parkBT, topViewBT, CCWBT, zoomInBT, zoomOutBT, radarOn, radarOff
								, backAlert, backAlert2, backLeftAlert, frontAlert, frontAlert2, backLeftAlert2
								, backRightAlert, backRightAlert2, frontRightAlert, frontRightAlert2, frontLeftAlert
								, frontLeftAlert2, gasIcon, brakeIcon, mapIcon, splitLine, speedometer, pointer
								, turnSignalL, turnSignalR);
	
	pickables.push(dashboard.parkBT, dashboard.CCWBT, dashboard.zoomInBT, dashboard.zoomOutBT, dashboard.autoBT, dashboard.mode1BT
					, dashboard.radarOn, dashboard.topViewBT, dashboard.gear, dashboard.mapIcon);
	
	return dashboard;
}