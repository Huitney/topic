class Car {
	constructor(pos, size, materialArray, materialArray2, dashboard, mapArrow, brakeLight, turnSignal, colorName = 'white') {
		this.center = pos;
		this.size = size; // array of halfwidth's
		this.mesh = new THREE.Mesh(new THREE.BoxGeometry(size[0] * 2, size[1] * 2, size[2] * 2), materialArray);
		this.mesh.position.copy(pos);
		this.speed = 0;
		this.minDis = 0;
		
		this.materialArray = materialArray;
		this.materialArray2 = materialArray2;
		this.dashboard = dashboard;
		this.dashboard.mesh.visible = false;
		this.mapArrow = mapArrow;
		
		this.brakeLightR = brakeLight;
		this.brakeLightR.material.color.set('darkred');
		this.brakeLightR.position.set(-19.02, -5, 8);
		this.brakeLightL = brakeLight.clone();
		this.brakeLightL.material.color.set('darkred');
		this.brakeLightL.position.set(-19.02, -5, -8);
		
		this.turnSignalR = turnSignal[0];
		this.turnSignalR.material.color.set(0x998000);
		this.turnSignalR.position.set(-19.01, -7, 8);
		this.turnSignalL = turnSignal[1];
		this.turnSignalL.material.color.set(0x998000);
		this.turnSignalL.position.set(-19.01, -7, -8);
				
		this.leftfrontWheel = new THREE.Group();
		this.rightfrontWheel = new THREE.Group();
		this.leftRearWheel = new THREE.Group();
		this.rightRearWheel = new THREE.Group();
		this.seats = buildSeats();
		
		this.mesh.add(this.leftfrontWheel, this.rightfrontWheel, this.leftRearWheel, this.rightRearWheel
					, this.brakeLightR, this.brakeLightL, this.seats, this.turnSignalR, this.turnSignalL);
		scene.add(this.mesh, this.mapArrow);
		
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
		this.mapArrow.rotation.y = angle;
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
		this.mapArrow.position.copy(this.center);
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
			{dis:obbB.calculateDistance(obbA.c[1]), dir:'back'},
			{dis:obbB.calculateDistance(obbA.c[0]), dir:'front'}
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

function buildCar(pos) {
    let loader = new THREE.TextureLoader();
    loader.setCrossOrigin('');
  
    var materialArray = [];
    materialArray.push(new THREE.MeshLambertMaterial({
		map: loader.load ('https://i.imgur.com/iRrkNU7.png'),
		transparent: true, opacity: 0.7, side: THREE.DoubleSide, alphaTest: 0.5
	}));
    materialArray.push(new THREE.MeshLambertMaterial({
		map: loader.load ('https://i.imgur.com/m8OcKV5.png'),
		transparent: true, opacity: 0.7, side: THREE.DoubleSide, alphaTest: 0.5
	}));
    materialArray.push(new THREE.MeshLambertMaterial({
		map: loader.load ('https://i.imgur.com/vjq6Rm5.png'),
		transparent: true, opacity: 0.7, side: THREE.DoubleSide, alphaTest: 0.5
	}));
    materialArray.push(new THREE.MeshLambertMaterial({
		map: loader.load ('https://i.imgur.com/vjq6Rm5.png'),
		transparent: true, opacity: 0.7, side: THREE.DoubleSide, alphaTest: 0.5
	}));
    materialArray.push(new THREE.MeshLambertMaterial({
		map: loader.load ('https://i.imgur.com/BbC4LNk.png'),
		transparent: true, opacity: 0.7, side: THREE.DoubleSide, alphaTest: 0.5
	}));
    materialArray.push(new THREE.MeshLambertMaterial({
		map: loader.load ('https://i.imgur.com/BbC4LNk.png'),
		transparent: true, opacity: 0.7, side: THREE.DoubleSide, alphaTest: 0.5
	}));
	
	var materialArray2 = [];
    materialArray2.push(new THREE.MeshLambertMaterial({
		map: loader.load ('https://i.imgur.com/JMN31Pd.png'),
		transparent: true, opacity: 0.7, side: THREE.DoubleSide, alphaTest: 0.5
	}));
    materialArray2.push(new THREE.MeshLambertMaterial({
		map: loader.load ('https://i.imgur.com/E6Aa12z.png'),
		transparent: true, opacity: 0.7, side: THREE.DoubleSide, alphaTest: 0.5
	}));
    materialArray2.push(new THREE.MeshLambertMaterial({
		map: loader.load ('https://i.imgur.com/bBnU4nu.png'),
		transparent: true, opacity: 0.7, side: THREE.DoubleSide, alphaTest: 0.5
	}));
    materialArray2.push(new THREE.MeshLambertMaterial({
		map: loader.load ('https://i.imgur.com/bBnU4nu.png'),
		transparent: true, opacity: 0.7, side: THREE.DoubleSide, alphaTest: 0.5
	}));
    materialArray2.push(new THREE.MeshLambertMaterial({
		map: loader.load ('https://i.imgur.com/E3Z6EF9.png'),
		transparent: true, opacity: 0.7, side: THREE.DoubleSide, alphaTest: 0.5
	}));
    materialArray2.push(new THREE.MeshLambertMaterial({
		map: loader.load ('https://i.imgur.com/E3Z6EF9.png'),
		transparent: true, opacity: 0.7, side: THREE.DoubleSide, alphaTest: 0.5
	}));
  
    let wheelGeometry = new THREE.CylinderGeometry(5, 5, 2, 32, 1, true);
    let wheelMaterial = new THREE.MeshBasicMaterial({color: 0x000000, side:THREE.DoubleSide});
    let circle = new THREE.Mesh(new THREE.CircleGeometry(5, 32), 
								new THREE.MeshBasicMaterial({
									map: loader.load ('https://i.imgur.com/ZeYqhuv.png'), 
									transparent: true, 
									side:THREE.DoubleSide
								}));
    circle.rotation.x = Math.PI/2;
    circle.position.y = 1;
    let circle2 = circle.clone();
    circle2.position.y = -1;
	
	//dashboard
	let dashboard = buildDashboard();
	
	let bodyLength = carParameter[carParameter.map(x =>x.name).indexOf('bodyLength')].value
	, bodyWidth = carParameter[carParameter.map(x =>x.name).indexOf('bodyWidth')].value
	, axelLength = carParameter[carParameter.map(x =>x.name).indexOf('axelLength')].value
	, frontWheelToBackWheel = carParameter[carParameter.map(x =>x.name).indexOf('frontWheelToBackWheel')].value;
	
	//mapArrow
	var arrowMesh = new THREE.Mesh(new THREE.PlaneGeometry(70, 70), new THREE.MeshBasicMaterial({
																		map: loader.load('https://i.imgur.com/1wmEVdS.png'),
																		alphaTest: 0.5,
																		side: THREE.DoubleSide
																	}));
	arrowMesh.rotation.z = -Math.PI/2;
	arrowMesh.rotation.x = Math.PI/2;
	let mapArrow = new THREE.Group();
	mapArrow.add(arrowMesh);
	mapArrow.visible = false;
	
	//brakeLight
	var brakeLight = new THREE.Mesh(new THREE.PlaneGeometry(3, 3), new THREE.MeshBasicMaterial({
																		map: loader.load('https://i.imgur.com/CrbaIo1.png'),
																		alphaTest: 0.5,
																		side: THREE.DoubleSide
																	}));
	brakeLight.rotation.y = Math.PI/2;
	
	//turnSignal
	var turnSignalR = new THREE.Mesh(new THREE.PlaneGeometry(3, 3), new THREE.MeshBasicMaterial({
																		map: loader.load('https://i.imgur.com/CrbaIo1.png'),
																		alphaTest: 0.5,
																		side: THREE.DoubleSide
																	}));
	turnSignalR.rotation.y = Math.PI/2;
	var turnSignalL = new THREE.Mesh(new THREE.PlaneGeometry(3, 3), new THREE.MeshBasicMaterial({
																		map: loader.load('https://i.imgur.com/CrbaIo1.png'),
																		alphaTest: 0.5,
																		side: THREE.DoubleSide
																	}));
	turnSignalL.rotation.y = Math.PI/2;
  
    // assembly
    let car = new Car(pos, [bodyLength/2, bodyWidth/2, 10], materialArray, materialArray2, dashboard, mapArrow, brakeLight, [turnSignalR, turnSignalL], 'white');
	
    // wheels
    let mesh1 = new THREE.Mesh(wheelGeometry, wheelMaterial);
    car.leftfrontWheel.position.set(frontWheelToBackWheel/2, -axelLength/2, -axelLength/2);
    mesh1.add(circle);
    mesh1.add(circle2);
    car.leftfrontWheel.add(mesh1);
    //important!!
    mesh1.rotation.x = Math.PI/2;
  
    let mesh2 = mesh1.clone();
    car.rightfrontWheel.position.set(frontWheelToBackWheel/2, -axelLength/2, axelLength/2);
    car.rightfrontWheel.add(mesh2);
    
    let mesh3 = mesh1.clone();
    car.leftRearWheel.position.set(-frontWheelToBackWheel/2, -axelLength/2, -axelLength/2);
    car.leftRearWheel.add(mesh3);
  
    let mesh4 = mesh1.clone();
    car.rightRearWheel.position.set(-frontWheelToBackWheel/2, -axelLength/2, axelLength/2);
    car.rightRearWheel.add(mesh4);
		
    return car;
}

function buildSeats(){
	var seats = new THREE.Group();
	
	//backSeats
	let shape = new THREE.Shape();
	shape.moveTo( 0,0 );
	shape.lineTo( 0, 10 );
	shape.lineTo( 3, 10 );
	shape.lineTo( 3, 6 );
	shape.lineTo( 9, 6 );
	shape.lineTo( 9, 10 );
	shape.lineTo( 12, 10 );
	shape.lineTo( 12, 0 );
	shape.lineTo( 0, 0 );

	let extrudeSettings = {
		steps: 2,
		depth: 2,
		bevelThickness: 1,
		bevelSize: 1,
		bevelSegments: 1
	};
	
	let geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
	let backSeats = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0x323740, transparent: true, opacity: 0.7 } ) ) ;
	backSeats.position.set(-12, -5, -6);
	backSeats.rotation.y = -Math.PI/2;
	
	let longSeat = new THREE.Mesh( new THREE.BoxGeometry( 5, 2, 14 ), new THREE.MeshLambertMaterial( {color: 0x323740, transparent: true, opacity: 0.7} ) );
	longSeat.position.set(6, 0, -1.5);
	longSeat.rotation.y = Math.PI/2;
	backSeats.add(longSeat);
	
	//frontSeat
	shape = new THREE.Shape();
	shape.moveTo( 0,0 );
	shape.lineTo( 0, 10 );
	shape.lineTo( 2, 10 );
	shape.lineTo( 2, 2 );
	shape.lineTo( 5, 2 );
	shape.lineTo( 5, 0 );
	shape.lineTo( 0, 0 );

	extrudeSettings = {
		steps: 2,
		depth: 4,
		bevelThickness: 1,
		bevelSize: 1,
		bevelSegments: 1
	};
	geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
	let frontSeatL = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0x323740, transparent: true, opacity: 0.7 } ) ) ;
	frontSeatL.position.set(5, -5, -6);
	
	let frontSeatR = frontSeatL.clone();
	frontSeatR.position.set(5, -5, 2);
	
	
	seats.add( backSeats, frontSeatL, frontSeatR );
	return seats;
}