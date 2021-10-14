import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import {car, topCamera, thirdPVCamera, GPSCamera, keyboard, obstacles, RCmesh, carParameter} from "./init.js";
import {PDControl} from "./func.js";

var parkingMode = 0, parkingAngle = 0, PPart = 0;
var parkingModeButton = false;

export function parking(theta){
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

export function keyboardAndRC(theta, fSlowDown, bSlowDown, deltaT){
	//gas and brake icon
	car.dashboard.brakeIcon.material.color.set('dimgrey');
	car.dashboard.gasIcon.material.color.set('dimgrey');
	car.brakeLightR.material.color.set('darkred');
	car.brakeLightL.material.color.set('darkred');
	
	if (keyboard.pressed('down')){
		car.speed -= 1;
		car.dashboard.gasIcon.material.color.set('springgreen');
		car.dashboard.gearFrame.position.z = -0.13;//R
	}
	if (keyboard.pressed('up')){
		car.speed += 1;
		car.dashboard.gasIcon.material.color.set('springgreen');
		car.dashboard.gearFrame.position.z = 0.17;//D
	}
	car.speed = Math.clamp (car.speed, -15, 50);

	
    if (keyboard.pressed('right')){
		theta -= 0.002;
	}
    if (keyboard.pressed('left')){
		theta += 0.002;  
	}
	if(!keyboard.pressed('left') & !keyboard.pressed('right') & parkingMode !== 1){
		theta = PDControl(theta, deltaT);
		if(theta.toFixed(5) == 0.00000)
			theta = 0.00001;
	}
    theta = Math.clamp (theta, -Math.PI/7, Math.PI/7);
	
	let axelLength = carParameter[carParameter.map(x =>x.name).indexOf('axelLength')].value
	, frontWheelToBackWheel = carParameter[carParameter.map(x =>x.name).indexOf('frontWheelToBackWheel')].value;
	
	car.leftfrontWheel.rotation.y = Math.atan(frontWheelToBackWheel/(frontWheelToBackWheel/Math.tan(theta)-axelLength/2));
    car.rightfrontWheel.rotation.y = Math.atan(frontWheelToBackWheel/(frontWheelToBackWheel/Math.tan(theta)+axelLength/2));

    //////////////////////////////////////////////////////////////
    
    let RC = car.mesh.localToWorld (new THREE.Vector3(-frontWheelToBackWheel/2,0,-frontWheelToBackWheel/Math.tan(theta)));
    RCmesh.position.copy (RC);
	
	//////////////////////////////////////////////////////////////
    // slowing down    after keyboard up
    if (keyboard.up("up")){
		fSlowDown = 1; 
	}
    else if (keyboard.up("down")){
		bSlowDown = 1;
	}
       
    if (keyboard.down("up") ||  keyboard.down("down"))
		fSlowDown = bSlowDown = 0;
      
    if (fSlowDown == 1) {
		if(car.speed > 0) {  // moving forward --> slow down gradually
			car.speed -= 0.1;
		} else if (car.speed <= 0) {  // moving backward --> stop immediately
			car.speed = 0;
			fSlowDown = 0;
		}
    } else if (bSlowDown == 1) {
		if(car.speed < 0) {
			car.speed += 0.1;
		} else if (car.speed >= 0) {
			car.speed = 0;
			bSlowDown = 0;
		}
    } else if(!keyboard.pressed("up") & !keyboard.pressed("down") & !keyboard.pressed("space") & !keyboard.pressed("alt") & !keyboard.pressed("ctrl")){
		if(car.dashboard.gearFrame.position.z == -0.13 & car.speed > -2){ //R
			car.speed -= 0.1;
			if(car.speed.toFixed(1) == -2.0)
				car.speed = -2;
		} 
		else if(car.dashboard.gearFrame.position.z == -0.13 & car.speed < -2){ //R
			car.speed += 0.1;
			if(car.speed.toFixed(1) == -2.0)
				car.speed = -2;
		}
		else if(car.dashboard.gearFrame.position.z == 0.17 & car.speed > 2){//D
			car.speed -= 0.1;
			if(car.speed.toFixed(1) == 2.0)
				car.speed = 2;
		}
		else if(car.dashboard.gearFrame.position.z == 0.17 & car.speed < 2){//D
			car.speed += 0.1;
			if(car.speed.toFixed(1) == 2.0)
				car.speed = 2;
		}
		car.speed = Math.clamp (car.speed, -15, 50);
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
		car.dashboard.gasIcon.material.color.set('springgreen');
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
	else if(car.dashboard.gearFrame.position.z == 0.17){///D
		if(car.speed > 2)
			car.speed -= 1;
		else if(car.speed < 2)
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
		car.dashboard.gasIcon.material.color.set('dimgrey');
	}
	
	if (keyboard.pressed("alt")){     //brakes
		car.speed = 0;
		car.dashboard.brakeIcon.material.color.set('red');
		car.dashboard.gasIcon.material.color.set('dimgrey');
		car.brakeLightR.material.color.set('red');
		car.brakeLightL.material.color.set('red');
	}
	
	if(keyboard.pressed("ctrl")){    //slower brakes
		if (car.speed < 0)
			car.speed += 1.3;
		else if (car.speed > 0)
			car.speed -= 1.3;
		car.dashboard.brakeIcon.material.color.set('red');
		car.dashboard.gasIcon.material.color.set('dimgrey');
		car.brakeLightR.material.color.set('red');
		car.brakeLightL.material.color.set('red');
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
	
	//car speed pointer
	car.dashboard.pointer.rotation.x = Math.abs(car.speed*0.042);
	
	return [theta, fSlowDown, bSlowDown, RC];
}

export function moveCar(RC, omega, deltaT){
	
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
	topCamera.lookAt(car.center);
	thirdPVCamera.lookAt (car.mesh.localToWorld (new THREE.Vector3(30,0,0)));
	thirdPVCamera.position.copy (car.mesh.localToWorld (new THREE.Vector3 (-30,18,0)));
	GPSCamera.lookAt (car.mesh.localToWorld (new THREE.Vector3(50,0,0)));
	GPSCamera.position.copy (car.mesh.localToWorld (new THREE.Vector3 (-60,200,0)));
}

export function flashTurnSignal(){
	flashTurnSignal.ticker = (flashTurnSignal.ticker === undefined) ? true : flashTurnSignal.ticker;
	car.turnSignalR.material.color.set(0x998000);
	car.turnSignalL.material.color.set(0x998000);
	car.dashboard.turnSignalL.material.color.set('dimgrey');
	car.dashboard.turnSignalR.material.color.set('dimgrey');
	
	if(flashTurnSignal.ticker){
		if (keyboard.pressed('right')){
			car.dashboard.turnSignalR.material.color.set('springgreen');
			car.turnSignalR.material.color.set('gold');
		}
		else if (keyboard.pressed('left')){
			car.turnSignalL.material.color.set('gold');
			car.dashboard.turnSignalL.material.color.set('springgreen');
		}
	}
	flashTurnSignal.ticker =! flashTurnSignal.ticker;
	
	setTimeout(flashTurnSignal,300);
}

export {parkingMode, parkingAngle, parkingModeButton};