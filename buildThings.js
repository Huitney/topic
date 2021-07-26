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
		
		let closeDis;

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
				closeDis = (closeDis === undefined) ? dis : closeDis;
				if(closeDis > dis)
					closeDis = dis;
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

class Dashboard{
	constructor(steeringWheel, accelerator, brakes, board, screen, gear, gearFrame, autoBT){
		this.steeringWheel = steeringWheel;
		this.accelerator = accelerator;
		this.brakes = brakes;
		this.board = board;
		this.screen = screen;
		this.gear = gear;
		this.gearFrame = gearFrame;
		this.autoBT = autoBT;
		
		this.mesh = new THREE.Group();
		this.mesh.add(this.steeringWheel, this.accelerator, this.brakes, this.board, 
						this.screen, this.gear, this.gearFrame, this.autoBT);
		sceneHUD.add(this.mesh);
	}
}

function buildCar(pos) {
    let loader = new THREE.TextureLoader();
    loader.setCrossOrigin('');
  
    var materialArray = [];
    materialArray.push(new THREE.MeshLambertMaterial({
		map: loader.load ('http://i.imgur.com/3hnQcus.png'),
		transparent: true, opacity: 0.7
	}));
    materialArray.push(new THREE.MeshLambertMaterial({
		map: loader.load ('http://i.imgur.com/oPWLR0Y.png'),
		transparent: true, opacity: 0.7
	}));
    materialArray.push(new THREE.MeshLambertMaterial({
		map: loader.load ('http://i.imgur.com/qTj48LD.png'),
		transparent: true, opacity: 0.7
	}));
    materialArray.push(new THREE.MeshLambertMaterial({
		map: loader.load ('http://i.imgur.com/qTj48LD.png'),
		transparent: true, opacity: 0.7
	}));
    materialArray.push(new THREE.MeshLambertMaterial({
		map: loader.load ('http://i.imgur.com/oWaSyZJ.png'),
		transparent: true, opacity: 0.7
	}));
    materialArray.push(new THREE.MeshLambertMaterial({
		map: loader.load ('http://i.imgur.com/oWaSyZJ.png'),
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
									map: loader.load ('http://i.imgur.com/8enBd95.png'), 
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
	
	var model;
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

			model = new THREE.Object3D();
			model.add(theObject);
			model.rotation.y = Math.PI/2;
			scene.add(model);
		}, onProgress, onError);

	});
	
	//return model;
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
	steeringWheel.position.y = -0.5;
	
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
	
	//brakes
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/70xXdul.png'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var brakes = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 1), texMat);
	brakes.position.z = 3;
	brakes.rotation.y = -Math.PI/2;
	
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
		map: loader.load('https://i.imgur.com/DLYSvCe.png?1'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var screen = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 3.2, 6.4), texMat);
	screen.position.y = 1;
	screen.position.x = 0.5;
	screen.position.z = -0.1;
	screen.rotation.y = -Math.PI/2;
	
	//gear
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/FVKuYLa.png'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var gear = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.8, 1), texMat);
	gear.position.y = 1.15;
	gear.position.z = -1;
	screen.position.x = 0.1;
	gear.rotation.y = -Math.PI/2;
	
	//gear
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/oTfN2ti.png'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var gearFrame = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.2, 1), texMat);
	gearFrame.position.y = 1.45;
	gearFrame.position.z = -1;
	gearFrame.rotation.y = -Math.PI/2;
	
	//autoBT
	texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/AlHYNp3.png?1'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var autoBT = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.2, 1), texMat);
	autoBT.position.y = 1.44;
	autoBT.position.z = 0.91;
	autoBT.rotation.y = -Math.PI/2;
		
	var dashboard = new Dashboard(steeringWheel, accelerator, brakes, board, 
								screen, gear, gearFrame, autoBT);
	
	return dashboard;
}

function buildScenes(){
	
	let loader = new THREE.TextureLoader();
	loader.crossOrigin = '';
	let texture = loader.load('https://i.imgur.com/uatNsoh.png');
	texture.repeat.set(14, 14);
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	var plane = new THREE.Mesh(new THREE.PlaneGeometry(700, 260), new THREE.MeshBasicMaterial({map: texture}));
	plane.rotation.x = -Math.PI/2;
	
	let texture1 = loader.load('https://i.imgur.com/EB8HFqt.jpg?1');
	var plane1 = new THREE.Mesh(new THREE.PlaneGeometry(700, 120), new THREE.MeshBasicMaterial({map: texture1}));
	texture1.repeat.set(3,1);
	texture1.wrapS = THREE.RepeatWrapping;
	texture1.wrapT = THREE.RepeatWrapping;
	plane1.rotation.x = -Math.PI/2;
	plane1.position.y = 0.2;

	scene.add(plane, plane1);
	
	let texture3 = loader.load('https://i.imgur.com/cNqeEt2.png');
	let trafficLight = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), new THREE.MeshBasicMaterial({map: texture3, transparent:true}));
	trafficLight.rotation.y = -Math.PI/2;
	trafficLight.position.set(200, 25, -35);
	scene.add(trafficLight);
	
}