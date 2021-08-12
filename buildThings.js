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

		let t = obbB.center.clone().sub(obbA.center);
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
		// four axes to check
		let obbA = this;
		let sepAxes = [];
		sepAxes[0] = obbA.axes[0];
		sepAxes[1] = obbA.axes[1];
		sepAxes[2] = obbB.axes[0];
		sepAxes[3] = obbB.axes[1];
		
		let closeDis = [];

		let t = obbB.center.clone().sub(obbA.center);
		for (let i = 0; i < 4; i++) {
			let sHat = sepAxes[i];
			let centerDis = Math.abs(t.dot(sHat));

			let dA = obbA.size[0] * Math.abs(obbA.axes[0].dot(sHat)) 
					+ obbA.size[1] * Math.abs(obbA.axes[1].dot(sHat));
			let dB = obbB.size[0] * Math.abs(obbB.axes[0].dot(sHat)) 
					+ obbB.size[1] * Math.abs(obbB.axes[1].dot(sHat));
			
			let dis = Math.abs(centerDis - (dA + dB))
			if(dis >= 0){
				closeDis[0] = (closeDis[0] === undefined) ? dis : closeDis[0];
				if(closeDis[0] > dis){
					closeDis[0] = dis;
					closeDis[1] = sHat;
				}
			}
		}
		return closeDis;
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
		this.mesh.rotation.y = angle;
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
		this.mesh.rotation.y = angle;
	}
}

class Dashboard{
	constructor(steeringWheel, accelerator, brakes, board, screen, autoBT, manuBT, gear, gearFrame
				, mode1BT, mode2BT, parkBT, topViewBT, wave, CCWBT, zoomInBT, zoomOutBT, radarOn, radarOff){
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
		this.wave = wave;
		this.CCWBT = CCWBT;
		this.zoomInBT = zoomInBT;
		this.zoomOutBT = zoomOutBT;
		this.radarOn = radarOn;
		this.radarOff = radarOff;
				
		this.mesh = new THREE.Group();
		this.mesh.add(this.steeringWheel, this.accelerator, this.brakes, this.board, this.screen, this.autoBT, this.manuBT, this.gear
					, this.mode1BT, this.mode2BT, this.parkBT, this.topViewBT, this.wave, this.CCWBT, this.zoomInBT, this.zoomOutBT, this.gearFrame
					, this.radarOn, this.radarOff);
		
		sceneHUD.add(this.mesh);
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
    let car = new Car(pos, [19, 10, 10], 'white', materialArray, materialArray2, dashboard);
	
    // wheels
    let mesh1 = new THREE.Mesh(wheelGeometry, wheelMaterial);
    car.leftfrontWheel.position.set(13, -8, -8);
    mesh1.add(circle);
    mesh1.add(circle2);
    car.leftfrontWheel.add(mesh1);
    //important!!
    mesh1.rotation.x = Math.PI/2;
  
    let mesh2 = mesh1.clone();;
    car.rightfrontWheel.position.set(13, -8, 8);
    car.rightfrontWheel.add(mesh2);
    
    let mesh3 = mesh1.clone();;
    car.leftRearWheel.position.set(-13, -8, -8);
    car.leftRearWheel.add(mesh3);
  
    let mesh4 = mesh1.clone();;
    car.rightRearWheel.position.set(-13, -8, 8);
    car.rightRearWheel.add(mesh4);
		
    return car;
}

function drawFrame(){
	//frame 邊框
    var fframe = new THREE.Mesh(new THREE.PlaneGeometry(5.7, 0.08), new THREE.MeshBasicMaterial({
		color: 0xff0000,
		depthTest: false
    }));
    var fframe2 = new THREE.Mesh(new THREE.PlaneGeometry(5.8, 0.08), new THREE.MeshBasicMaterial({
		color: 0xff0000,
		opacity: 0.6,
		transparent: true,
		depthTest: false
    }));
    var fup = fframe.clone();
    fup.position.set (6.8,9.9,0);
    var fdown = fframe.clone();
    fdown.position.set (6.8,4.1,0);
    var fleft = fframe2.clone();
    fleft.rotation.z = Math.PI/2;
    fleft.position.set (3.94,7,0);
    var fright = fframe2.clone();
    fright.rotation.z = Math.PI/2;
    fright.position.set (9.7,7,0);
    sceneHUD.add(fup, fdown, fleft, fright);
}

function drawParkingSpace(){
	const material = new THREE.LineBasicMaterial( { linewidth: 6, color: 0xffffff } );
	const points = [];
	points.push( new THREE.Vector3( 27, 0, 18 ) );
	points.push( new THREE.Vector3( 27, 0, 42 ) );
	points.push( new THREE.Vector3( -27, 0, 42 ) );
	points.push( new THREE.Vector3( -27, 0, 18 ) );
	points.push( new THREE.Vector3( 27, 0, 18 ) );

	const geometry = new THREE.BufferGeometry().setFromPoints( points );
	const parkingSpace1 = new THREE.Line( geometry, material );
	parkingSpace1.position.set(0, 0.4, 40);

	var parkingSpace2 = parkingSpace1.clone();
	parkingSpace2.position.x = 54;
	
	var parkingSpace3 = parkingSpace1.clone();
	parkingSpace3.position.x = -54;
	scene.add(parkingSpace1 , parkingSpace2, parkingSpace3);

}

function readModel (modelName, targetSize=40) {
	var onProgress = function(xhr) {
		if (xhr.lengthComputable) {
			var percentComplete = xhr.loaded / xhr.total * 100;
			console.log(Math.round(percentComplete, 2) + '% downloaded');
		}
	};

	var onError = function(xhr) {};
	
	//var model;
	var mtlLoader =  new THREE.MTLLoader();
	mtlLoader.setPath('models/');
	mtlLoader.load(modelName+'.mtl', function(materials) {
		materials.preload();

		var objLoader =  new THREE.OBJLoader();
		objLoader.setMaterials(materials);
		objLoader.setPath('models/');
		objLoader.load(modelName+'.obj', function(object) {

			let theObject =  unitize (object, targetSize);
			//theObject.add(new THREE.BoxHelper(theObject));
			theObject.name = 'OBJ';

			var model = new THREE.Object3D();
			model.add(theObject);
			model.rotation.y = Math.PI/2;
			return model;
		}, onProgress, onError);

	});
	
	
}

function unitize (object, targetSize) {  

	// find bounding box of 'object'
	var box3 = new THREE.Box3();
	box3.setFromObject (object);
	var size = new THREE.Vector3();
	size.subVectors (box3.max, box3.min);
	var center = new THREE.Vector3();
	center.addVectors(box3.max, box3.min).multiplyScalar (0.5);

	console.log ('center: ' + center.x + ', '+center.y + ', '+center.z );
	console.log ('size: ' + size.x + ', ' +  size.y + ', '+size.z );

	// uniform scaling according to objSize
	var objSize = Math.max (size.x, size.y, size.z);
	var scaleSet = targetSize/objSize;

	var theObject =  new THREE.Object3D();
	theObject.add (object);
	object.scale.set (scaleSet, scaleSet, scaleSet);
	object.position.set (-center.x*scaleSet, center.y*scaleSet/6, -center.z*scaleSet);
	return theObject;
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
	var rearMirror = new THREE.Mesh(new THREE.PlaneGeometry(5, 2.5, 3), texMat);
	rearMirror.position.set(0, 3.2, 3);
	rearMirror.rotation.y = -Math.PI/2;
	
	//accelerator
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/C1UKYm6.png'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var accelerator = new THREE.Mesh(new THREE.PlaneGeometry(1, 2, 1), texMat);
	accelerator.position.z = 4;
	accelerator.rotation.y = -Math.PI/2;
	accelerator.name = 'accelerator';
	
	//brakes
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/70xXdul.png'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var brakes = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 1), texMat);
	brakes.position.z = 3;
	brakes.rotation.y = -Math.PI/2;
	brakes.name = 'brakes';
	
	//dashboard
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/KV143SQ.png'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var board = new THREE.Mesh(new THREE.PlaneGeometry(12.6, 4, 25.2), texMat);
	board.position.y = 1.2;
	board.position.x = 1;
	board.rotation.y = -Math.PI/2;
	
	//screen
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/Yzp5Nmi.png'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var screen = new THREE.Mesh(new THREE.PlaneGeometry(3.5, 3.5, 7), texMat);
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
	var gear = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.2, 1), texMat);
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
	var gearFrame = new THREE.Mesh(new THREE.PlaneGeometry(0.18, 0.2, 1), texMat);
	gearFrame.position.y = 0.88;
	gearFrame.position.z = -0.28;
	gearFrame.rotation.y = -Math.PI/2;
	
	//parkBT
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/AlHYNp3.png?1'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var parkBT = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.2, 1), texMat);
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
	var autoBT = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.2, 1), texMat);
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
	var manuBT = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.2, 1), texMat);
	manuBT.position.y = 1.29;
	manuBT.position.z = -1.04;
	manuBT.rotation.y = -Math.PI/2;
	
	//mode1BT
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/taNvJdb.png'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var mode1BT = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.2, 1), texMat);
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
	var mode2BT = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.2, 1), texMat);
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
	var radarOn = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.2, 1), texMat);
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
	var radarOff = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.2, 1), texMat);
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
	var topViewBT = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.2, 1), texMat);
	topViewBT.position.y = 1.48;
	topViewBT.position.z = 0.96;
	topViewBT.rotation.y = -Math.PI/2;
	topViewBT.name = 'topViewBT';
	
	//wave
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/kxQcDcE.png?1'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var waveMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 0.04, 1), texMat);
	var wave = new THREE.Group();
	wave.add(waveMesh);
	wave.position.y = 1.48;
	wave.position.z = 0.96;
	wave.rotation.y = -Math.PI/2;
	waveMesh.position.y = -0.1;
	waveMesh.position.z = -0.005;
	wave.visible = false;
	
	//CCW
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/c7ynEsQ.png'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var CCWBT = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.2, 1), texMat);
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
	var zoomInBT = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.2, 1), texMat);
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
	var zoomOutBT = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.2, 1), texMat);
	zoomOutBT.position.y = 0.89;
	zoomOutBT.position.z = 0.96;
	zoomOutBT.rotation.y = -Math.PI/2;
	zoomOutBT.visible = false;
	zoomOutBT.name = 'zoomOutBT';
		
	var dashboard = new Dashboard(steeringWheel, accelerator, brakes, board, screen, autoBT, manuBT, gear, gearFrame
								, mode1BT, mode2BT, parkBT, topViewBT, wave, CCWBT, zoomInBT, zoomOutBT, radarOn, radarOff);
	
	pickables.push(dashboard.parkBT, dashboard.CCWBT, dashboard.zoomInBT, dashboard.zoomOutBT, dashboard.autoBT, dashboard.mode1BT
					, dashboard.radarOn, dashboard.accelerator, dashboard.brakes, dashboard.topViewBT, dashboard.gear);
	
	return dashboard;
}