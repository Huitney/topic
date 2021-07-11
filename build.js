class Car {
	constructor(pos, size, colorName = 'white', materialArray) {
		this.center = pos;
		this.size = size; // array of halfwidth's
		this.mesh = new THREE.Mesh(new THREE.BoxGeometry(size[0] * 2, size[1] * 2, size[2] * 2), materialArray);
		this.mesh.position.copy(pos);
		
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
			
			//radarsound
			if (centerDis - dA + dB <= 8){
				qSound.play();
				qSound.muted = false;
				mSound.muted = true;
				sSound.muted = true;
			}
			else if (centerDis - dA + dB <= 16){
				mSound.play();
				qSound.muted = true;
				mSound.muted = false;
				sSound.muted = true;
			}
			else if (centerDis - dA + dB <= 24){
				sSound.play();
				qSound.muted = true;
				mSound.muted = true;
				sSound.muted = false;
			}
			
			if (centerDis > dA + dB){
				return false;  // NOT intersect
			}
			
			//console.log(centerDis, dA + dB);
		}
		return true;  // intersect
	}
	
	move(pos){
		this.center.copy(pos);
		this.mesh.position.copy(this.center);
	}
	
}

class Obstacle {
	constructor(pos, size, colorName = 'white') {
		this.center = pos;
		this.size = size; // array of halfwidth's
		this.mesh = new THREE.Mesh(new THREE.BoxGeometry(size[0]*2, size[1]*2, size[2]*2), new THREE.MeshLambertMaterial({color: colorName}));
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
			if (centerDis > dA + dB)
				return false;  // NOT intersect
			
			//console.log(centerDis, dA + dB);
		}
		return true;  // intersect
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
  
    // assembly
    let car = new Car(pos, [19, 10, 10], 'red', materialArray);
	
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
    sceneHUD.add(fup);
    sceneHUD.add(fdown);
    sceneHUD.add(fleft);
    sceneHUD.add(fright);
}

function drawParkingSpace(){
	const material = new THREE.LineBasicMaterial( { color: 0xffff00 } );
	const points = [];
	points.push( new THREE.Vector3( 25, 0, 18 ) );
	points.push( new THREE.Vector3( 25, 0, 42 ) );
	points.push( new THREE.Vector3( -25, 0, 42 ) );
	points.push( new THREE.Vector3( -25, 0, 18 ) );
	points.push( new THREE.Vector3( 25, 0, 18 ) );

	const geometry = new THREE.BufferGeometry().setFromPoints( points );
	const parkingSpace1 = new THREE.Line( geometry, material );
	scene.add( parkingSpace1 );

	var parkingSpace2 = parkingSpace1.clone();
	parkingSpace2.position.x = 67;
	scene.add(parkingSpace2);
	
	var parkingSpace3 = parkingSpace1.clone();
	parkingSpace3.position.x = -67;
	scene.add(parkingSpace3);

}

function readModel (modelName, targetSize=40) {
	var onProgress = function(xhr) {
	if (xhr.lengthComputable) {
		var percentComplete = xhr.loaded / xhr.total * 100;
			console.log(Math.round(percentComplete, 2) + '% downloaded');
		}
	};

	var onError = function(xhr) {};

	var mtlLoader =  new THREE.MTLLoader();
	mtlLoader.setPath('models/');
	mtlLoader.load(modelName+'.mtl', function(materials) {
		materials.preload();

		var objLoader =  new OBJLoader();
		objLoader.setMaterials(materials);
		objLoader.setPath('models/');
		objLoader.load(modelName+'.obj', function(object) {

		let theObject =  unitize (object, targetSize);
		theObject.add(new THREE.BoxHelper(theObject));
		theObject.name = 'OBJ'

		truck = new THREE.Object3D();
		truck.add(theObject);
		truck.rotation.y = Math.PI/2;

		scene.add (truck);

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
	
	var dashboard = new THREE.Group();
	
	var circle = new THREE.Mesh(new THREE.CircleGeometry(1, 32), new THREE.MeshBasicMaterial({color: 'gray', side: THREE.DoubleSide}));
	circle.position.z = 3;
	circle.rotation.y = Math.PI/2;
	
	//steering wheel
	let loader = new THREE.TextureLoader();
	loader.crossOrigin = '';
	var texMat = new THREE.MeshBasicMaterial({
		map: loader.load('https://i.imgur.com/AaejjAQ.png'),
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	var steeringWheel = new THREE.Mesh(new THREE.CircleGeometry(2, 32), texMat);
	steeringWheel.rotation.y = Math.PI/2;
		
	dashboard.add(steeringWheel, circle);

	//number
	loader.load(
    'https://i.imgur.com/X0z0Ine.png?1',
    // Function when resource is loaded
    function(texture) {
		// Plane with default texture coordinates [0,1]x[0,1]
		var texMat = new THREE.MeshBasicMaterial({
			map: texture,
			alphaTest: 0.5,
			side:THREE.DoubleSide,
			polygonOffset: true,
			polygonOffsetFactor: -1.0,
			polygonOffsetUnits: -4.0
		});
		var numberL = new THREE.Mesh(buildNumberGeometry(), texMat);
		var numberR = new THREE.Mesh(buildNumberGeometry(), texMat);
		texture.wrapS = THREE.RepeatWrapping;
		numberL.position.z = 2.6;
		numberL.rotation.y = -Math.PI/2;
		numberR.position.z = 3.4;
		numberR.rotation.y = -Math.PI/2;
		dashboard.add(numberL, numberR);
    },
	undefined,
    // Function called when download errors
    function(xhr) {
		console.log('An error happened');
    }
	);
	
	
	return dashboard;
}

function buildNumberGeometry() {
	var geometry = new THREE.BufferGeometry();
	let vertices = [];
	let uvs = [];
	let indices = [0,1,2, 0,2,3];
	vertices.push(-0.5,-0.5,0, 0.5,-0.5,0, 0.5,0.5,0, -0.5,0.5,0);
	uvs.push (0,0, 0.1,0, 0.1,1, 0,1);

	geometry.setIndex(indices);
	geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
	geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));

	geometry.computeBoundingSphere();
	geometry.computeFaceNormals();
	geometry.computeVertexNormals();
	return geometry;
}