import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import {buildCar, ObstacleCar} from "https://raw.githack.com/Huitney/topic/master/buildThings.js";
import {firstPV} from "https://raw.githack.com/Huitney/topic/master/func.js";
import {cameraUpdate, treesLootAt, treesVisible, loadCubemap} from "https://raw.githack.com/Huitney/topic/master/func.js";
import {onPointerDown} from "https://raw.githack.com/Huitney/topic/master/buttonFunc.js";
import {parking, keyboardAndRC, moveCar, flashTurnSignal} from "https://raw.githack.com/Huitney/topic/master/carMove.js";
import {buildScenes} from "https://raw.githack.com/Huitney/topic/master/buildScenes.js";

var scene, renderer, camera;
var sceneHUD, GPSCamera;
var topCamera, thirdPVCamera;
var reversingCamera;
var keyboard = new KeyboardState();
var clock = new THREE.Clock();

var car, obstacles = [];
var raycaster;
var radarSound, RCmesh, longBeep;
var topView = false;
var carParameter;
var buildingNodes;

export function init() {

	scene = new THREE.Scene();
	sceneHUD = new THREE.Scene();
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(0x888888);
	document.body.appendChild(renderer.domElement);

	camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.set(-300, 200, 0);

	var light = new THREE.HemisphereLight(0xffffff, 0x000000, 1);
	light.position.set(0, 100, 0);
	scene.add(light);
	
	buildScenes();
	carParameter = [{name:'bodyWidth', value:20}, {name:'bodyLength', value:38}
					, {name:'axelLength', value:16}, {name:'frontWheelToBackWheel', value:26}];
	
    ////////////////////////////////////////////////////////////
	//car
    car = buildCar(new THREE.Vector3(-122, 13, 21));
	var car2 = buildCar(new THREE.Vector3(-138, 13, 56));
	//var car3 = new ObstacleCar(new THREE.Vector3(0, 0, 0), [18, 9, 9]);
	obstacles.push(car2);
	
	//light
	var light = new THREE.AmbientLight( 0x404040 ); // soft white light
	scene.add( light );
  
    window.addEventListener('resize', onWindowResize, false);
  
    ////////////////////////////
    RCmesh = new THREE.Mesh (new THREE.SphereGeometry(5,6,6), new THREE.MeshBasicMaterial());
    scene.add(RCmesh);

    //////////////////////////////////////////////
    renderer.autoClear = false;
	
    //topCamera
    topCamera = new THREE.OrthographicCamera(-window.innerWidth/26, window.innerWidth/26
											, window.innerHeight/12, -window.innerHeight/12, 1, 1000);
    topCamera.position.y = 100;
	topCamera.up.set(1, 0, 0);
	topCamera.lookAt(0, 0, 0);
	
	//thirdPVCamera
	thirdPVCamera = new THREE.OrthographicCamera(-window.innerWidth/52, window.innerWidth/52
											, window.innerHeight/24, -window.innerHeight/24, 1, 1000);
	thirdPVCamera.lookAt (car.mesh.localToWorld (new THREE.Vector3(30,0,0)));
	thirdPVCamera.position.copy (car.mesh.localToWorld (new THREE.Vector3 (-30,18,0)));
		
	//Reversing camera
    reversingCamera = new THREE.OrthographicCamera(-window.innerWidth/52, window.innerWidth/52
												, window.innerHeight/48, -window.innerHeight/48, 0.1, 1000);
    reversingCamera.position.set(-60, 23, 40);
	
	//GPSCamera
    GPSCamera = new THREE.OrthographicCamera(-window.innerWidth/6.5, window.innerWidth/6.5
											, window.innerHeight/6, -window.innerHeight/6, 1, 1000);
    GPSCamera.lookAt (car.mesh.localToWorld (new THREE.Vector3(50,0,0)));
	GPSCamera.position.copy (car.mesh.localToWorld (new THREE.Vector3 (-60,200,0)));

	
	//sound
	radarSound = document.getElementById('radarSound');
	longBeep = document.getElementById('longBeep');
	radarSound.muted = false;
	longBeep.muted = false;
	longBeep.loop = true;
	
	//background
	var cubeMap = loadCubemap();
  	scene.background = cubeMap;
	
	window.addEventListener ('pointerdown', onPointerDown, false);
	raycaster = new THREE.Raycaster();
	
	//drawReversingLine();
	flashTurnSignal();
}
  
export function animate() {
	
    renderer.clear(true);
    
    keyboard.update();
  
    // 'static' variables  
    animate.fSlowDown = (animate.fSlowDown === undefined) ? 0 : animate.fSlowDown;
    animate.bSlowDown = (animate.bSlowDown === undefined) ? 0 : animate.bSlowDown;
	
    /////////////////////////////////////////////////////////////////
    //move car	
	var deltaT = clock.getDelta();
	
	let paraArray = keyboardAndRC(animate.fSlowDown, animate.bSlowDown, deltaT);
	animate.fSlowDown = paraArray[0];
	animate.bSlowDown = paraArray[1];
	let RC = paraArray[2];
    
	let frontWheelToBackWheel = carParameter[carParameter.map(x =>x.name).indexOf('frontWheelToBackWheel')].value;
    moveCar(RC, (car.speed * Math.tan(car.theta)/frontWheelToBackWheel), deltaT);
	
    //camera position
	cameraUpdate(animate.fSlowDown, animate.bSlowDown);
	
    //parking 
	parking();
		  
    /////////////////////////////////////////////
    // purely cosmetic ...    wheel turn  
    car.leftfrontWheel.rotation.z -= car.speed*deltaT/5;
    car.rightfrontWheel.rotation.z -= car.speed*deltaT/5;
    car.leftRearWheel.rotation.z -= car.speed*deltaT/5;
    car.rightRearWheel.rotation.z -= car.speed*deltaT/5;
	
	//trees
	treesLootAt();
  
    requestAnimationFrame(animate);
    render();
}
  
function render() {
	
	var WW = window.innerWidth;
	var HH = window.innerHeight;
    renderer.setScissorTest( true );

    renderer.setViewport(0, 0, WW, HH);
    renderer.setScissor(0, 0, WW, HH);
    renderer.clear();
    renderer.render(scene, camera);

	if(firstPV){
		car.mesh.visible = false;
		renderer.render(sceneHUD, camera);
		//reversing Camera
		if(car.gear === 'r'){
			renderer.setViewport(WW/2.41, HH/4, WW/6.5, HH/6);
			renderer.setScissor(WW/2.41, HH/4, WW/6.5, HH/6);
			renderer.clear();
			car.brakeLightR.visible = false;
			car.brakeLightL.visible = false;
			treesVisible(false);
			renderer.render(scene, reversingCamera);	
			treesVisible(true);
			car.brakeLightR.visible = true;
			car.brakeLightL.visible = true;
		}
		else if(topView){
			renderer.setViewport(WW/2.41, HH/4, WW/13, HH/6);
			renderer.setScissor(WW/2.41, HH/4, WW/13, HH/6);
			renderer.clear();
			car.mesh.visible = true;
			renderer.render(scene, topCamera);
			renderer.setViewport(WW*1.545/3.13, HH/4, WW/13, HH/6);
			renderer.setScissor(WW*1.545/3.13, HH/4, WW/13, HH/6);
			renderer.clear();
			renderer.render(scene, thirdPVCamera);
			car.mesh.visible = false;
		}
		else{
			renderer.setViewport(WW/2.41, HH/4, WW/6.5, HH/6);
			renderer.setScissor(WW/2.41, HH/4, WW/6.5, HH/6);
			renderer.clear();
			car.mapArrow.visible = true;
			treesVisible(false);
			renderer.render(scene, GPSCamera);
			treesVisible(true);
			car.mapArrow.visible = false;
		}
	}
	else car.mesh.visible = true;
	renderer.setScissorTest( false );
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

export function changeTopView(){
	topView =! topView;
}

export {scene, sceneHUD, camera, GPSCamera, topCamera, thirdPVCamera, reversingCamera, keyboard
		, car, obstacles, raycaster, radarSound, RCmesh, longBeep, topView, carParameter, buildingNodes};