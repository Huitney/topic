function parking(theta){
	//parkingMode 0 manual 1 auto parking 2 stop parking      
	//PPart 0 turn right 1 change direction 2 turn left
    if(parkingMode == 1 && parkingModeButton == false){            //auto parking Mode 1
		if(PPart == 0){             //change direction
			theta -= 0.02;
			theta = Math.clamp (theta, -Math.PI/7, Math.PI/7);
			if(theta == -Math.PI/7){
				PPart = 1;
			}
		}
		if(PPart == 1){             //turn right
			car.speed -= 1;
			car.speed = Math.clamp (car.speed, -50, 50);
			theta -= 0.02;
			theta = Math.clamp (theta, -Math.PI/7, Math.PI/7);
			if(car.angle >= Math.PI /4 + parkingAngle){
				PPart = 2;
			}
		}
		if(PPart == 2){             //change direction
			car.speed = 0;
			theta += 0.02;
			theta = Math.clamp (theta, -Math.PI/7, Math.PI/7);
			if(this.theta == Math.PI/7){
				PPart = 3;
			}
		}
		if(PPart == 3){             //turn left
			car.speed -= 1;
			car.speed = Math.clamp (car.speed, -50, 50);
			theta += 0.02;
			theta = Math.clamp (theta, -Math.PI/7, Math.PI/7);
			if(car.angle <= parkingAngle){
				car.speed = 0;
			}
		}
    }else if(parkingMode == 1 && parkingModeButton == true){            //auto parking Mode 2
		if(PPart == 0){             //turn right
			car.speed -= 1;
			car.speed = Math.clamp (car.speed, -50, 50);
			theta -= 0.02;
			theta = Math.clamp (theta, -Math.PI/7, Math.PI/7);
			if(car.angle >= Math.PI /4 + parkingAngle){
				PPart = 1;
			}
		}
		if(PPart == 1){             //change direction
			car.speed = 0;
			theta += 0.02;
			theta = Math.clamp (theta, -Math.PI/7, Math.PI/7);
			if(theta >= 0){
				PPart = 2;
			}
		}
		if(PPart == 2){             //go straight backward
			car.speed  -= 1;
			car.speed = Math.clamp (car.speed, -50, 50);
			if(car.mesh.position.z >= 45){
				car.speed = 0;
				PPart = 3;
			}
		}
		if(PPart == 3){             //change direction
			car.speed = 0;
			theta += 0.02;
			theta = Math.clamp (theta, -Math.PI/7, Math.PI/7);
			if(theta == Math.PI/7){
				PPart = 4;
			}
		}
		if(PPart == 4){             //turn left
			car.speed -= 1;
			car.speed = Math.clamp (car.speed, -50, 50);
			theta += 0.02;
			theta = Math.clamp (theta, -Math.PI/7, Math.PI/7);
			if(car.angle <= 0 + parkingAngle){
				car.speed = 0;
				PPart = 5;
			}
		}
		if(PPart == 5){             //change direction
			car.speed = 0;
			theta -= 0.02;
			theta = Math.clamp (theta, -Math.PI/7, Math.PI/7);
			if(theta <= 0){
				PPart = 6;
			}
		}
		if(PPart == 6){             //go straight forward
			car.speed  += 1;
			car.speed = Math.clamp (car.speed, -50, 50);
			if(car.mesh.position.x >= 0){
				car.speed = 0;
			}
		}
    }else if(parkingMode === 2){     //stop parking
		car.speed = 0;
	}else {                          //manual
		PPart = 0;
	}
	
	return theta;
}

function moveCar(RC, omega, deltaT){
	
	// C is the center of car body
    let C = car.mesh.position.clone();
    var vv = C.clone().sub(RC).applyAxisAngle (new THREE.Vector3(0,1,0), omega*deltaT).add(RC);
	
	car.move(vv);
	car.rotate(car.angle + omega*deltaT);
	$('#warning').text("no hit");
	car.changeColor(false);
	for(var i = 0;i < obstacles.length;i++){
		if(car.intersect(obstacles[i])){    //intersect
			car.move(C);
			car.rotate(car.angle - omega*deltaT);
			$('#warning').text("hit");
			car.changeColor(true);
			break;
		}
	}
	topCamera.position.x = car.center.x;
	topCamera.position.z = car.center.z;
}

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
		tmp = car.mesh.localToWorld(new THREE.Vector3(6, 10, 0));
		camera.lookAt(tmp);
		
		//rear mirror
		//let carEnd = car.mesh.localToWorld (new THREE.Vector3(-10, 0, 0));
		//rearMirror.lookAt(carEnd);
		//rearMirror.position.copy (car.mesh.localToWorld (new THREE.Vector3 (6,10,3)));
		
		car.dashboard.CCWBT.visible = car.dashboard.zoomInBT.visible = car.dashboard.zoomOutBT.visible = true;
		if(car.speed < 0){
			let carEnd = car.mesh.localToWorld (new THREE.Vector3 (-20,0,0));
			reversingCamera.position.copy (carEnd);
			carEnd = car.mesh.localToWorld (new THREE.Vector3(-30, -1, 0));
			reversingCamera.lookAt(carEnd);
			car.dashboard.CCWBT.visible = car.dashboard.zoomInBT.visible = car.dashboard.zoomOutBT.visible = false;
		}
		
		//dashboard
		car.dashboard.mesh.visible = true;
		car.dashboard.mesh.position.copy(tmp);
		car.dashboard.mesh.position.y -= 2;
		car.dashboard.mesh.rotation.y = car.angle;
		car.dashboard.steeringWheel.rotation.z = theta * -10;
		
		if (keyboard.pressed('down')){
			car.dashboard.accelerator.position.x = 0.2;
			car.dashboard.accelerator.position.y = -0.1;
			car.dashboard.gearFrame.position.y = 1.25;
			car.dashboard.P.visible = false;
			car.dashboard.R.visible = true;
		}
		else if(keyboard.pressed('up')){
			car.dashboard.accelerator.position.x = 0.2;
			car.dashboard.accelerator.position.y = -0.1;
			car.dashboard.gearFrame.position.y = 0.88;
			car.dashboard.P.visible = false;
			car.dashboard.D.visible = true;
		}
		if (keyboard.up("down") | keyboard.up("up")){
			car.dashboard.accelerator.position.x = 0;
			car.dashboard.accelerator.position.y = 0;
		}
		if(bSlowDown == 1 | fSlowDown == 1){
			car.dashboard.brakes.position.x = 0.2;
			car.dashboard.brakes.position.y = -0.1;
		}
		else{
			car.dashboard.brakes.position.x = 0;
			car.dashboard.brakes.position.y = 0;
		}
		if(car.speed == 0){
			car.dashboard.gearFrame.position.y = 1.45;
			car.dashboard.P.visible = true;
			car.dashboard.R.visible = car.dashboard.N.visible = car.dashboard.D.visible = false;
		}
    }
    else {
		camera.position.set(-200, 100, 0); // fixed camera, no orbitControl!
		camera.lookAt(new THREE.Vector3(0, 0, 0));
    }
}

setInterval (poll, 200);

function poll(){
	
	let min;
	for(let i = 0;i < obstacles.length;i++){
		let tmp = car.calculateCloseDistance(obstacles[i]);
		if(i == 0) min = tmp;
		else if(min > tmp) min = tmp;
	}
	car.minDis = min;
	
	if(min < 15){
		beeper = true;
		if (radarOn === false) 
			setTimeout(radarPlay,0);
	}
	else 
		beeper = false;
	
}

function radarPlay(){
	
	radarSound.play();
	if (beeper) {
		setTimeout (radarPlay, car.minDis * 100);
		radarOn = true;
	} else {
		radarOn = false
	}
}

function addObstacles(){
	if(alternateObs[0].mesh){
		obstacles.push(alternateObs[0]);
		console.log(alternateObs[0].mesh.position);
		alternateObs.shift();
	}
}

function onMouseDown (event) {
	//console.log ('in mouse down')
	event.preventDefault();  // may not be necessary
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

	// find intersections
	raycaster.setFromCamera(mouse, camera);
	var intersects = raycaster.intersectObjects(pickables, true);
	if (intersects.length > 0) {
		if(intersects[0].object.name == 'autoBT'){
			console.log('autoBT');
			autoBTClicked();
		}else if(intersects[0].object.name == 'CCWBT'){
			console.log('CCWBT');
			CCWBTClicked();
		}else if(intersects[0].object.name == 'zoomInBT'){
			console.log('zoomInBT');
			zoomInBTClicked();
		}else if(intersects[0].object.name == 'zoomOutBT'){
			console.log('zoomOutBT');
			zoomOutBTClicked();
		}
	}
}	

function autoBTClicked(){
	parkingMode++;
	if(parkingMode > 2) parkingMode = 0;
	
	if(parkingMode == 0){
		//$("#parking").text('auto parking');
	}
	else if(parkingMode == 1){
		//$("#parking").text('stop parking');
		parkingAngle = car.angle;
	}
	else{
		//$("#parking").text('manual');
	}
}

function CCWBTClicked(){
	CCW++;
	if(CCW % 4 == 1){
		topCamera.up.set(0, 0, -1);
		topCamera.lookAt(car.center);
	}
	else if(CCW % 4 == 2){
		topCamera.up.set(-1, 0, 0);
		topCamera.lookAt(car.center);
	}
	else if(CCW % 4 == 3){
		topCamera.up.set(0, 0, 1);
		topCamera.lookAt(car.center);
	}
	else if(CCW % 4 == 0){
		topCamera.up.set(1, 0, 0);
		topCamera.lookAt(car.center);
	}
}

function zoomInBTClicked(){
	topCamera.left += window.innerWidth/60;
	topCamera.right -= window.innerWidth/60;
	topCamera.top -= window.innerHeight/60;
	topCamera.bottom += window.innerHeight/60;
	topCamera.updateProjectionMatrix();
}

function zoomOutBTClicked(){
	topCamera.left -= window.innerWidth/60;
	topCamera.right += window.innerWidth/60;
	topCamera.top += window.innerHeight/60;
	topCamera.bottom -= window.innerHeight/60;
	topCamera.updateProjectionMatrix();
}