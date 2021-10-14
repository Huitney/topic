import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import {car, scene} from "./init.js";

var traceMeshes = [];

export function buildScenes(){
	//ground
	
	var shape = new THREE.Shape(); 
	shape.moveTo(-300, -400);
	shape.lineTo(300, -400);
	shape.lineTo(300, 400);
	shape.lineTo(-300, 400);
	shape.lineTo(-300, -400);

	var extrudeSettings = {
		steps: 1,
		depth: 1,
		bevelEnabled: false,
	};

	let loader = new THREE.TextureLoader()
	loader.setCrossOrigin ("")
	let map = loader.load ("https://i.imgur.com/eD8CiAD.png?1")
	var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
	var material = new THREE.MeshLambertMaterial({
		map: map
	});
	const ground = new THREE.Mesh( geometry, material ) ;
	ground.rotation.x = Math.PI/2;
	scene.add( ground );

	var length = 110, width = 292;
	var rr = 5;

	var shape = new THREE.Shape(); 
	shape.moveTo(rr, 0);
	shape.lineTo(length-rr, 0);
	shape.absarc(length-rr,rr,rr,Math.PI*1.5, Math.PI*2);
	shape.lineTo(length, width-rr);
	shape.absarc(length-rr,width-rr,rr,0, Math.PI*0.5);
	shape.lineTo(rr, width);
	shape.absarc(rr,width-rr,rr,Math.PI/2, Math.PI);
	shape.absarc(rr,rr,rr,Math.PI, Math.PI*1.5);

	path = new THREE.Path();
	path.moveTo(length / 7.3, width / 21);
	path.lineTo(length / 7.3 * 6.3, width / 21);
	path.lineTo(length / 7.3 * 6.3, width / 21 * 20);
	path.lineTo(length / 7.3, width / 21 * 20);
	path.lineTo(length / 7.3, width / 21);
	shape.holes.push(path);

	var extrudeSettings = {
		steps: 1,
		depth: 1.5, // extrude along +Z
		bevelEnabled: false,
	};
	
	var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
	var material = new THREE.MeshLambertMaterial({
		color: 0x6b6b6b,
		polygonOffset: true,
		polygonOffsetFactor: -6,
		polygonOffsetUnits: -6
	});
	var sidewalk1 = new THREE.Mesh(geometry, material);
	sidewalk1.rotation.x = Math.PI / 2;
	sidewalk1.position.set(149, 1.5, -360);
	

	var sidewalk2 = sidewalk1.clone();
	sidewalk2.position.set(149, 1.5, 68);

	var length = 275, width = 120;
	var rr = 5;

	var shape = new THREE.Shape(); 
	shape.moveTo(rr, 0);
	shape.lineTo(length-rr, 0);
	shape.absarc(length-rr,rr,rr,Math.PI*1.5, Math.PI*2);
	shape.lineTo(length, width-rr);
	shape.absarc(length-rr,width-rr,rr,0, Math.PI*0.5);
	shape.lineTo(rr, width);
	shape.absarc(rr,width-rr,rr,Math.PI/2, Math.PI);
	shape.absarc(rr,rr,rr,Math.PI, Math.PI*1.5);

	path = new THREE.Path();
	path.moveTo(length / 18.3, width / 8);
	path.lineTo(length / 18.3 * 17.3, width / 8);
	path.lineTo(length / 18.3 * 17.3, width / 8 * 7);
	path.lineTo(length / 18.3, width / 8 * 7);
	path.lineTo(length / 18.3, width / 8);
	shape.holes.push(path);

	var extrudeSettings = {
		steps: 1,
		depth: 1.5, // extrude along +Z
		bevelEnabled: false,
	};
	
	geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
	var sidewalk3 = new THREE.Mesh(geometry, material);
	sidewalk3.rotation.x = Math.PI / 2;
	sidewalk3.position.set(-260, 1.5, 240);

	var length = 275, width = 110;
	var rr = 5;

	var shape = new THREE.Shape(); 
	shape.moveTo(rr, 0);
	shape.lineTo(length-rr, 0);
	shape.absarc(length-rr,rr,rr,Math.PI*1.5, Math.PI*2);
	shape.lineTo(length, width-rr);
	shape.absarc(length-rr,width-rr,rr,0, Math.PI*0.5);
	shape.lineTo(rr, width);
	shape.absarc(rr,width-rr,rr,Math.PI/2, Math.PI);
	shape.absarc(rr,rr,rr,Math.PI, Math.PI*1.5);

	path = new THREE.Path();
	path.moveTo(length / 18.3, width / 7);
	path.lineTo(length / 18.3 * 17.3, width / 7);
	path.lineTo(length / 18.3 * 17.3, width / 7 * 6);
	path.lineTo(length / 18.3, width / 7 * 6);
	path.lineTo(length / 18.3, width / 7);
	shape.holes.push(path);

	var extrudeSettings = {
		steps: 1,
		depth: 1.5, // extrude along +Z
		bevelEnabled: false,
	};
	
	geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
	var sidewalk4 = new THREE.Mesh(geometry, material);
	sidewalk4.rotation.x = Math.PI / 2;
	sidewalk4.position.set(-260, 1.5, 67);

	var length = 133, width = 292;
	var rr = 5;

	var shape = new THREE.Shape(); 
	shape.moveTo(rr, 0);
	shape.lineTo(length-rr, 0);
	shape.absarc(length-rr,rr,rr,Math.PI*1.5, Math.PI*2);
	shape.lineTo(length, width-rr);
	shape.absarc(length-rr,width-rr,rr,0, Math.PI*0.5);
	shape.lineTo(29, width);
	shape.absarc(29,width-rr,rr,Math.PI/2, Math.PI);
	shape.absarc(rr,rr,rr,Math.PI, Math.PI*1.5);

	path = new THREE.Path();
	path.moveTo(length / 9, width / 21);
	path.lineTo(length / 9 * 8, width / 21);
	path.lineTo(length / 9 * 8, width / 21 * 20);
	path.lineTo(length / 3.5, width / 21 * 20);
	path.lineTo(length / 9, width / 21);
	shape.holes.push(path);

	var extrudeSettings = {
		steps: 1,
		depth: 1.5, // extrude along +Z
		bevelEnabled: false,
	};
	
	geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
	var sidewalk5 = new THREE.Mesh(geometry, material);
	sidewalk5.rotation.x = Math.PI / 2;
	sidewalk5.position.set(-123, 1.5, -360);

	var length = 70, width = 292;
	var rr = 5;

	var shape = new THREE.Shape(); 
	shape.moveTo(rr, 0);
	shape.lineTo(length-rr, 0);
	shape.absarc(length-rr,rr,rr,Math.PI*1.5, Math.PI*2);
	shape.lineTo(length+23, width-rr);
	shape.absarc(length-rr+23,width-rr,rr,0, Math.PI*0.5);
	shape.lineTo(rr, width);
	shape.absarc(rr,width-rr,rr,Math.PI/2, Math.PI);
	shape.absarc(rr,rr,rr,Math.PI, Math.PI*1.5);

	path = new THREE.Path();
	path.moveTo(length / 4.66, width / 21);
	path.lineTo(length / 4.66 * 3.66, width / 21);
	path.lineTo(length / 15*16.5, width / 21 * 20);
	path.lineTo(length / 4.66, width / 21 * 20);
	path.lineTo(length / 4.66, width / 21);
	shape.holes.push(path);

	var extrudeSettings = {
		steps: 1,
		depth: 1.5, // extrude along +Z
		bevelEnabled: false,
	};
	
	geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
	var sidewalk6 = new THREE.Mesh(geometry, material);
	sidewalk6.rotation.x = Math.PI / 2;
	sidewalk6.position.set(-260, 1.5, -360);

	scene.add(sidewalk1, sidewalk2, sidewalk3, sidewalk4, sidewalk5, sidewalk6);

//zebraCrossing
	texture = loader.load('https://i.imgur.com/09w3f06.png');

	texture.minFilter = THREE.NearestFilter;
	texture.needsUpdate = true;
	var zebraCrossing1 = new THREE.Mesh(new THREE.PlaneGeometry(136, 60), new THREE.MeshBasicMaterial({
										map: texture,
										alphaTest: 0.5,
										side: THREE.DoubleSide,
										polygonOffset: true,
										polygonOffsetFactor: -5,
										polygonOffsetUnits: -5}));
	zebraCrossing1.rotation.x = Math.PI/2;
	zebraCrossing1.rotation.z = Math.PI/2;
	zebraCrossing1.position.y = 0.5;
	zebraCrossing1.position.x = -20;

	var zebraCrossing2 = zebraCrossing1.clone();
	zebraCrossing2.rotation.z = 0;
	zebraCrossing2.position.set(80, 0, 100);

	var zebraCrossing3 = zebraCrossing1.clone();
	zebraCrossing3.position.x = 180;

	var zebraCrossing4 = zebraCrossing2.clone();
	zebraCrossing4.rotation.z = 0;
	zebraCrossing4.position.set(80, 0, -100);

	scene.add(zebraCrossing1, zebraCrossing2, zebraCrossing3, zebraCrossing4);

	//road
	texture = loader.load('https://i.imgur.com/rOQ1vf5.png');

	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(2, 1);
	texture.minFilter = THREE.NearestFilter;
	texture.needsUpdate = true;
	var road1 = new THREE.Mesh(new THREE.PlaneGeometry(270, 80), new THREE.MeshBasicMaterial({
								map: texture,
								alphaTest: 0.5,
								side: THREE.DoubleSide,
								polygonOffset: true,
								polygonOffsetFactor: -1,
								polygonOffsetUnits: -1}));
	road1.position.x = -125;
	road1.rotation.x = Math.PI/2;

	texture1 = loader.load('https://i.imgur.com/KvjCb5P.png');
	texture1.minFilter = THREE.NearestFilter;
	texture1.needsUpdate = true;
	var road2 = new THREE.Mesh(new THREE.PlaneGeometry(70, 80), new THREE.MeshBasicMaterial({
								map: texture1,
								alphaTest: 0.5,
								side: THREE.DoubleSide,
								polygonOffset: true,
								polygonOffsetFactor: -1,
								polygonOffsetUnits: -1}));
	road2.position.x = 225;
	road2.rotation.x = Math.PI/2;


	texture2 = loader.load('https://i.imgur.com/VPddEdt.png?3');

	texture2.wrapS = THREE.RepeatWrapping;
	texture2.wrapT = THREE.RepeatWrapping;
	texture2.repeat.set(2, 1);
	texture2.minFilter = THREE.NearestFilter;
	texture2.needsUpdate = true;
	var road3 = new THREE.Mesh(new THREE.PlaneGeometry(323, 40), new THREE.MeshBasicMaterial({
								map: texture2,
								alphaTest: 0.5,
								side: THREE.DoubleSide,
								polygonOffset: true,
								polygonOffsetFactor: -2,
								polygonOffsetUnits: -2}));

	road3.position.set(280, 0, -200.5);
	road3.rotation.x = Math.PI/2;
	road3.rotation.z = Math.PI/2;
	var road4 = road3.clone();
	road4.position.set(280, 0, 200.5);



	var road5 = new THREE.Mesh(new THREE.PlaneGeometry(232, 80), new THREE.MeshBasicMaterial({
								map: texture,
								alphaTest: 0.5,
								side: THREE.DoubleSide,
								polygonOffset: true,
								polygonOffsetFactor: -2,
								polygonOffsetUnits: -2}));

	road5.position.set(80, 0, -245);
	road5.rotation.x = Math.PI/2;
	road5.rotation.z = Math.PI/2;

	var road6 = road5.clone();
	road6.position.set(80, 0, 245);


	var road7 = new THREE.Mesh(new THREE.PlaneGeometry(322, 40), new THREE.MeshBasicMaterial({
								map: texture2,
								alphaTest: 0.5,
								side: THREE.DoubleSide,
								polygonOffset: true,
								polygonOffsetFactor: -2,
								polygonOffsetUnits: -2}));

	road7.position.set(-280, 0, -200);
	road7.rotation.x = Math.PI/2;
	road7.rotation.z = Math.PI/2;
	var road8 = road7.clone();
	road8.position.set(-280, 0, 199);


	var road9 = new THREE.Mesh(new THREE.PlaneGeometry(332, 40), new THREE.MeshBasicMaterial({
								map: texture2,
								alphaTest: 0.5,
								side: THREE.DoubleSide,
								polygonOffset: true,
								polygonOffsetFactor: -2,
								polygonOffsetUnits: -2}));

	road9.position.set(-157, 0, -199);
	road9.rotation.x = Math.PI/2;
	road9.rotation.z = Math.PI/2.11;


	var road10 = new THREE.Mesh(new THREE.PlaneGeometry(302.6, 40), new THREE.MeshBasicMaterial({
								map: texture2,
								alphaTest: 0.5,
								side: THREE.DoubleSide,
								polygonOffset: true,
								polygonOffsetFactor: -3,
								polygonOffsetUnits: -3}));

	road10.position.set(-110, 0, 220);
	road10.rotation.x = Math.PI/2;


	var road11 = new THREE.Mesh(new THREE.PlaneGeometry(142, 40), new THREE.MeshBasicMaterial({
								map: texture2,
								alphaTest: 0.5,
								side: THREE.DoubleSide,
								polygonOffset: true,
								polygonOffsetFactor: -3,
								polygonOffsetUnits: -3}));

	road11.position.set(190, 0, 380);
	road11.rotation.x = Math.PI/2;

	var road12 = road10.clone();
	road12.position.set(-110.6, 0, 380);
	road12.rotation.x = Math.PI/2;


	var road13 = new THREE.Mesh(new THREE.PlaneGeometry(141, 40), new THREE.MeshBasicMaterial({
								map: texture2,
								alphaTest: 0.5,
								side: THREE.DoubleSide,
								polygonOffset: true,
								polygonOffsetFactor: -3,
								polygonOffsetUnits: -3}));

	road13.position.set(190.5, 0, -380);
	road13.rotation.x = Math.PI/2;

	var road14 = new THREE.Mesh(new THREE.PlaneGeometry(192.5, 40), new THREE.MeshBasicMaterial({
								map: texture2,
								alphaTest: 0.5,
								side: THREE.DoubleSide,
								polygonOffset: true,
								polygonOffsetFactor: -3,
								polygonOffsetUnits: -3}));

	road14.position.set(-55, 0, -380);
	road14.rotation.x = Math.PI/2;

	var road15 = new THREE.Mesh(new THREE.PlaneGeometry(71, 40), new THREE.MeshBasicMaterial({
								map: texture2,
								alphaTest: 0.5,
								side: THREE.DoubleSide,
								polygonOffset: true,
								polygonOffsetFactor: -3,
								polygonOffsetUnits: -3}));

	road15.position.set(-225, 0, -380);
	road15.rotation.x = Math.PI/2;


	texture3 = loader.load('https://i.imgur.com/Q8DzNSQ.png?1');
	var road16 = new THREE.Mesh(new THREE.PlaneGeometry(80, 40), new THREE.MeshBasicMaterial({
								map: texture3,
								alphaTest: 0.5,
								side: THREE.DoubleSide,
								polygonOffset: true,
								polygonOffsetFactor: -1,
								polygonOffsetUnits: -1}));

	road16.position.set(280, 0, 0);
	road16.rotation.x = Math.PI/2;
	road16.rotation.z = -Math.PI/2;

	var road17 = road16.clone();
	road17.position.set(80, 0, -380);
	road17.rotation.x =  -Math.PI/2;
	road17.rotation.z = 0;

	var road18 = road17.clone();
	road17.position.set(80, 0, 380);
	road17.rotation.x =  Math.PI/2;

	var road19 = road16.clone();
	road19.position.set(-280, 0, 0);
	road19.rotation.z =  Math.PI/2;


	var road20 = new THREE.Mesh(new THREE.PlaneGeometry(41.5, 39), new THREE.MeshBasicMaterial({
								map: texture3,
								alphaTest: 0.5,
								side: THREE.DoubleSide,
								polygonOffset: true,
								polygonOffsetFactor: -4,
								polygonOffsetUnits: -4}));
	road20.position.set(-170, 0, -380.5);
	road20.rotation.x =  Math.PI/2;
	road20.rotation.z = Math.PI;

	var road21 = new THREE.Mesh(new THREE.PlaneGeometry(20, 42), new THREE.MeshBasicMaterial({
								color: 0x000000,
								alphaTest: 0.5,
								side: THREE.DoubleSide,
								polygonOffset: true,
								polygonOffsetFactor: -3,
								polygonOffsetUnits: -3}));
	road21.position.set(-144, 0, -28.85);
	road21.rotation.x =  -Math.PI/2;
	road21.rotation.z =  -Math.PI/2;

	texture3 = loader.load('https://i.imgur.com/pv8zBnU.png?1');
	var road22 = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), new THREE.MeshBasicMaterial({
								map: texture3,
								alphaTest: 0.5,
								side: THREE.DoubleSide,
								polygonOffset: true,
								polygonOffsetFactor: -1,
								polygonOffsetUnits: -1}));
	road22.position.set(280, 0, -380);
	road22.rotation.x =  -Math.PI/2;
	road22.rotation.z =  -Math.PI/2;

	var road23 = road22.clone();
	road23.position.set(280, 0, 380);
	road23.rotation.x =  -Math.PI/2;
	road23.rotation.z =  -Math.PI;

	var road24 = road22.clone();
	road24.position.set(-280, 0, 380);
	road24.rotation.x =  -Math.PI/2;
	road24.rotation.z =  Math.PI/2;

	var road25 = road22.clone();
	road25.position.set(-280, 0, -380);
	road25.rotation.x =  -Math.PI/2;
	road25.rotation.z = 0;
	

	scene.add(road1, road2, road3, road4, road5, road6, road7, road8, road9, road10, road11, road12, road13, road14, road15);
	scene.add(road16, road17, road18, road19, road20, road21, road22, road23, road24, road25);


	//red line

	var length = 114, width = 296;
	var rr = 5;

	var shape = new THREE.Shape(); 
	shape.moveTo(rr, 0);
	shape.lineTo(length-rr, 0);
	shape.absarc(length-rr,rr,rr,Math.PI*1.5, Math.PI*2);
	shape.lineTo(length, width-rr);
	shape.absarc(length-rr,width-rr,rr,0, Math.PI*0.5);
	shape.lineTo(rr, width);
	shape.absarc(rr,width-rr,rr,Math.PI/2, Math.PI);
	shape.absarc(rr,rr,rr,Math.PI, Math.PI*1.5);

	path = new THREE.Path();
	path.moveTo(length / 58.5, width / 148);
	path.lineTo(length / 58.5 * 57.5, width / 148);
	path.lineTo(length / 58.5 * 57.5, width / 148 * 147);
	path.lineTo(length / 58.5, width / 148 * 147);
	path.lineTo(length / 58.5, width / 148);
	shape.holes.push(path);

	var extrudeSettings = {
		steps: 1,
		depth: .5, // extrude along +Z
		bevelEnabled: false,
	};
	
	var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
	var material = new THREE.MeshLambertMaterial({
			color: 0xff0000, //map: map
			polygonOffset: true,
			polygonOffsetFactor: -4,
			polygonOffsetUnits: -4});

	var redLine1 = new THREE.Mesh(geometry, material);
	redLine1.rotation.x = Math.PI / 2;
	redLine1.position.set(147, 0, -362);
	scene.add(redLine1);	

	var redLine2 = redLine1.clone();
	redLine2.position.set(147, 0, 66);
	scene.add(redLine2);

	var length = 280, width = 123;
	var rr = 5;

	var shape = new THREE.Shape(); 
	shape.moveTo(rr, 0);
	shape.lineTo(length-rr, 0);
	shape.absarc(length-rr,rr,rr,Math.PI*1.5, Math.PI*2);
	shape.lineTo(length, width-rr);
	shape.absarc(length-rr,width-rr,rr,0, Math.PI*0.5);
	shape.lineTo(rr, width);
	shape.absarc(rr,width-rr,rr,Math.PI/2, Math.PI);
	shape.absarc(rr,rr,rr,Math.PI, Math.PI*1.5);

	path = new THREE.Path();
	path.moveTo(length / 139, width / 61);
	path.lineTo(length / 139 * 138, width / 61);
	path.lineTo(length / 139 * 138, width / 61 * 60);
	path.lineTo(length / 139, width / 61 * 60);
	path.lineTo(length / 139, width / 61);
	shape.holes.push(path);

	var extrudeSettings = {
		steps: 1,
		depth: .5, // extrude along +Z
		bevelEnabled: false,
	};
	
	geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
	var redLine3 = new THREE.Mesh(geometry, material);
	redLine3.rotation.x = Math.PI / 2;
	redLine3.position.set(-262, 0, 238);
	scene.add(redLine3);

	var length = 280, width = 113;
	var rr = 5;

	var shape = new THREE.Shape(); 
	shape.moveTo(rr, 0);
	shape.lineTo(length-rr, 0);
	shape.absarc(length-rr,rr,rr,Math.PI*1.5, Math.PI*2);
	shape.lineTo(length, width-rr);
	shape.absarc(length-rr,width-rr,rr,0, Math.PI*0.5);
	shape.lineTo(rr, width);
	shape.absarc(rr,width-rr,rr,Math.PI/2, Math.PI);
	shape.absarc(rr,rr,rr,Math.PI, Math.PI*1.5);

	path = new THREE.Path();
	path.moveTo(length / 18.3, width / 7);
	path.lineTo(length / 18.3 * 17.3, width / 7);
	path.lineTo(length / 18.3 * 17.3, width / 7 * 6);
	path.lineTo(length / 18.3, width / 7 * 6);
	path.lineTo(length / 18.3, width / 7);
	shape.holes.push(path);

	var extrudeSettings = {
		steps: 1,
		depth: .5, // extrude along +Z
		bevelEnabled: false,
	};
	
	geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
	var redLine4 = new THREE.Mesh(geometry, material);
	redLine4.rotation.x = Math.PI / 2;
	redLine4.position.set(-262, 0, 65);
	scene.add(redLine4);

	var length = 137, width = 296;
	var rr = 5;

	var shape = new THREE.Shape(); 
	shape.moveTo(rr, 0);
	shape.lineTo(length-rr, 0);
	shape.absarc(length-rr,rr,rr,Math.PI*1.5, Math.PI*2);
	shape.lineTo(length, width-rr);
	shape.absarc(length-rr,width-rr,rr,0, Math.PI*0.5);
	shape.lineTo(29, width);
	shape.absarc(29,width-rr,rr,Math.PI/2, Math.PI);
	shape.absarc(rr,rr,rr,Math.PI, Math.PI*1.5);

	path = new THREE.Path();
	path.moveTo(length / 69, width / 148.5);
	path.lineTo(length / 69 * 68, width / 148.5);
	path.lineTo(length / 69 * 68, width / 148.5 * 147.5);
	path.lineTo(length / 3.6, width / 148.5 * 147.5);
	path.lineTo(length / 69, width / 148.5);
	shape.holes.push(path);

	var extrudeSettings = {
		steps: 1,
		depth: .5, // extrude along +Z
		bevelEnabled: false,
	};
	
	geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
	var redLine5 = new THREE.Mesh(geometry, material);
	redLine5.rotation.x = Math.PI / 2;
	redLine5.position.set(-125, 0, -362);
	scene.add(redLine5);

	var length = 74, width = 296;
	var rr = 5;

	var shape = new THREE.Shape(); 
	shape.moveTo(rr, 0);
	shape.lineTo(length-rr, 0);
	shape.absarc(length-rr,rr,rr,Math.PI*1.5, Math.PI*2);
	shape.lineTo(length+23, width-rr);
	shape.absarc(length-rr+23,width-rr,rr,0, Math.PI*0.5);
	shape.lineTo(rr, width);
	shape.absarc(rr,width-rr,rr,Math.PI/2, Math.PI);
	shape.absarc(rr,rr,rr,Math.PI, Math.PI*1.5);

	path = new THREE.Path();
	path.moveTo(length / 4.66, width / 21);
	path.lineTo(length / 4.66 * 3.66, width / 21);
	path.lineTo(length / 15*16.5, width / 21 * 20);
	path.lineTo(length / 4.66, width / 21 * 20);
	path.lineTo(length / 4.66, width / 21);
	shape.holes.push(path);

	var extrudeSettings = {
		steps: 1,
		depth: .5, // extrude along +Z
		bevelEnabled: false,
	};
	
	geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
	var redLine6 = new THREE.Mesh(geometry, material);
	redLine6.rotation.x = Math.PI / 2;
	redLine6.position.set(-262, 0, -362);
	scene.add(redLine6);
	
	//parking space
	texture4 = loader.load('https://i.imgur.com/ifr2RZj.png');
	var space1 = new THREE.Mesh(new THREE.PlaneGeometry(55, 27), new THREE.MeshBasicMaterial({
								map: texture4,
								alphaTest: 0.5,
								side: THREE.DoubleSide,
								polygonOffset: true,
								polygonOffsetFactor: -5,
								polygonOffsetUnits: -5}));
	space1.position.set(-214, 0, -56);
	space1.rotation.x =  -Math.PI/2;

	var space2 = space1.clone();
	space2.position.set(-138, 0, 55);
	
	var space3 = space1.clone();
	space3.position.set(-192, 0, 55);
	
	var space4 = space1.clone();
	space4.position.set(-70, 0, 187);
	
	var space5 = space1.clone();
	space5.position.set(-124, 0, 187);

	var space6 = space1.clone();
	space6.position.set(137, 0, -299);
	space6.rotation.z = Math.PI / 2;
	
	var space7 = space1.clone();
	space7.rotation.z = Math.PI / 2;
	space7.position.set(137, 0, -245);
	
	var space8 = space1.clone();
	space8.rotation.z = Math.PI / 2;
	space8.position.set(137, 0, -191);

	var space9 = space1.clone();
	space9.position.set(22, 0, -229);
	space9.rotation.z = Math.PI / 2;
	
	var space10 = space1.clone();
	space10.rotation.z = Math.PI / 2;
	space10.position.set(22, 0, -175);
	
	var space11 = space1.clone();
	space11.rotation.z = Math.PI / 2;
	space11.position.set(22, 0, -121);

	var space12 = space1.clone();
	space12.position.set(-125, 0, -240);
	space12.rotation.z = -Math.PI/2.11;
	
	var space13 = space1.clone();
	space13.position.set(-120.4, 0, -186);
	space13.rotation.z = -Math.PI/2.11;
	
	var space14 = space1.clone();
	space14.position.set(-116, 0, -132);
	space14.rotation.z = -Math.PI/2.11;

	var space15 = space1.clone();
	space15.rotation.z = Math.PI / 2;
	space15.position.set(137, 0, 245);
	
	var space16 = space1.clone();
	space16.rotation.z = Math.PI / 2;
	space16.position.set(137, 0, 190);
	
	scene.add(space1, space2, space3, space4, space5, space6, space7, space8, space9, space10
				, space12, space13, space14, space15, space16);

	//arrow
	var texture6 = loader.load('https://i.imgur.com/hu3ZIWY.png');

	texture6.minFilter = THREE.NearestFilter;
	texture6.needsUpdate = true;
	var arrow1 = new THREE.Mesh(new THREE.PlaneGeometry(35, 60), new THREE.MeshBasicMaterial({
								map: texture6,
								alphaTest: 0.5,
								side: THREE.DoubleSide,
								polygonOffset: true,
								polygonOffsetFactor: -3,
								polygonOffsetUnits: -3}));
	arrow1.position.set(100, 0, -160);
	arrow1.rotation.x = Math.PI/2;
		
	
	var arrow2 = arrow1.clone();
	arrow2.position.set(-80, 0, 20);
	arrow2.rotation.y = Math.PI;
	arrow2.rotation.z = Math.PI/2;

	var arrow3 = arrow1.clone();
	arrow3.position.set(-80, 0, -20);
	arrow3.rotation.z = -Math.PI/2;

	var arrow4 = arrow1.clone();
	arrow4.position.set(60, 0, -160);
	arrow4.rotation.y = Math.PI;
	
	var arrow5 = arrow1.clone();
	arrow5.position.set(100, 0, 160);
	arrow5.rotation.y = Math.PI;
	arrow5.rotation.z = -Math.PI;

	var arrow6 = arrow1.clone();
	arrow6.position.set(60, 0, 160);
	arrow6.rotation.z = -Math.PI;


	var texture7 = loader.load('https://i.imgur.com/f5UGMBz.png?1');

	texture7.minFilter = THREE.NearestFilter;
	texture7.needsUpdate = true;
	var arrow7 = new THREE.Mesh(new THREE.PlaneGeometry(35, 60), new THREE.MeshBasicMaterial({
								map: texture7,
								alphaTest: 0.5,
								side: THREE.DoubleSide,
								polygonOffset: true,
								polygonOffsetFactor: -3,
								polygonOffsetUnits: -3}));
								arrow7.rotation.x = Math.PI/2;	
	arrow7.position.set(60, 0, 240);
	arrow7.rotation.z = -Math.PI;

	scene.add(arrow1, arrow2, arrow3, arrow4, arrow5, arrow6, arrow7);
	
	//stop sign
	var texture8 = loader.load('https://i.imgur.com/dB4AdSy.png');

	var stopSign = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.MeshBasicMaterial({
								map: texture8,
								alphaTest: 0.5,
								side: THREE.DoubleSide}));
	stopSign.rotation.y = -Math.PI/2;	
	stopSign.position.set(230, 25, 68);
	var stopSignPole = new THREE.Mesh( new THREE.CylinderGeometry( 0.5, 0.5, 20, 32 ), new THREE.MeshBasicMaterial( {color: 'darkgray'} ) );
	stopSignPole.rotation.y = Math.PI/2;	
	stopSignPole.position.y = -15;
	stopSign.add( stopSignPole );

	scene.add(stopSign);

}

export function drawReversingLine(){
	//Reversing display line
	const material = new THREE.LineBasicMaterial( {color: 0xffffff } );
	const points = [];
	points.push( car.mesh.localToWorld (new THREE.Vector3(0,0,10)) );
	points.push( car.mesh.localToWorld (new THREE.Vector3(0,0,-10)) );

	const geometry = new THREE.BufferGeometry().setFromPoints( points );
	const traceMesh = new THREE.Line( geometry, material );
	for (var i = 0; i < 3; i++) {
  		traceMeshes.push (traceMesh.clone());
    	scene.add (traceMeshes[i]);
	}
}