import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import {car, camera, reversingCamera, keyboard} from "./init.js";

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

export function cameraUpdate(theta, fSlowDown, bSlowDown){
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
			car.dashboard.gearFrame.position.z = -0.13;
		}
		else if(keyboard.pressed('up')){
			car.dashboard.gearFrame.position.z = 0.17;
		}
    }
    else {
		camera.position.set(-300, 200, 0); // fixed camera, no orbitControl!
		camera.lookAt(new THREE.Vector3(0, 0, 0));
    }
}

export function PDControl(theta, dt){
	var KP = 50;
	var KD = 15;
	PDControl.vv = (PDControl.vv === undefined) ? 0 : PDControl.vv;
	
	var f = KP*(-theta) - KD*PDControl.vv;

	// plant dynamics 
	PDControl.vv += f*dt;
	theta += PDControl.vv*dt
	
	return theta;
}

export {firstPV};