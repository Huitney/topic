function cameraUpdate(theta, fSlowDown, bSlowDown){
	car.dashboard.mesh.visible = false;
    if (thirdPV) {
		let carEnd = car.mesh.localToWorld (new THREE.Vector3(-10,0,0));
		camera.lookAt (carEnd);
		camera.position.copy (car.mesh.localToWorld (new THREE.Vector3 (-50,30,0)));
    } 
    else if(firstPV){
		var tmp = car.mesh.localToWorld(new THREE.Vector3(1, 10, 0));
		camera.position.copy(tmp);
		tmp = car.mesh.localToWorld(new THREE.Vector3(6, 9.5, 0));
		camera.lookAt(tmp);
		
		if(car.speed < 0){
			let carEnd = car.mesh.localToWorld (new THREE.Vector3 (-19,0,0));
			reversingCamera.position.copy (carEnd);
			carEnd = car.mesh.localToWorld (new THREE.Vector3(-25, -1, 0));
			reversingCamera.lookAt(carEnd);
		}
		
		//dashboard
		car.dashboard.mesh.visible = true;
		car.dashboard.mesh.position.copy(tmp);
		car.dashboard.mesh.position.y -= 2;
		car.dashboard.mesh.rotation.y = car.angle;
		car.dashboard.mesh.rotation.z = -0.1;
		car.dashboard.steeringWheel.rotation.z = theta * -21;
		
		if (keyboard.pressed('down')){
			car.dashboard.accelerator.position.x = 0.2;
			car.dashboard.accelerator.position.y = -0.1;
			car.dashboard.gearFrame.position.z = -0.13;
		}
		else if(keyboard.pressed('up')){
			car.dashboard.accelerator.position.x = 0.2;
			car.dashboard.accelerator.position.y = -0.1;
			car.dashboard.gearFrame.position.z = 0.17;
		}
		if (keyboard.up("down") | keyboard.up("up")){
			car.dashboard.accelerator.position.x = 0;
			car.dashboard.accelerator.position.y = 0;
		}
		if(bSlowDown == 1 | fSlowDown == 1){
			car.dashboard.brakes.position.x = 0.2;
			car.dashboard.brakes.position.y = -0.1;
		}
		else if(car.dashboard.brakes.name != 'dDrive'){
			car.dashboard.brakes.position.x = 0;
			car.dashboard.brakes.position.y = 0;
		}
		if(car.speed == 0){
			//car.dashboard.gearFrame.position.z = -0.28;
		}
    }
    else {
		camera.position.set(-300, 200, 0); // fixed camera, no orbitControl!
		camera.lookAt(new THREE.Vector3(0, 0, 0));
    }
}

function addObstacles(){
	if(alternateObs[0].mesh){
		obstacles.push(alternateObs[0]);
		console.log(alternateObs[0].mesh.position);
		alternateObs.shift();
	}
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

function PDControl(theta, dt){
	var KP = 50;
	var KD = 15;
	this.vv = (this.vv === undefined) ? 0 : this.vv;
	
	var f = KP*(-theta) - KD*this.vv;

	// plant dynamics 
	this.vv += f*dt;
	theta += this.vv*dt
	
	return theta;
}