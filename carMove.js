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
			}
		}
    }else if(parkingMode == 1 && parkingModeButton == true){            //auto parking Mode 2
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
			if(theta >= 0){
				PPart = 3;
			}
		}
		if(PPart == 3){             //go straight backward
			car.speed  -= 1;
			car.speed = Math.clamp (car.speed, -15, 50);
			if(car.mesh.position.z >= 30){
				car.speed = 0;
				PPart = 4;
			}
		}
		if(PPart == 4){             //change direction
			car.speed = 0;
			theta += 0.02;
			theta = Math.clamp (theta, -Math.PI/7, Math.PI/7);
			if(theta == Math.PI/7){
				PPart = 5;
			}
		}
		if(PPart == 5){             //turn left
			car.speed -= 1;
			car.speed = Math.clamp (car.speed, -15, 50);
			theta += 0.02;
			theta = Math.clamp (theta, -Math.PI/7, Math.PI/7);
			if(car.angle <= 0 + parkingAngle){
				car.speed = 0;
				PPart = 6;
			}
		}
		if(PPart == 6){             //change direction
			car.speed = 0;
			theta -= 0.02;
			theta = Math.clamp (theta, -Math.PI/7, Math.PI/7);
			if(theta <= 0){
				PPart = 7;
			}
		}
		if(PPart == 7){             //go straight forward
			car.speed  += 1;
			car.speed = Math.clamp (car.speed, -15, 50);
			if(car.mesh.position.x >= -192){
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

function keyboardAndRC(theta, fSlowDown, bSlowDown, deltaT){
		
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
		theta = PDControl(theta, deltaT);
		if(theta.toFixed(5) == 0.00000)
			theta = 0.00001;
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