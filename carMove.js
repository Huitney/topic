import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import {car, keyboard, obstacles, RCmesh, carParameter} from "https://raw.githack.com/Huitney/topic/master/init.js";
import {PDControl} from "https://raw.githack.com/Huitney/topic/master/func.js";

var parkingMode = 0, parkingAngle = 0, PPart = 0;
var parkingModeButton = false, pickedWheel = false;
var pickedGas = false, pickedBrake = false;

export function parking(){
	//parkingMode 0 manual 1 auto parking 2 stop parking      
	//PPart 0 turn right 1 change direction 2 turn left
    if(parkingMode == 1 && parkingModeButton == false){            //auto parking Mode 1
		if(PPart == 0){             //change direction
			car.theta -= 0.02;
			car.theta = Math.clamp (car.theta, -Math.PI/7, Math.PI/7);
			if(car.theta == -Math.PI/7){
				PPart = 1;
			}
		}
		if(PPart == 1){             //turn right
			car.speed -= 1;
			car.speed = Math.clamp (car.speed, -15, 50);
			car.theta -= 0.02;
			car.theta = Math.clamp (car.theta, -Math.PI/7, Math.PI/7);
			if(car.angle >= Math.PI /4 + parkingAngle){
				PPart = 2;
			}
		}
		if(PPart == 2){             //change direction
			car.speed = 0;
			car.theta += 0.02;
			car.theta = Math.clamp (car.theta, -Math.PI/7, Math.PI/7);
			if(car.theta == Math.PI/7){
				PPart = 3;
			}
		}
		if(PPart == 3){             //turn left
			car.speed -= 1;
			car.speed = Math.clamp (car.speed, -15, 50);
			car.theta += 0.02;
			car.theta = Math.clamp (car.theta, -Math.PI/7, Math.PI/7);
			if(car.angle <= parkingAngle){
				car.speed = 0;
				parkingMode = 0;
			}
		}
    }else if(parkingMode == 1 && parkingModeButton == true){            //auto parking Mode 2
		if(PPart == 0){             //change direction
			car.theta -= 0.02;
			car.theta = Math.clamp (car.theta, -Math.PI/7, Math.PI/7);
			if(car.theta == -Math.PI/7){
				PPart = 1;
			}
		}
		if(PPart == 1){             //turn right
			car.speed -= 1;
			car.speed = Math.clamp (car.speed, -15, 50);
			car.theta -= 0.02;
			car.theta = Math.clamp (car.theta, -Math.PI/7, Math.PI/7);
			if(car.angle >= Math.PI /4 + parkingAngle){
				PPart = 2;
			}
		}
		if(PPart == 2){             //change direction
			car.speed = 0;
			car.theta += 0.02;
			car.theta = Math.clamp (car.theta, -Math.PI/7, Math.PI/7);
			if(car.theta >= 0){
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
			car.theta += 0.02;
			car.theta = Math.clamp (car.theta, -Math.PI/7, Math.PI/7);
			if(car.theta == Math.PI/7){
				PPart = 5;
			}
		}
		if(PPart == 5){             //turn left
			car.speed -= 1;
			car.speed = Math.clamp (car.speed, -15, 50);
			car.theta += 0.02;
			car.theta = Math.clamp (car.theta, -Math.PI/7, Math.PI/7);
			if(car.angle <= 0 + parkingAngle){
				car.speed = 0;
				PPart = 6;
			}
		}
		if(PPart == 6){             //change direction
			car.speed = 0;
			car.theta -= 0.02;
			car.theta = Math.clamp (car.theta, -Math.PI/7, Math.PI/7);
			if(car.theta <= 0){
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
		if((PPart == 7 & parkingModeButton === true) | (PPart == 3 & parkingModeButton === false)){
			PPart = 0;
			car.dashboard.gearFrame.position.z = -3.08;//P
			car.gear = 'p';
		}
	}
}

export function keyboardAndRC(fSlowDown, bSlowDown, deltaT){
	//gas and brake icon
	car.dashboard.brakeIcon.material.color.set('dimgrey');
	car.dashboard.gasIcon.material.color.set('dimgrey');
	car.brakeLightR.material.color.set('darkred');
	car.brakeLightL.material.color.set('darkred');
	if(car.gear === 'r'){
		car.backUpLightR.material.color.set('white');
		car.backUpLightL.material.color.set('white');
	}else{
		car.backUpLightR.material.color.set('darkgray');
		car.backUpLightL.material.color.set('darkgray');
	}
	
	if(pickedGas){
		car.dashboard.gasIcon.material.color.set('springgreen');
	}
	if(pickedBrake){
		car.dashboard.brakeIcon.material.color.set('red');
	}
	
	if (keyboard.pressed('down')){
		car.speed -= 1;
		car.dashboard.brakeIcon.material.color.set('red');
		car.dashboard.gearFrame.position.z = -2.93;//R
		car.gear = 'r';
	}
	if (keyboard.pressed('up')){
		car.speed += 1;
		car.dashboard.gasIcon.material.color.set('springgreen');
		car.dashboard.gearFrame.position.z = -2.63;//D
		car.gear = 'd';
	}
	car.speed = Math.clamp (car.speed, -15, 50);

	
    if (keyboard.pressed('right')){
		car.theta -= 0.002;
	}
    if (keyboard.pressed('left')){
		car.theta += 0.002;  
	}
	if(!keyboard.pressed('left') & !keyboard.pressed('right') & parkingMode !== 1 & !pickedWheel){
		PDControl(deltaT);
		if(car.theta.toFixed(5) == 0.00000)
			car.theta = 0.00001;
	}
    car.theta = Math.clamp (car.theta, -Math.PI/7, Math.PI/7);
	
	let axelLength = carParameter[carParameter.map(x =>x.name).indexOf('axelLength')].value
	, frontWheelToBackWheel = carParameter[carParameter.map(x =>x.name).indexOf('frontWheelToBackWheel')].value;
	
	car.leftfrontWheel.rotation.y = Math.atan(frontWheelToBackWheel/(frontWheelToBackWheel/Math.tan(car.theta)-axelLength/2));
    car.rightfrontWheel.rotation.y = Math.atan(frontWheelToBackWheel/(frontWheelToBackWheel/Math.tan(car.theta)+axelLength/2));

    //////////////////////////////////////////////////////////////
    
    let RC = car.mesh.localToWorld (new THREE.Vector3(-frontWheelToBackWheel/2,0,-frontWheelToBackWheel/Math.tan(car.theta)));
    RCmesh.position.copy (RC);
	//console.log(RC);
	
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
		if(car.gear === 'r' & car.speed > -2){ //R
			car.speed -= 0.1;
			if(car.speed.toFixed(1) == -2.0)
				car.speed = -2;
		} 
		else if(car.gear === 'r' & car.speed < -2){ //R
			car.speed += 0.1;
			if(car.speed.toFixed(1) == -2.0)
				car.speed = -2;
		}
		else if(car.gear === 'd' & car.speed > 2){//D
			car.speed -= 0.1;
			if(car.speed.toFixed(1) == 2.0)
				car.speed = 2;
		}
		else if(car.gear === 'd' & car.speed < 2){//D
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
		if(car.gear === 'r'){
			car.speed -= 1;
		}else if(car.gear === 'd'){
			car.speed += 1;
		}
		car.dashboard.gasIcon.material.color.set('springgreen');
		car.speed = Math.clamp (car.speed, -15, 50);
	}
	else if (keyboard.pressed('down') | keyboard.pressed('up') | parkingMode == 1){
		bSlowDown = 0;
	}
	else if(car.gear === 'r'){///R
		if(car.speed > -2)
			car.speed -= 1;
		else if(car.speed < -2)
			car.speed += 1;
		car.speed = Math.clamp (car.speed, -15, 50);
	}
	else if(car.gear === 'd'){///D
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
		if(car.gear === 'r'){
			bSlowDown = 1;
		}else if(car.gear === 'd'){
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
		if(car.gear === 'd'){
			car.dashboard.gearFrame.position.z = -3.08;//P
			car.gear = 'p';
		}
		else if(car.gear === 'p'){
			car.dashboard.gearFrame.position.z = -2.93;//R
			car.gear = 'r';
		}
		else if(car.gear === 'r'){
			car.dashboard.gearFrame.position.z = -2.78;//N
			car.gear = 'n';
		}
		else if(car.gear === 'n'){
			car.dashboard.gearFrame.position.z = -2.63;//D
			car.gear = 'd';
		}
	}
	
	//car speed pointer
	car.dashboard.pointer.rotation.x = Math.abs(car.speed*0.042);
	
	return [fSlowDown, bSlowDown, RC];
}

export function moveCar(RC, omega, deltaT){
	
	// C is the center of car body
    let C = car.mesh.position.clone();
    var vv = C.clone().sub(RC).applyAxisAngle (new THREE.Vector3(0,1,0), omega*deltaT).add(RC);
	
	car.move(vv);
	car.rotate(car.angle + omega*deltaT);
	car.changeColor(false);
	for(var i = 0;i < obstacles.length;i++){
		if(car.intersect(obstacles[i])){    //intersect
			car.move(C);
			car.rotate(car.angle - omega*deltaT);
			car.changeColor(true);
			break;
		}
	}
		
	
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

export function changeParkingMode(mode){
	parkingMode = mode;
}

export function controllParkingMode(){
	parkingMode++;
	parkingMode %= 3;
	if(parkingMode === 2){
		car.dashboard.gearFrame.position.z = -3.08;//P
		car.gear = 'p';
	}
}

export function changeParkingModeButton(mode){
	parkingModeButton = mode;
}

export function storeParkingAngle(){
	parkingAngle = car.angle;
}

export function changePickedGas(mode){
	pickedGas = mode;
}

export function changePickedBrake(mode){
	pickedBrake = mode;
}

export function changePickedWheel(mode){
	pickedWheel = mode;
}

