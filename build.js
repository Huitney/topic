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
  
    var carBodyGeometry = new THREE.BoxGeometry(38, 20, 20);
    var carBodyMaterial = new THREE.MeshBasicMaterial({color: 0x0000ff});
    let body = new THREE.Mesh(carBodyGeometry, materialArray);
  
    let wheelGeometry = new THREE.CylinderGeometry(5, 5, 2, 32, 1, true);
    let wheelMaterial = new THREE.MeshBasicMaterial({color: 0x000000});
    let circle = new THREE.Mesh(new THREE.CircleGeometry(5, 32), 
    new THREE.MeshBasicMaterial({map: loader.load ('http://i.imgur.com/8enBd95.png'), 
								transparent: true, 
								side:THREE.DoubleSide}));
    circle.rotation.x = Math.PI/2;
    circle.position.y = 1;
    circle2 = circle.clone();
    circle2.position.y = -1;
  
    // assembly
    car = new THREE.Group();
    leftfrontWheel = new THREE.Group();
    rightfrontWheel = new THREE.Group();
    leftRearWheel = new THREE.Group();
    rightRearWheel = new THREE.Group();
  
    car.add(body, leftfrontWheel, rightfrontWheel, leftRearWheel, rightRearWheel);
	
    // wheels
    let mesh1 = new THREE.Mesh(wheelGeometry, wheelMaterial);
    leftfrontWheel.position.set(13, -8, -8);
    mesh1.add(circle);
    mesh1.add(circle2);
    leftfrontWheel.add(mesh1);
    //important!!
    mesh1.rotation.x = Math.PI/2;
  
    let mesh2 = mesh1.clone();;
    rightfrontWheel.position.set(13, -8, 8);
    rightfrontWheel.add(mesh2);
    
    let mesh3 = mesh1.clone();;
    leftRearWheel.position.set(-13, -8, -8);
    leftRearWheel.add(mesh3);
  
    let mesh4 = mesh1.clone();;
    rightRearWheel.position.set(-13, -8, 8);
    rightRearWheel.add(mesh4);
	
	car.leftfrontWheel = leftfrontWheel;
	car.rightfrontWheel = rightfrontWheel;
	car.leftRearWheel = leftRearWheel;
	car.rightRearWheel = rightRearWheel;
	
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

}