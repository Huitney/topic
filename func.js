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
			car.speed = Math.clamp (car.speed, -15, 50);
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
			car.speed = Math.clamp (car.speed, -15, 50);
			theta += 0.02;
			theta = Math.clamp (theta, -Math.PI/7, Math.PI/7);
			if(car.angle <= parkingAngle){
				car.speed = 0;
				parkingMode = 0;
				console.log(car.center);
			}
		}
    }else if(parkingMode == 1 && parkingModeButton == true){            //auto parking Mode 2
		if(PPart == 0){             //turn right
			car.speed -= 1;
			car.speed = Math.clamp (car.speed, -15, 50);
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
			car.speed = Math.clamp (car.speed, -15, 50);
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
			car.speed = Math.clamp (car.speed, -15, 50);
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
			car.speed = Math.clamp (car.speed, -15, 50);
			if(car.mesh.position.x >= 0){
				car.speed = 0;
				parkingMode = 0;
			}
		}
    }else if(parkingMode === 2){     //stop parking
		car.speed = 0;
	}else {                          //manual
		PPart = 0;
	}
	
	return theta;
}

function keyboardAndRC(theta, fSlowDown, bSlowDown){
		
	if (keyboard.pressed('down')){
		car.speed -= 1;
	}
	if (keyboard.pressed('up')){
		car.speed += 1;
	}
	car.speed = Math.clamp (car.speed, -15, 50);
  
    if (keyboard.pressed('right'))
		theta -= 0.01;
    if (keyboard.pressed('left'))
		theta += 0.01;  
	if(!keyboard.pressed('left') & !keyboard.pressed('right') & parkingMode !== 1){
		if(theta < 0) theta += 0.01;
		else if(theta > 0) theta -= 0.01;
	}
    theta = Math.clamp (theta, -Math.PI/7, Math.PI/7);
	
	car.leftfrontWheel.rotation.y = Math.atan(26/(26/Math.tan(theta)-8));
    car.rightfrontWheel.rotation.y = Math.atan(26/(26/Math.tan(theta)+8));

    //////////////////////////////////////////////////////////////
    
    RC = car.mesh.localToWorld (new THREE.Vector3(-13,0,-26/Math.tan(theta)));
    RCmesh.position.copy (RC);
	
	//////////////////////////////////////////////////////////////
    // slowing down    after keyboard up
    if (keyboard.up("up")) 
		fSlowDown = 1; 
    else if (keyboard.up("down"))	
		bSlowDown = 1;
       
    if (keyboard.down("up") ||  keyboard.down("down"))
		fSlowDown = bSlowDown = 0;
      
    if (fSlowDown == 1) {
		if(car.speed > 0) {  // moving forward --> slow down gradually
			car.speed -= 1;
		} else if (car.speed <= 0) {  // moving backward --> stop immediately
			car.speed = 0;
			fSlowDown = 0;
		}
    } else if (bSlowDown == 1) {
		if(car.speed < 0) {
			car.speed += 1;
		} else if (car.speed >= 0) {
			car.speed = 0;
			bSlowDown = 0;
		}
    }
	
	///d-drive

	if (keyboard.down("enter")){     //parkingBT
		if(parkingMode !== 1){
			parkingMode = 1;
			parkingAngle = car.angle;
			car.dashboard.autoBT.visible = true;
			car.dashboard.manuBT.visible = false;
		}else {   //stop
			parkingMode = 2;
		}
	}
	
	if (keyboard.pressed("space")){ //accelerator
		if(car.dashboard.gearFrame.position.z == -0.13){
			car.speed -= 1;
		}else if(car.dashboard.gearFrame.position.z == 0.17){
			car.speed += 1;
		}
		car.dashboard.accelerator.position.x = 0.2;
		car.dashboard.accelerator.position.y = -0.1;
		car.speed = Math.clamp (car.speed, -15, 50);
	}
	else if (keyboard.pressed('down') | keyboard.pressed('up') | parkingMode == 1){
		bSlowDown = 0;
	}
	else if(car.dashboard.gearFrame.position.z == -0.13){///R
		if(car.speed > -2)
			car.speed -= 1;
		else if(car.speed < -2)
			car.speed += 1;
		car.speed = Math.clamp (car.speed, -15, 50);
	}
	else if(parkingMode !== 1){
		bSlowDown = 1;
	}
	
	if(keyboard.up("space")){
		if(car.dashboard.gearFrame.position.z == -0.13){
			bSlowDown = 1;
		}else if(car.dashboard.gearFrame.position.z == 0.17){
			fSlowDown = 1;
		}
		car.dashboard.accelerator.position.x = 0;
		car.dashboard.accelerator.position.y = 0;
	}
	
	if (keyboard.pressed("alt")){     //brakes
		car.speed = 0;
		car.dashboard.brakes.position.x = 0.2;
		car.dashboard.brakes.position.y = -0.1;
		car.dashboard.brakes.name = 'dDrive';
	}
	else if(keyboard.up("alt")){
		car.dashboard.brakes.position.x = 0;
		car.dashboard.brakes.position.y = 0;
		car.dashboard.brakes.name = 'brakes';
	}
	
	if (keyboard.down("shift")){ //gear
		if(car.dashboard.gearFrame.position.z == 0.17)
			car.dashboard.gearFrame.position.z = -0.28;//P
		else if(car.dashboard.gearFrame.position.z == -0.28)
			car.dashboard.gearFrame.position.z = -0.13;//R
		else if(car.dashboard.gearFrame.position.z == -0.13)
			car.dashboard.gearFrame.position.z = 0.02;//N
		else if(car.dashboard.gearFrame.position.z == 0.02)
			car.dashboard.gearFrame.position.z = 0.17;//D
	}
	
	
	return [theta, fSlowDown, bSlowDown];
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
		car.dashboard.steeringWheel.rotation.z = theta * -20;
		
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

setInterval (poll, 200);

function poll(){
	
	let min = [];
	for(let i = 0;i < obstacles.length;i++){
		let tmp = car.calculateCloseDistance(obstacles[i]);
		console.log(tmp[1]);
		if(i == 0){
			min[0] = tmp[0];
			min[1] = tmp[1];
		} 
		else if(min[0] > tmp[0]){
			min[0] = tmp[0];
			min[1] = tmp[1];
		} 
	}
	car.minDis = min[0];
	
	//wave
	car.dashboard.wave.rotation.z = min[1].z*Math.PI/2;
	car.dashboard.wave.rotation.x = min[1].x*Math.PI/2;
	
	if(min[0] < 20){
		beeper = true;
		car.dashboard.wave.visible = true;
		if (radarOn === false) 
			setTimeout(radarPlay,0);
	}
	else {
		beeper = false;
		car.dashboard.wave.visible = false;
	}
	
}

function radarPlay(){
	
	radarSound.play();
	if (beeper) {
		setTimeout (radarPlay, car.minDis * 70);
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