import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import {car, obstacles, radarSound, longBeep} from "./init.js";

var beeper = false, radarOn = false;

export function poll(){
	
	let min = [];
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
	
	//dirAlert
	radarAlert(min);
	
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
	}
	
}

function radarPlay(){
	
	if(car.minDis < 3){
		longBeep.play();
		radarSound.pause();
	}else {
		radarSound.play();
		longBeep.pause();
	}
	
	if (beeper) {
		setTimeout (radarPlay, car.minDis * 40);
		radarOn = true;
	} else {
		radarOn = false
	}
}

function radarAlert(min){
	car.dashboard.backAlert.visible = car.dashboard.backAlert2.visible = false;
	car.dashboard.frontAlert.visible = car.dashboard.frontAlert2.visible = false;
	car.dashboard.backLeftAlert.visible = car.dashboard.backLeftAlert2.visible = false;
	car.dashboard.backRightAlert.visible = car.dashboard.backRightAlert2.visible = false;
	car.dashboard.frontRightAlert.visible = car.dashboard.frontRightAlert2.visible = false;
	car.dashboard.frontLeftAlert.visible = car.dashboard.frontLeftAlert2.visible = false;
	
	if(min[0].dis < 20){
		car.dashboard.frontRightAlert.visible = true;
		if(min[0].dis < 10){
			car.dashboard.frontRightAlert2.visible = true;
		}
	}
	if(min[1].dis < 20){
		car.dashboard.frontLeftAlert.visible = true;
		if(min[1].dis < 10){
			car.dashboard.frontLeftAlert2.visible = true;
		}
	}
	if(min[2].dis < 20){
		car.dashboard.backLeftAlert.visible = true;
		console.log(min[2].dis)
		if(min[2].dis < 10){
			car.dashboard.backLeftAlert2.visible = true;
		}
	}
	if(min[3].dis < 20){
		car.dashboard.backRightAlert.visible = true;
		if(min[3].dis < 10){
			car.dashboard.backRightAlert2.visible = true;
		}
	}
	if(min[4].dis < 20){
		car.dashboard.backAlert.visible = true;
		if(min[4].dis < 10){
			car.dashboard.backAlert2.visible = true;
		}
	}
	if(min[5].dis < 20){
		car.dashboard.frontAlert.visible = true;
		if(min[5].dis < 10){
			car.dashboard.frontAlert2.visible = true;
		}
	}
}