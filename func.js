import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import {car, camera, reversingCamera, keyboard} from "./init.js";
import {bushes, bushes1, bushes2, bushes3} from "./buildScenes.js"

var thirdPV = false, firstPV = false;

//button
$("#thirdPV").click(function() {
	thirdPV = !thirdPV;
	if(thirdPV)
		firstPV = false;
});

$("#firstPV").click(function() {
	firstPV = !firstPV;
	if(firstPV)
		thirdPV = false;
});

export function cameraUpdate(fSlowDown, bSlowDown){
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
		car.dashboard.steeringWheel.rotation.z = car.theta * -21;
		
		if (keyboard.pressed('down')){
			car.gear = 'r';
		}
		else if(keyboard.pressed('up')){
			car.gear = 'd';
		}
    }
    else {
		camera.position.set(-300, 200, 0); // fixed camera, no orbitControl!
		camera.lookAt(new THREE.Vector3(0, 0, 0));
    }
}

export function PDControl(dt){
	var KP = 50;
	var KD = 15;
	PDControl.vv = (PDControl.vv === undefined) ? 0 : PDControl.vv;
	
	var f = KP*(-car.theta) - KD*PDControl.vv;

	// plant dynamics 
	PDControl.vv += f*dt;
	car.theta += PDControl.vv*dt
}

export function treesLootAt(){
	let cameraRoot = camera.position.clone();
	cameraRoot.y =camera.position.y;

	bushes.forEach (function(b) {b.lookAt (cameraRoot)})
	bushes1.forEach (function(b) {b.lookAt (cameraRoot)})
	bushes2.forEach (function(b) {b.lookAt (cameraRoot)})
	bushes3.forEach (function(b) {b.lookAt (cameraRoot)})
}

export function treesVisible(canSee){

	bushes.forEach (function(b) {b.visible = canSee})
	bushes1.forEach (function(b) {b.visible = canSee})
	bushes2.forEach (function(b) {b.visible = canSee})
	bushes3.forEach (function(b) {b.visible = canSee})
}

export {firstPV};