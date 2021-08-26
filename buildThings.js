class Car {
	constructor(pos, size, colorName = 'white', materialArray, materialArray2, dashboard) {
		this.center = pos;
		this.size = size; // array of halfwidth's
		this.mesh = new THREE.Mesh(new THREE.BoxGeometry(size[0] * 2, size[1] * 2, size[2] * 2), materialArray);
		//this.mesh = readModel(modelName);
		this.mesh.position.copy(pos);
		this.speed = 0;
		this.minDis = 0;
		
		this.materialArray = materialArray;
		this.materialArray2 = materialArray2;
		this.dashboard = dashboard;
		
		this.dashboard.mesh.visible = false;
		
		this.leftfrontWheel = new THREE.Group();
		this.rightfrontWheel = new THREE.Group();
		this.leftRearWheel = new THREE.Group();
		this.rightRearWheel = new THREE.Group();
		
		this.mesh.add(this.leftfrontWheel, this.rightfrontWheel, this.leftRearWheel, this.rightRearWheel);
		scene.add(this.mesh);
		
		this.rotate(0); // set initial axes
	}

	rotate(angle) {
		this.angle = angle;

		let yAxis = new THREE.Vector3(0, 1, 0);
		this.axes = [];
		this.axes[0] = (new THREE.Vector3(1, 0, 0)).applyAxisAngle(yAxis, angle);
		this.axes[1] = (new THREE.Vector3(0, 0, 1)).applyAxisAngle(yAxis, angle);
				
		this.dir = [];
		this.dir[0] = (new THREE.Vector3(1, 0, 0)).applyAxisAngle(yAxis, angle);
		this.dir[1] = (new THREE.Vector3(-1, 0, 0)).applyAxisAngle(yAxis, angle);
		this.dir[2] = (new THREE.Vector3(0, 0, 1)).applyAxisAngle(yAxis, angle);
		this.dir[3] = (new THREE.Vector3(0, 0, -1)).applyAxisAngle(yAxis, angle);
		
		this.c = [];
		this.mesh.updateWorldMatrix(true, false);
		this.c[0] = this.mesh.localToWorld(new THREE.Vector3(this.size[0], 0, 0));
		this.c[1] = this.mesh.localToWorld(new THREE.Vector3(-this.size[0], 0, 0));
		this.c[2] = this.mesh.localToWorld(new THREE.Vector3(0, 0, this.size[2]));
		this.c[3] = this.mesh.localToWorld(new THREE.Vector3(0, 0, -this.size[2]));
				
		this.mesh.rotation.y = angle;
	}

	intersect(obbB) {
		// four axes to check
		let obbA = this;
		let sepAxes = [];
		sepAxes[0] = obbA.axes[0];
		sepAxes[1] = obbA.axes[1];
		sepAxes[2] = obbB.axes[0];
		sepAxes[3] = obbB.axes[1];
		
		let t = obbB.center.clone().sub(obbA.center.clone());
		for (let i = 0; i < 4; i++) {
			let sHat = sepAxes[i];
			let centerDis = Math.abs(t.dot(sHat));

			let dA = obbA.size[0] * Math.abs(obbA.axes[0].dot(sHat)) 
					+ obbA.size[1] * Math.abs(obbA.axes[1].dot(sHat));
			let dB = obbB.size[0] * Math.abs(obbB.axes[0].dot(sHat)) 
					+ obbB.size[1] * Math.abs(obbB.axes[1].dot(sHat));
			
			if (centerDis > dA + dB){
				return false;  // NOT intersect
			}
		}
		return true;  // intersect
	}
	
	move(pos){
		this.center.copy(pos);
		this.mesh.position.copy(this.center);
	}
	
	changeColor(signal){
		if(signal)
			this.mesh.material = this.materialArray2;
		else
			this.mesh.material = this.materialArray;
	}
	
	calculateCloseDistance(obbB){
		let obbA = this;
		
		var min = [
			{dis:obbB.calculateDistance(obbA.mesh.localToWorld(new THREE.Vector3(obbA.size[0], 0, obbA.size[2]))), dir:'xz'},
			{dis:obbB.calculateDistance(obbA.mesh.localToWorld(new THREE.Vector3(obbA.size[0], 0, -obbA.size[2]))), dir:'x-z'},
			{dis:obbB.calculateDistance(obbA.mesh.localToWorld(new THREE.Vector3(-obbA.size[0], 0, -obbA.size[2]))), dir:'-x-z'},
			{dis:obbB.calculateDistance(obbA.mesh.localToWorld(new THREE.Vector3(-obbA.size[0], 0, obbA.size[2]))), dir:'-xz'},
			{dis:obbB.calculateDistance(obbA.c[1]), dir:'back'}
		];
		
		return min;
	}

	calculateDistance(pointB) {
		// four axes to check
		let obbA = this;
		
		let x1 = (pointB.clone().sub(obbA.c[0])).dot(obbA.dir[0]);
		let x2 = (pointB.clone().sub(obbA.c[1])).dot(obbA.dir[1]);
		let z1 = (pointB.clone().sub(obbA.c[2])).dot(obbA.dir[2]);
		let z2 = (pointB.clone().sub(obbA.c[3])).dot(obbA.dir[3]);

		let dis = new THREE.Vector3(0, 0, 0);
		if(x1 > 0){
			if(z1 > 0){
				dis = pointB.clone().sub(obbA.mesh.localToWorld(new THREE.Vector3(obbA.size[0], 0, obbA.size[2])));
			}else if(z2 > 0){
				dis = pointB.clone().sub(obbA.mesh.localToWorld(new THREE.Vector3(obbA.size[0], 0, -obbA.size[2])));
			}else {
				dis.x = pointB.clone().sub(obbA.c[0]).dot(obbA.dir[0]);
				dis.z = 0;
			}
		}else if(x2 > 0){
			if(z1 > 0){
				dis = pointB.clone().sub(obbA.mesh.localToWorld(new THREE.Vector3(-obbA.size[0], 0, obbA.size[2])));
			}else if(z2 > 0){
				dis = pointB.clone().sub(obbA.mesh.localToWorld(new THREE.Vector3(-obbA.size[0], 0, -obbA.size[2])));
			}else {
				dis.x = pointB.clone().sub(obbA.c[1]).dot(obbA.dir[1]);
				dis.z = 0;
			}
		}else if(z1 > 0){
			dis.z = pointB.clone().sub(obbA.c[2]).dot(obbA.dir[2]);
			dis.x = 0;
		}else if(z2 > 0){
			dis.z = pointB.clone().sub(obbA.c[3]).dot(obbA.dir[3]);
			dis.x = 0;
		}else{
			dis.x = dis.z = 0;
		}
		
		return Math.sqrt(dis.x*dis.x + dis.z*dis.z);

	}
}

class Obstacle {
	constructor(pos, size, texture) {
		this.center = pos;
		this.size = size; // array of halfwidth's
		this.mesh = new THREE.Mesh(new THREE.BoxGeometry(size[0]*2, size[1]*2, size[2]*2), new THREE.MeshBasicMaterial({map: texture, transparent:true}));
		this.mesh.position.copy(pos);
				
		scene.add(this.mesh);
		this.rotate(0); // set initial axes
	}

	rotate(angle) {
		this.angle = angle;

		let yAxis = new THREE.Vector3(0, 1, 0);
		this.axes = [];
		this.axes[0] = (new THREE.Vector3(1, 0, 0)).applyAxisAngle(yAxis, angle);
		this.axes[1] = (new THREE.Vector3(0, 0, 1)).applyAxisAngle(yAxis, angle);
				
		this.dir = [];
		this.dir[0] = (new THREE.Vector3(1, 0, 0)).applyAxisAngle(yAxis, angle);
		this.dir[1] = (new THREE.Vector3(-1, 0, 0)).applyAxisAngle(yAxis, angle);
		this.dir[2] = (new THREE.Vector3(0, 0, 1)).applyAxisAngle(yAxis, angle);
		this.dir[3] = (new THREE.Vector3(0, 0, -1)).applyAxisAngle(yAxis, angle);
		
		this.c = [];
		this.mesh.updateWorldMatrix(true, false);
		this.c[0] = this.mesh.localToWorld(new THREE.Vector3(this.size[0], 0, 0));
		this.c[1] = this.mesh.localToWorld(new THREE.Vector3(-this.size[0], 0, 0));
		this.c[2] = this.mesh.localToWorld(new THREE.Vector3(0, 0, this.size[2]));
		this.c[3] = this.mesh.localToWorld(new THREE.Vector3(0, 0, -this.size[2]));
		
		this.mesh.rotation.y = angle;
	}
	
	calculateDistance(pointB) {
		// four axes to check
		let obbA = this;

		let x1 = (pointB.clone().sub(obbA.c[0])).dot(obbA.dir[0]);
		let x2 = (pointB.clone().sub(obbA.c[1])).dot(obbA.dir[1]);
		let z1 = (pointB.clone().sub(obbA.c[2])).dot(obbA.dir[2]);
		let z2 = (pointB.clone().sub(obbA.c[3])).dot(obbA.dir[3]);

		let dis = new THREE.Vector3(0, 0, 0);
		if(x1 > 0){
			if(z1 > 0){
				dis = pointB.clone().sub(obbA.mesh.localToWorld(new THREE.Vector3(obbA.size[0], 0, obbA.size[2])));
			}else if(z2 > 0){
				dis = pointB.clone().sub(obbA.mesh.localToWorld(new THREE.Vector3(obbA.size[0], 0, -obbA.size[2])));
			}else {
				dis.x = pointB.clone().sub(obbA.c[0]).dot(obbA.dir[0]);
				dis.z = 0;
			}
		}else if(x2 > 0){
			if(z1 > 0){
				dis = pointB.clone().sub(obbA.mesh.localToWorld(new THREE.Vector3(-obbA.size[0], 0, obbA.size[2])));
			}else if(z2 > 0){
				dis = pointB.clone().sub(obbA.mesh.localToWorld(new THREE.Vector3(-obbA.size[0], 0, -obbA.size[2])));
			}else {
				dis.x = pointB.clone().sub(obbA.c[1]).dot(obbA.dir[1]);
				dis.z = 0;
			}
		}else if(z1 > 0){
			dis.z = pointB.clone().sub(obbA.c[2]).dot(obbA.dir[2]);
			dis.x = 0;
		}else if(z2 > 0){
			dis.z = pointB.clone().sub(obbA.c[3]).dot(obbA.dir[3]);
			dis.x = 0;
		}else{
			dis.x = dis.z = 0;
		}
		return Math.sqrt(dis.x*dis.x + dis.z*dis.z);

	}
}

class ObstacleCar {
	constructor(pos, modelName) {
		this.center = pos;
		this.mesh = readModel(modelName);
		
		if(this.mesh){
			this.mesh.position.copy(pos);
			scene.add(this.mesh);
			this.rotate(0); // set initial axes
		}
	}

	rotate(angle) {
		this.angle = angle;

		let yAxis = new THREE.Vector3(0, 1, 0);
		this.axes = [];
		this.axes[0] = (new THREE.Vector3(1, 0, 0)).applyAxisAngle(yAxis, angle);
		this.axes[1] = (new THREE.Vector3(0, 0, 1)).applyAxisAngle(yAxis, angle);
				
		this.dir = [];
		this.dir[0] = (new THREE.Vector3(1, 0, 0)).applyAxisAngle(yAxis, angle);
		this.dir[1] = (new THREE.Vector3(-1, 0, 0)).applyAxisAngle(yAxis, angle);
		this.dir[2] = (new THREE.Vector3(0, 0, 1)).applyAxisAngle(yAxis, angle);
		this.dir[3] = (new THREE.Vector3(0, 0, -1)).applyAxisAngle(yAxis, angle);
		
		this.c = [];
		this.mesh.updateWorldMatrix(true, false);
		this.c[0] = this.mesh.localToWorld(new THREE.Vector3(this.size[0], 0, 0));
		this.c[1] = this.mesh.localToWorld(new THREE.Vector3(-this.size[0], 0, 0));
		this.c[2] = this.mesh.localToWorld(new THREE.Vector3(0, 0, this.size[2]));
		this.c[3] = this.mesh.localToWorld(new THREE.Vector3(0, 0, -this.size[2]));
		
		this.mesh.rotation.y = angle;
	}
	
	calculateDistance(pointB) {
		// four axes to check
		let obbA = this;

		let x1 = (pointB.clone().sub(obbA.c[0])).dot(obbA.dir[0]);
		let x2 = (pointB.clone().sub(obbA.c[1])).dot(obbA.dir[1]);
		let z1 = (pointB.clone().sub(obbA.c[2])).dot(obbA.dir[2]);
		let z2 = (pointB.clone().sub(obbA.c[3])).dot(obbA.dir[3]);

		let dis = new THREE.Vector3(0, 0, 0);
		if(x1 > 0){
			if(z1 > 0){
				dis = pointB.clone().sub(obbA.mesh.localToWorld(new THREE.Vector3(obbA.size[0], 0, obbA.size[2])));
			}else if(z2 > 0){
				dis = pointB.clone().sub(obbA.mesh.localToWorld(new THREE.Vector3(obbA.size[0], 0, -obbA.size[2])));
			}else {
				dis.x = pointB.clone().sub(obbA.c[0]).dot(obbA.dir[0]);
				dis.z = 0;
			}
		}else if(x2 > 0){
			if(z1 > 0){
				dis = pointB.clone().sub(obbA.mesh.localToWorld(new THREE.Vector3(-obbA.size[0], 0, obbA.size[2])));
			}else if(z2 > 0){
				dis = pointB.clone().sub(obbA.mesh.localToWorld(new THREE.Vector3(-obbA.size[0], 0, -obbA.size[2])));
			}else {
				dis.x = pointB.clone().sub(obbA.c[1]).dot(obbA.dir[1]);
				dis.z = 0;
			}
		}else if(z1 > 0){
			dis.z = pointB.clone().sub(obbA.c[2]).dot(obbA.dir[2]);
			dis.x = 0;
		}else if(z2 > 0){
			dis.z = pointB.clone().sub(obbA.c[3]).dot(obbA.dir[3]);
			dis.x = 0;
		}else{
			dis.x = dis.z = 0;
		}
		return Math.sqrt(dis.x*dis.x + dis.z*dis.z);

	}
}

class Dashboard{
	constructor(steeringWheel, accelerator, brakes, board, screen, autoBT, manuBT, gear, gearFrame
				, mode1BT, mode2BT, parkBT, topViewBT, CCWBT, zoomInBT, zoomOutBT, radarOn, radarOff
				, backAlert, backAlert2, backLeftAlert, backLeftAlert2, backRightAlert, backRightAlert2
				, frontRightAlert, frontRightAlert2, frontLeftAlert, frontLeftAlert2, gasIcon, brakeIcon){
		this.steeringWheel = steeringWheel;
		this.accelerator = accelerator;
		this.brakes = brakes;
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
				
		this.mesh = new THREE.Group();
		this.mesh.add(this.steeringWheel, this.accelerator, this.brakes, this.board, this.screen, this.autoBT, this.manuBT
					, this.gear, this.mode1BT, this.mode2BT, this.parkBT, this.topViewBT, this.CCWBT, this.zoomInBT, this.zoomOutBT
					, this.gearFrame, this.radarOn, this.radarOff, this.backAlert, this.backAlert2, this.backLeftAlert
					, this.backLeftAlert2, this.backRightAlert, this.backRightAlert2, this.frontRightAlert, this.frontRightAlert2
					, this.frontLeftAlert, this.frontLeftAlert2, this.gasIcon, this.brakeIcon);
		
		sceneHUD.add(this.mesh);
	}
}

class CarParameter{
	constructor(){
		this.bodyWidth = 20;
		this.bodyLength = 38;
		this.axelLength = 16;
		this.wheelToWheel = 26;
		this.bodyHeight = 20;
	}
}

function buildCar(pos) {
    let loader = new THREE.TextureLoader();
    loader.setCrossOrigin('');
  
    var materialArray = [];
    materialArray.push(new THREE.MeshLambertMaterial({
		map: loader.load ('https://i.imgur.com/c85515c.png'),
		transparent: true, opacity: 0.7
	}));
    materialArray.push(new THREE.MeshLambertMaterial({
		map: loader.load ('https://i.imgur.com/Klhgeai.png'),
		transparent: true, opacity: 0.7
	}));
    materialArray.push(new THREE.MeshLambertMaterial({
		map: loader.load ('https://i.imgur.com/vjq6Rm5.png'),
		transparent: true, opacity: 0.7
	}));
    materialArray.push(new THREE.MeshLambertMaterial({
		map: loader.load ('https://i.imgur.com/vjq6Rm5.png'),
		transparent: true, opacity: 0.7
	}));
    materialArray.push(new THREE.MeshLambertMaterial({
		map: loader.load ('https://i.imgur.com/wxiZvUo.png'),
		transparent: true, opacity: 0.7
	}));
    materialArray.push(new THREE.MeshLambertMaterial({
		map: loader.load ('https://i.imgur.com/wxiZvUo.png'),
		transparent: true, opacity: 0.7
	}));
	
	var materialArray2 = [];
    materialArray2.push(new THREE.MeshLambertMaterial({
		map: loader.load ('https://i.imgur.com/t4l7Tci.png'),
		transparent: true, opacity: 0.7
	}));
    materialArray2.push(new THREE.MeshLambertMaterial({
		map: loader.load ('https://i.imgur.com/Xv46HdL.png'),
		transparent: true, opacity: 0.7
	}));
    materialArray2.push(new THREE.MeshLambertMaterial({
		map: loader.load ('https://i.imgur.com/bBnU4nu.png'),
		transparent: true, opacity: 0.7
	}));
    materialArray2.push(new THREE.MeshLambertMaterial({
		map: loader.load ('https://i.imgur.com/bBnU4nu.png'),
		transparent: true, opacity: 0.7
	}));
    materialArray2.push(new THREE.MeshLambertMaterial({
		map: loader.load ('https://i.imgur.com/CjfzrQR.png'),
		transparent: true, opacity: 0.7
	}));
    materialArray2.push(new THREE.MeshLambertMaterial({
		map: loader.load ('https://i.imgur.com/CjfzrQR.png'),
		transparent: true, opacity: 0.7
	}));
  
    let wheelGeometry = new THREE.CylinderGeometry(5, 5, 2, 32, 1, true);
    let wheelMaterial = new THREE.MeshBasicMaterial({color: 0x000000});
    let circle = new THREE.Mesh(new THREE.CircleGeometry(5, 32), 
								new THREE.MeshBasicMaterial({
									map: loader.load ('https://i.imgur.com/ZeYqhuv.png'), 
									transparent: true, 
									side:THREE.DoubleSide
								}));
    circle.rotation.x = Math.PI/2;
    circle.position.y = 1;
    circle2 = circle.clone();
    circle2.position.y = -1;
	
	//dashboard
	let dashboard = buildDashboard();
  
    // assembly
    let car = new Car(pos, [carParameter.bodyLength/2, carParameter.bodyWidth/2, carParameter.bodyHeight/2], 'white', materialArray, materialArray2, dashboard);
	
    // wheels
    let mesh1 = new THREE.Mesh(wheelGeometry, wheelMaterial);
    car.leftfrontWheel.position.set(carParameter.wheelToWheel/2, -carParameter.axelLength/2, -carParameter.axelLength/2);
    mesh1.add(circle);
    mesh1.add(circle2);
    car.leftfrontWheel.add(mesh1);
    //important!!
    mesh1.rotation.x = Math.PI/2;
  
    let mesh2 = mesh1.clone();;
    car.rightfrontWheel.position.set(carParameter.wheelToWheel/2, -carParameter.axelLength/2, carParameter.axelLength/2);
    car.rightfrontWheel.add(mesh2);
    
    let mesh3 = mesh1.clone();;
    car.leftRearWheel.position.set(-carParameter.wheelToWheel/2, -carParameter.axelLength/2, -carParameter.axelLength/2);
    car.leftRearWheel.add(mesh3);
  
    let mesh4 = mesh1.clone();;
    car.rightRearWheel.position.set(-carParameter.wheelToWheel/2, -carParameter.axelLength/2, carParameter.axelLength/2);
    car.rightRearWheel.add(mesh4);
		
    return car;
}

function buildDashboard(){
	
	let loader = new THREE.TextureLoader();
	loader.crossOrigin = '';
	
	//steering wheel
	let texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/AaejjAQ.png'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var steeringWheel = new THREE.Mesh(new THREE.CircleGeometry(1.9, 32), texMat);
	steeringWheel.rotation.y = Math.PI/2;
	steeringWheel.position.z = -2.9;
	steeringWheel.position.y = -0.8;
	
	//Rear mirror
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/SQe7VBz.png'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var rearMirror = new THREE.Mesh(new THREE.PlaneGeometry(5, 2.5), texMat);
	rearMirror.position.set(0, 3.2, 3);
	rearMirror.rotation.y = -Math.PI/2;
	
	//accelerator
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/C1UKYm6.png'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var accelerator = new THREE.Mesh(new THREE.PlaneGeometry(1, 2), texMat);
	accelerator.position.z = 4;
	accelerator.rotation.y = -Math.PI/2;
	accelerator.name = 'accelerator';
	accelerator.visible = false;
	
	//brakes
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/70xXdul.png'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var brakes = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), texMat);
	brakes.position.z = 3;
	brakes.rotation.y = -Math.PI/2;
	brakes.name = 'brakes';
	brakes.visible = false;
	
	//dashboard
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/KV143SQ.png'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var board = new THREE.Mesh(new THREE.PlaneGeometry(12.6, 4), texMat);
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
		map: loader.load('https://i.imgur.com/6tm7czI.png?1'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var topViewBT = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.2), texMat);
	topViewBT.position.y = 1.48;
	topViewBT.position.z = 0.96;
	topViewBT.rotation.y = -Math.PI/2;
	topViewBT.name = 'topViewBT';
	
	//frontRightAlert
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/kxQcDcE.png?1'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var frontRightAlert = new THREE.Mesh(new THREE.PlaneGeometry(0.075, 0.04), texMat);
	frontRightAlert.position.y = 1.565;
	frontRightAlert.position.z = 1;
	frontRightAlert.rotation.y = -Math.PI/2;
	frontRightAlert.rotation.x = -Math.PI*3/4;
	
	//frontRightAlert2
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/kxQcDcE.png?1'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var frontRightAlert2 = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 0.05), texMat);
	frontRightAlert2.position.y = 1.575;
	frontRightAlert2.position.z = 1.005;
	frontRightAlert2.rotation.y = -Math.PI/2;
	frontRightAlert2.rotation.x = -Math.PI*3/4;
	
	//frontLeftAlert
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/kxQcDcE.png?1'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var frontLeftAlert = new THREE.Mesh(new THREE.PlaneGeometry(0.075, 0.04), texMat);
	frontLeftAlert.position.y = 1.565;
	frontLeftAlert.position.z = 0.915;
	frontLeftAlert.rotation.y = -Math.PI/2;
	frontLeftAlert.rotation.x = Math.PI*3/4;
	
	//frontLeftAlert2
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/kxQcDcE.png?1'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var frontLeftAlert2 = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 0.05), texMat);
	frontLeftAlert2.position.y = 1.575;
	frontLeftAlert2.position.z = 0.91;
	frontLeftAlert2.rotation.y = -Math.PI/2;
	frontLeftAlert2.rotation.x = Math.PI*3/4;
	
	//backLeftAlert
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/kxQcDcE.png?1'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var backLeftAlert = new THREE.Mesh(new THREE.PlaneGeometry(0.075, 0.04), texMat);
	backLeftAlert.position.y = 1.41;
	backLeftAlert.position.z = 0.915;
	backLeftAlert.rotation.y = -Math.PI/2;
	backLeftAlert.rotation.x = Math.PI/4;
	
	//backLeftAlert2
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/kxQcDcE.png?1'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var backLeftAlert2 = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 0.05), texMat);
	backLeftAlert2.position.y = 1.4;
	backLeftAlert2.position.z = 0.91;
	backLeftAlert2.rotation.y = -Math.PI/2;
	backLeftAlert2.rotation.x = Math.PI/4;
	
	//backRightAlert
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/kxQcDcE.png?1'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var backRightAlert = new THREE.Mesh(new THREE.PlaneGeometry(0.075, 0.04), texMat);
	backRightAlert.position.y = 1.4;
	backRightAlert.position.z = 0.995;
	backRightAlert.rotation.y = -Math.PI/2;
	backRightAlert.rotation.x = -Math.PI/4;
	
	//backRightAlert2
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/kxQcDcE.png?1'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var backRightAlert2 = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 0.05), texMat);
	backRightAlert2.position.y = 1.39;
	backRightAlert2.position.z = 1;
	backRightAlert2.rotation.y = -Math.PI/2;
	backRightAlert2.rotation.x = -Math.PI/4;
	
	//backAlert
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/08Vqwyy.png'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var backAlert = new THREE.Mesh(new THREE.PlaneGeometry(0.05, 0.02), texMat);
	backAlert.position.y = 1.39;
	backAlert.position.z = 0.96;
	backAlert.rotation.y = -Math.PI/2;
	
	//backAlert2
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/08Vqwyy.png'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var backAlert2 = new THREE.Mesh(new THREE.PlaneGeometry(0.05, 0.02), texMat);
	backAlert2.position.y = 1.38;
	backAlert2.position.z = 0.96;
	backAlert2.rotation.y = -Math.PI/2;
	
	//CCW
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/c7ynEsQ.png'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var CCWBT = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.2), texMat);
	CCWBT.position.y = 1.29;
	CCWBT.position.z = 0.96;
	CCWBT.rotation.y = -Math.PI/2;
	CCWBT.visible = false;
	CCWBT.name = 'CCWBT';
	
	//zoomIn
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/sCRnAtH.png'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var zoomInBT = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.2), texMat);
	zoomInBT.position.y = 1.09;
	zoomInBT.position.z = 0.96;
	zoomInBT.rotation.y = -Math.PI/2;
	zoomInBT.visible = false;
	zoomInBT.name = 'zoomInBT';
	
	//zoomOut
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/7bB1vvo.png'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var zoomOutBT = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.2), texMat);
	zoomOutBT.position.y = 0.89;
	zoomOutBT.position.z = 0.96;
	zoomOutBT.rotation.y = -Math.PI/2;
	zoomOutBT.visible = false;
	zoomOutBT.name = 'zoomOutBT';
	
	//gasIcon
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/k7YVw02.png'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var gasIcon = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.2), texMat);
	gasIcon.position.y = 0.35;
	gasIcon.position.z = -1.1;
	gasIcon.rotation.y = -Math.PI/2;
	gasIcon.material.color.set('dimgrey')
	
	//brakeIcon
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/c0ULrlV.png'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var brakeIcon = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.2), texMat);
	brakeIcon.position.y = 0.35;
	brakeIcon.position.z = -1.3;
	brakeIcon.rotation.y = -Math.PI/2;
	brakeIcon.material.color.set('dimgrey')
		
	var dashboard = new Dashboard(steeringWheel, accelerator, brakes, board, screen, autoBT, manuBT, gear, gearFrame
								, mode1BT, mode2BT, parkBT, topViewBT, CCWBT, zoomInBT, zoomOutBT, radarOn, radarOff
								, backAlert, backAlert2, backLeftAlert, backLeftAlert2, backRightAlert, backRightAlert2
								, frontRightAlert, frontRightAlert2, frontLeftAlert, frontLeftAlert2, gasIcon, brakeIcon);
	
	pickables.push(dashboard.parkBT, dashboard.CCWBT, dashboard.zoomInBT, dashboard.zoomOutBT, dashboard.autoBT, dashboard.mode1BT
					, dashboard.radarOn, dashboard.accelerator, dashboard.brakes, dashboard.topViewBT, dashboard.gear);
	
	return dashboard;
}