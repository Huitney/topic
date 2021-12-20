import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import {Line2} from 'https://raw.githack.com/mrdoob/three.js/dev/examples/jsm/lines/Line2.js';
import {LineMaterial} from 'https://raw.githack.com/mrdoob/three.js/dev/examples/jsm/lines/LineMaterial.js';
import {LineGeometry} from 'https://raw.githack.com/mrdoob/three.js/dev/examples/jsm/lines/LineGeometry.js';
import {car, camera, reversingCamera, keyboard, scene, sign, topCamera, thirdPVCamera, GPSCamera, obstacles, RCmesh, carParameter} from "https://raw.githack.com/Huitney/topic/master/init.js";
import {bushes, bushes1, bushes2, bushes3} from "https://raw.githack.com/Huitney/topic/master/buildScenes.js"
import {traceMeshes, traceMeshesBlue} from './buildThings.js';

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
			let carEnd = car.mesh.localToWorld (new THREE.Vector3 (-15,1,0));
			reversingCamera.position.copy (carEnd);
			carEnd = car.mesh.localToWorld (new THREE.Vector3(-20, -3, 0));
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
			car.dashboard.gearFrame.position.z = -2.93;//R
		}
		else if(keyboard.pressed('up')){
			car.gear = 'd';
			car.dashboard.gearFrame.position.z = -2.63;//D
		}
    }
    else {
		camera.position.set(-300, 200, 0); // fixed camera, no orbitControl!
		camera.lookAt(new THREE.Vector3(0, 0, 0));
    }
	topCamera.position.x = car.center.x;
	topCamera.position.z = car.center.z;
	topCamera.lookAt(car.center);
	thirdPVCamera.lookAt (car.mesh.localToWorld (new THREE.Vector3(30,0,0)));
	thirdPVCamera.position.copy (car.mesh.localToWorld (new THREE.Vector3 (-30,18,0)));
	GPSCamera.lookAt (car.mesh.localToWorld (new THREE.Vector3(50,0,0)));
	GPSCamera.position.copy (car.mesh.localToWorld (new THREE.Vector3 (-60,200,0)));
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

export function loadCubemap() {

	/*var path = "./pictures/Meadow/";
	var format = '.jpg';
  	var urls = [
    	path + 'posx' + format, path + 'negx' + format,
    	path + 'posy' + format, path + 'negy' + format,
    	path + 'posz' + format, path + 'negz' + format
  	];*/
	var urls = [
    	"https://i.imgur.com/k0C89rK.jpg", "https://i.imgur.com/fxNB9KL.jpg",
    	"https://i.imgur.com/Bwaz4mn.jpg", "https://i.imgur.com/uJyMINd.jpg",
    	"https://i.imgur.com/MVQ1xKl.jpg", "https://i.imgur.com/Cahat7o.jpg"
  	];
	
  	var loader = new THREE.CubeTextureLoader();
  	loader.setCrossOrigin ('');
  	var cubeMap = loader.load(urls);
  	cubeMap.format = THREE.RGBFormat;
  	return cubeMap;
  
}

export function reversingLine(RC){
		// compute icx based on steeringPhi
		//debugger;
		let icx = RC.x;
		let icz = RC.z;
	  	// RCmesh.position.x = icx;
		
		// rear bumpter center
		let rbc = car.mesh.localToWorld(new THREE.Vector3(-20, 0, 0));
		let rbr = car.mesh.localToWorld(new THREE.Vector3(-20, 0, 10));
		let rbl = car.mesh.localToWorld(new THREE.Vector3(-20, 0, -10));
		  
		  // compute R
	  
		let vvc = rbc.clone().sub(RC);
		let Rc = vvc.length();//Math.sqrt(n*n + icx*icx);
		let theta2c = Math.atan2(vvc.z, vvc.x);
	  
		let vvr = rbr.clone().sub(RC);
		let Rr = vvr.length();//Math.sqrt(n*n + icx*icx);
		let theta2r = Math.atan2(vvr.z, vvr.x);
	  
		let vvl = rbl.clone().sub(RC);
		let Rl = vvl.length();//Math.sqrt(n*n + icx*icx);
		let theta2l = Math.atan2(vvl.z, vvl.x);
	  
		  // compute delta_theta
		var HL = 30;  
		var delta_theta = HL/Rc;
	  
		scene.remove (scene.getObjectByName ('arcR'));
		scene.remove (scene.getObjectByName ('arcL'));
	  
		let arc;
	   
		if (sign < 0) {
			arc = makeCCWArc (Rr, theta2r-delta_theta, theta2r, [icx, icz],'yellow');
			arc.name = 'arcR';
			scene.add (arc);
			arc.visible = firstPV;
			arc = makeCCWArc (Rl, theta2l-delta_theta, theta2l, [icx, icz],'yellow');
			arc.name = 'arcL';
			scene.add (arc);
			arc.visible = firstPV;
			
		} else {
			arc = makeCCWArc (Rr, theta2r, theta2r+delta_theta, [icx, icz],'yellow');
			arc.name = 'arcR';
		
			scene.add (arc);
			arc.visible = firstPV;
			arc = makeCCWArc (Rl, theta2l, theta2l+delta_theta, [icx, icz],'yellow');
			arc.name = 'arcL';
			scene.add (arc);
			arc.visible = firstPV;
		}
	  
		  rotateTrace (RC);
}

function rotateTrace (rotC) {
	var trace = new THREE.Vector3 (-20, 0,0);
	car.mesh.localToWorld (trace);
	var localY = new THREE.Vector3(0, 1, 0);
	for (var i = 1; i < 2; i++) {
		var tMrc = trace.clone().sub (rotC);
		var theta = 12/tMrc.length();
		var tr = tMrc.applyAxisAngle (localY, -sign*theta*i);
		tr.add (rotC);
		traceMeshes[i].position.copy (tr);
		traceMeshes[i].rotation.y = car.angle + (-sign*theta*i)*2.5;
	}
	traceMeshesBlue[0].position.copy( car.mesh.localToWorld (new THREE.Vector3(-20-(i%3*10), 0, 0)));
	traceMeshesBlue[0].rotation.y = car.angle;


}

function makeCCWArc(r, theta1, theta2, center = [0, 0], colorName='white') {
	const N = 100;
	// CCW: theta1 < theta2
	if (theta2 < theta1) theta2 += Math.PI * 2;

	let dq = (theta2 - theta1) / N;
	let points = [];
	for (let i = 0, q = theta1; i < N; i++, q += dq) {
		points.push(r * Math.cos(q) + center[0], 0, r * Math.sin(q) + center[1]);

	}
	
	var geometry = new LineGeometry();
	geometry.setPositions(points);

	var matLine2 = new LineMaterial({
		color: colorName,
		linewidth: 0.05, // in pixels
		dashed: false,
		polygonOffset: true,
		polygonOffsetFactor: -20,
		polygonOffsetUnits: -20
	});
	const arc = new Line2(geometry, matLine2);
	arc.computeLineDistances();

	return arc;
}

export function reversingLineVisible(canSee){
	traceMeshes.forEach (function(b) {b.visible = canSee})
	traceMeshesBlue.forEach (function(b) {b.visible = canSee})

}

export {firstPV};