class Car {
	constructor(pos, size, colorName = 'white', materialArray) {
		this.center = pos;
		this.size = size; // array of halfwidth's
		this.mesh = new THREE.Mesh(new THREE.BoxGeometry(size[0] * 2, size[1] * 2, size[2] * 2), materialArray);
		this.mesh.position.x = pos.x;
		this.mesh.position.y = pos.y;
		this.mesh.position.z = pos.z;
		
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
			if (centerDis > dA + dB)
				return false;  // NOT intersect
			
			//console.log(centerDis, dA + dB);
		}
		return true;  // intersect
	}
	
	move(pos){
		this.mesh.position.x = pos.x;
		this.mesh.position.y = pos.y;
		this.mesh.position.z = pos.z;
	}
	
}

function buildCar() {
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
    let car = new Car(new THREE.Vector3(0, 0, 0), [19, 10, 10], 'red', materialArray);
	
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