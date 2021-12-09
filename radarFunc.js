import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import {car, obstacles, radarSound, longBeep, buildingNodes} from "https://raw.githack.com/Huitney/topic/master/init.js";
import {inOut} from "https://raw.githack.com/Huitney/topic/master/collisionBuilding.js";

var beeper = false, radarOn = false;
let min = [];

export function poll(){
	if(car.gear === 'p' | car.gear === 'n'){
		car.dashboard.frontRightAlert.visible = false;
		car.dashboard.frontLeftAlert.visible = false;
		car.dashboard.backLeftAlert.visible = false;
		car.dashboard.backRightAlert.visible = false;
		car.dashboard.backAlert.visible = false;
		car.dashboard.frontAlert.visible = false;
		return;
	}
	
	for(let i = 0;i < obstacles.length;i++){
		let tmp = car.calculateCloseDistance(obstacles[i]);
		if(i == 0){
			min = tmp;
		} 
		else{
			min[0] = min[0].dis < tmp[0].dis ? min[0] : tmp[0];
			min[1] = min[1].dis < tmp[1].dis ? min[1] : tmp[1];
			min[2] = min[2].dis < tmp[2].dis ? min[2] : tmp[2];
			min[3] = min[3].dis < tmp[3].dis ? min[3] : tmp[3];
			min[4] = min[4].dis < tmp[4].dis ? min[4] : tmp[4];
			min[5] = min[5].dis < tmp[5].dis ? min[5] : tmp[5];
		} 
	}
	
	for(var i = 0;i < buildingNodes.length;i++){
		let xz = car.mesh.localToWorld(new THREE.Vector3(car.size[0], 0, car.size[2]));
		let xnz = car.mesh.localToWorld(new THREE.Vector3(car.size[0], 0, -car.size[2]));
		let nxnz = car.mesh.localToWorld(new THREE.Vector3(-car.size[0], 0, -car.size[2]));
		let nxz = car.mesh.localToWorld(new THREE.Vector3(-car.size[0], 0, car.size[2]));
		let nx = car.mesh.localToWorld(new THREE.Vector3(-car.size[0], 0, 0));
		let x = car.mesh.localToWorld(new THREE.Vector3(car.size[0], 0, 0));
				
		let tmp = [];
		tmp[0] = inOut(xz.x, xz.z, buildingNodes[i]);
		tmp[1] = inOut(xnz.x, xnz.z, buildingNodes[i]);
		tmp[2] = inOut(nxnz.x, nxnz.z, buildingNodes[i]);
		tmp[3] = inOut(nxz.x, nxz.z, buildingNodes[i]);
		tmp[4] = inOut(nx.x, nx.z, buildingNodes[i]);
		tmp[5] = inOut(x.x, x.z, buildingNodes[i]);
		
		min[0].dis = min[0].dis < tmp[0] ? min[0].dis : tmp[0];
		min[1].dis = min[1].dis < tmp[1] ? min[1].dis : tmp[1];
		min[2].dis = min[2].dis < tmp[2] ? min[2].dis : tmp[2];
		min[3].dis = min[3].dis < tmp[3] ? min[3].dis : tmp[3];
		min[4].dis = min[4].dis < tmp[4] ? min[4].dis : tmp[4];
		min[5].dis = min[5].dis < tmp[5] ? min[5].dis : tmp[5];
	}
	
	//call alert
	if(min[0].dis < 20) setTimeout(rightFrontSensor, min[0].dis * 40, min[0].dis);
	else car.dashboard.frontRightAlert.visible = false;
	if(min[1].dis < 20) setTimeout(leftFrontSensor, min[1].dis * 40, min[1].dis);
	else car.dashboard.frontLeftAlert.visible = false;
	if(min[2].dis < 20) setTimeout(leftBackSensor, min[2].dis * 40, min[2].dis);
	else car.dashboard.backLeftAlert.visible = false;
	if(min[3].dis < 20) setTimeout(rightBackSensor, min[3].dis * 40, min[3].dis);
	else car.dashboard.backRightAlert.visible = false;
	if(min[4].dis < 20) setTimeout(backSensor, min[4].dis * 40, min[4].dis);
	else car.dashboard.backAlert.visible = false;
	if(min[5].dis < 20) setTimeout(frontSensor, min[5].dis * 40, min[5].dis);
	else car.dashboard.frontAlert.visible = false;
	
	
	min = min.sort(function (a, b) {
		return a.dis > b.dis ? 1 : -1;
	});
	
	car.minDis = min[0].dis;
	
	if(min[0].dis < 20){
		beeper = true;
		longBeep.loop = true;
		if (radarOn === false) 
			setTimeout(radarPlay,0);
	}
	else {
		beeper = false;
		longBeep.loop = false;
		radarAlert.ticker = false;
	}
	
}

function radarPlay(){
	
	if(car.minDis < 3 & (car.gear !== 'p' | car.gear !== 'n')){
		longBeep.play();
		radarSound.pause();
		radarAlert.ticker = false;
	}else if(car.gear !== 'p' | car.gear !== 'n'){
		radarSound.play();
		longBeep.pause();
	}
	
	//dirAlert
	//radarAlert(min);
	
	if (beeper) {
		setTimeout (radarPlay, car.minDis * 40);
		radarOn = true;
	} else {
		radarOn = false
	}
}

function radarAlert(min){
	car.dashboard.backAlert.visible = false;
	car.dashboard.frontAlert.visible = false;
	car.dashboard.backLeftAlert.visible = false;
	car.dashboard.backRightAlert.visible = false;
	car.dashboard.frontRightAlert.visible = false;
	car.dashboard.frontLeftAlert.visible = false;
	
	radarAlert.ticker = (radarAlert.ticker === undefined) ? true : radarAlert.ticker;
	radarAlert.ticker = !radarAlert.ticker;
		
	for(let i = 0;i < 6;i++){
		if(min[i].dis < 20 & radarAlert.ticker){
			switch (min[i].dir) {
				case 'xz':
					car.dashboard.frontRightAlert.visible = true;
					break;
				case '-xz':
					car.dashboard.backRightAlert.visible = true;
					break;
				case 'x-z':
					car.dashboard.frontLeftAlert.visible = true;
					break;
				case '-x-z':
					car.dashboard.backLeftAlert.visible = true;
					break;
				case '-x':
					car.dashboard.backAlert.visible = true;
					break;
				case 'x':
					car.dashboard.frontAlert.visible = true;
					break;
				default:
					break;
			}
		}
	}
}

function rightFrontSensor(dis){
	rightFrontSensor.ticker = (rightFrontSensor.ticker === undefined) ? true : rightFrontSensor.ticker;
	rightFrontSensor.ticker = !rightFrontSensor.ticker;
	
	if(dis < 3)
		car.dashboard.frontRightAlert.visible = true;
	else if(dis < 20 & rightFrontSensor.ticker)
		car.dashboard.frontRightAlert.visible = true;
	else
		car.dashboard.frontRightAlert.visible = false;
	
}

function leftFrontSensor(dis){
	leftFrontSensor.ticker = (leftFrontSensor.ticker === undefined) ? true : leftFrontSensor.ticker;
	leftFrontSensor.ticker = !leftFrontSensor.ticker;
	
	if(dis < 3)
		car.dashboard.frontLeftAlert.visible = true;
	else if(dis < 20 & leftFrontSensor.ticker)
		car.dashboard.frontLeftAlert.visible = true;
	else
		car.dashboard.frontLeftAlert.visible = false;
	
}

function leftBackSensor(dis){
	leftBackSensor.ticker = (leftBackSensor.ticker === undefined) ? true : leftBackSensor.ticker;
	leftBackSensor.ticker = !leftBackSensor.ticker;
	
	if(dis < 3)
		car.dashboard.backLeftAlert.visible = true;
	else if(dis < 20 & leftBackSensor.ticker)
		car.dashboard.backLeftAlert.visible = true;
	else
		car.dashboard.backLeftAlert.visible = false;
	
}

function rightBackSensor(dis){
	rightBackSensor.ticker = (rightBackSensor.ticker === undefined) ? true : rightBackSensor.ticker;
	rightBackSensor.ticker = !rightBackSensor.ticker;
	
	if(dis < 3)
		car.dashboard.backRightAlert.visible = true;
	else if(dis < 20 & rightBackSensor.ticker)
		car.dashboard.backRightAlert.visible = true;
	else
		car.dashboard.backRightAlert.visible = false;
	
}

function backSensor(dis){
	backSensor.ticker = (backSensor.ticker === undefined) ? true : backSensor.ticker;
	backSensor.ticker = !backSensor.ticker;
	
	if(dis < 3)
		car.dashboard.backAlert.visible = true;
	else if(dis < 20 & backSensor.ticker)
		car.dashboard.backAlert.visible = true;
	else
		car.dashboard.backAlert.visible = false;
	
}

function frontSensor(dis){
	frontSensor.ticker = (frontSensor.ticker === undefined) ? true : frontSensor.ticker;
	frontSensor.ticker = !frontSensor.ticker;
	
	if(dis < 3)
		car.dashboard.frontAlert.visible = true;
	else if(dis < 20 & frontSensor.ticker)
		car.dashboard.frontAlert.visible = true;
	else
		car.dashboard.frontAlert.visible = false;
	
}