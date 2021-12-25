import * as THREE from "https://threejs.org/build/three.module.js";
import {scene} from 'https://raw.githack.com/Huitney/topic/master/init.js';

var bushes = [], bushes1 = [], bushes2 = [], bushes3 = [];

function buildScenes(){
	//ground

	
	let loader = new THREE.TextureLoader();
	loader.setCrossOrigin ("");

	var geometry = new THREE.PlaneGeometry( 680, 880 );
	var material = new THREE.MeshLambertMaterial({
		side: THREE.DoubleSide,
		color:0x000000,
		polygonOffset: true,
		polygonOffsetFactor: -.5,
		polygonOffsetUnits: -.5
	});
	const ground = new THREE.Mesh( geometry, material ) ;
	ground.rotation.x = Math.PI/2;
	scene.add( ground );

/////////////////////////////////////////  sidewalk  //////////////////////////////////////////////////
	let map1 = loader.load ("https://i.imgur.com/KIQL2BB.jpg");
	map1.wrapS = map1.wrapT = THREE.WrapRepeating;
	map1.repeat.set (.05,.05);
	var length = 108, width = 291;
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

	var path = new THREE.Path();
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
		color: 0x888888,//0x6b6b6b
		polygonOffset: true,
		polygonOffsetFactor: -2,
		polygonOffsetUnits: -2,
		map:map1,
		side:THREE.DoubleSide
	});
	var sidewalk1 = new THREE.Mesh(geometry, material);
	sidewalk1.rotation.x = Math.PI / 2;
	sidewalk1.position.set(151.5, 1.5, -360.5);
	
	var sidewalk2 = sidewalk1.clone();
	sidewalk2.position.set(151.5, 1.5, 68.5);

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

	var length = 271, width = 106;
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
	sidewalk4.position.set(-258, 1.5, 69);

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
	sidewalk5.position.set(-123, 1.5, -360.5);

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


	const sideWalkGeometry = new THREE.BoxGeometry( 3, 1.5, 163 );
	const sideWalkMaterial = new THREE.MeshLambertMaterial( {color: 0x6e6f71,
		polygonOffset: true,
		polygonOffsetFactor: -1,
		polygonOffsetUnits: -1,
	
	} );
	const  sidewalk7 = new THREE.Mesh( sideWalkGeometry, sideWalkMaterial );
	sidewalk7.position.set(150.5, 0.75, -245);

	var sidewalk8 = new THREE.Mesh( new THREE.BoxGeometry( 2.6, 1.5, 110 ), sideWalkMaterial );
	sidewalk8.position.set(9.8, 0.75, -202);

	var sidewalk9 = new THREE.Mesh( new THREE.BoxGeometry( 3, 1.7, 110 ), sideWalkMaterial );
	sidewalk9.position.set(150.5, 0.75, 218);

	var sidewalk10 = new THREE.Mesh( new THREE.BoxGeometry( 110, 1.5, 3 ), sideWalkMaterial );
	sidewalk10.position.set(-98, 0.75, 175.5);

	var sidewalk11 = new THREE.Mesh( new THREE.BoxGeometry( 110, 1.5, 3 ), sideWalkMaterial );
	sidewalk11.position.set(-165, 0.75, 68.4);

	var sidewalk12 = new THREE.Mesh( new THREE.BoxGeometry( 55, 1.5, 4 ), sideWalkMaterial );
	sidewalk12.position.set(-213, 0.75, -68);

	var sidewalk13 = new THREE.Mesh( new THREE.BoxGeometry( 3.5, 1.5, 165 ), sideWalkMaterial );
	sidewalk13.position.set(-109, 0.75, -186);
	sidewalk13.rotation.y = 0.085;

	//scene.add( sidewalk7, sidewalk8, sidewalk9, sidewalk10, sidewalk11, sidewalk12, sidewalk13 );
		
	var length = 710, width = 910;
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
	path.moveTo(length / 47.3, width / 60.6);
	path.lineTo(length / 47.3 * 46.3, width / 60.6);
	path.lineTo(length / 47.3 * 46.3, width / 60.6 * 59.6);
	path.lineTo(length / 47.3, width / 60.6 * 59.6);
	path.lineTo(length / 47.3, width / 60.6);
	shape.holes.push(path);

	var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
	var material = new THREE.MeshLambertMaterial({
		color: 0x888888,//0x6b6b6b
		polygonOffset: true,
		polygonOffsetFactor: -2,
		polygonOffsetUnits: -2,
		map:map1,
		side:THREE.DoubleSide
	});
	var sidewalk14 = new THREE.Mesh(geometry, material);
	sidewalk14.rotation.x = Math.PI / 2;
	sidewalk14.position.set(-355, 1.5, -455);
	scene.add(sidewalk14);

/////////////////////////////////////////   building   //////////////////////////////////////////////////

	var shape = new THREE.Shape(); 
		shape.moveTo(39.5, 131);
		shape.lineTo(39.5, -131);
		shape.lineTo(-39.5, -131);
		shape.lineTo(-39.5, 131);
		shape.lineTo(39.5, 131);
	//let building1 = new Obstacle(shape, new THREE.Vector3(205.5, 50, -215),[39.5, 131, 25]);

	
	var shape = new THREE.Shape(); 
		shape.moveTo(39.5, 131);
		shape.lineTo(39.5, -131);
		shape.lineTo(-39.5, -131);
		shape.lineTo(-39.5, 131);
		shape.lineTo(39.5, 131);
	//let building2 = new Obstacle(shape, new THREE.Vector3(205.5, 50, 215),[39.5, 131, 25]);

	var shape = new THREE.Shape(); 
		shape.moveTo(123, 45);
		shape.lineTo(123, -45);
		shape.lineTo(-123, -45);
		shape.lineTo(-123, 45);
		shape.lineTo(123, 45);

	//let building3 = new Obstacle(shape, new THREE.Vector3(-122.5, 50, 300),[123, 45, 25]);
	
	var shape = new THREE.Shape(); 
	shape.moveTo(121, 38);
	shape.lineTo(121, -38);
	shape.lineTo(-121, -38);
	shape.lineTo(-121, 38);
	shape.lineTo(121, 38);
	//let building4 = new Obstacle(shape, new THREE.Vector3(-122.5, 50, 122),[121, 38, 25]);

	//obstacles.push(building1, building2, building3, building4);

	//building 5
	var shape = new THREE.Shape(); 
	shape.moveTo(-5, -82);
	shape.lineTo(-5, -347);
	shape.lineTo(-108, -347);
	shape.lineTo(-85, -82);
	shape.lineTo(-5, -82);

	var extrudeSettings = {
		steps: 1,
		depth: 50,
		bevelEnabled: false,
	};

	var geometry5 = new THREE.ExtrudeGeometry(shape, extrudeSettings);
	var material5 = new THREE.MeshLambertMaterial({
		color:0xffffff,
		transparent:true,
		opacity:0.5
	});
	const building5 = new THREE.Mesh( geometry5, material5 ) ;
	building5.rotation.x = Math.PI/2;
	building5.position.y = 50;
	//scene.add( building5 );

	//building 6
	var shape = new THREE.Shape(); 
	shape.moveTo(-183, -82);
	shape.lineTo(-204, -346);
	shape.lineTo(-245, -346);
	shape.lineTo(-245, -82);
	shape.lineTo(-183, -82);

	var extrudeSettings = {
		steps: 1,
		depth: 50,
		bevelEnabled: false,
	};

	var geometry6 = new THREE.ExtrudeGeometry(shape, extrudeSettings);
	var material6 = new THREE.MeshLambertMaterial({
		color:0xffffff,
		transparent:true,
		opacity:0.5
	});
	const building6 = new THREE.Mesh( geometry6, material6 ) ;
	building6.rotation.x = Math.PI/2;
	building6.position.y = 50;
	//scene.add( building6 );


/////////////////////////// grass trees bushes ///////////////////////////////////////////
	
	var texture = loader.load('https://i.imgur.com/f4TTvV5.png');

	var texMat1 = new THREE.MeshBasicMaterial({
	  map: texture,
	  transparent: true,
	  alphaTest: 0.5
	});

//bushes

	var bush = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), texMat1);
	var bushes0 = new THREE.Group();
	//var bushes = [], bushes1 = [], bushes2 = [], bushes3 = [];

  for (let i = 0; i < 62; i++) {
	let bb = bush.clone();
	bb.position.set (360, 5, 460-i*15)
	bushes.push(bb);
	bushes0.add(bb);

  }
  for (let i = 0; i < 60; i++) {
	let bb = bush.clone();
	bb.position.set (-360, 5, 440-i*15)
	bushes1.push(bb);
	bushes0.add(bb);

  }
  for (let i = 0; i < 49; i++) {
	let bb = bush.clone();
	bb.position.set (360-i*15, 5, 460)
	bushes2.push(bb);
	bushes0.add(bb);

  }
  for (let i = 0; i < 49; i++) {
	let bb = bush.clone();
	bb.position.set (360-i*15, 5, -460)
	bushes3.push(bb);
	bushes0.add(bb);

  }
  scene.add(bushes0);


  texture = loader.load('https://i.imgur.com/HmJ4wes.jpg');

	var texMat2 = new THREE.MeshBasicMaterial({
	  map: texture,
	  transparent: true,
	  alphaTest: 0.5,
	  polygonOffset: true,
		polygonOffsetFactor: -.5,
		polygonOffsetUnits: -.5
	});
	texture.wrapS = texture.wrapT = THREE.WrapRepeating;
	texture.repeat.set (.4,10);

	var grass = new THREE.Mesh(new THREE.PlaneGeometry(80, 970), texMat2);
	grass.rotation.x = -Math.PI/2;
	grass.position.set(360, 0, 0);
	
	var grass1 = grass.clone();
	grass1.position.set(-360, 0, 0);

	var texture1 = loader.load('https://i.imgur.com/HmJ4wes.jpg');

	var texMat2 = new THREE.MeshBasicMaterial({
	  map: texture1,
	  transparent: true,
	  alphaTest: 0.5,
	  polygonOffset: true,
      polygonOffsetFactor: -1,
	  polygonOffsetUnits: -1
	});
	texture1.wrapS = texture1.wrapT = THREE.WrapRepeating;
	texture1.repeat.set (10,.4);
	var grass2 = new THREE.Mesh(new THREE.PlaneGeometry(780, 40), texMat2);
	grass2.rotation.x = -Math.PI/2;
	grass2.position.set(0, 0, 470);

	var grass3 = grass2.clone();
	grass3.position.set(0, 0, -470);

	scene.add(grass, grass1, grass2, grass3);


///////////////////////////////////////////   zebraCrossing  //////////////////////////////////////////////////
	texture = loader.load('https://i.imgur.com/09w3f06.png');
/*
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(2, 1);*/
	texture.minFilter = THREE.LinearFilter;
	texture.needsUpdate = true;
	var zebraCrossing1 = new THREE.Mesh(new THREE.PlaneGeometry(130, 60), new THREE.MeshBasicMaterial({
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
	zebraCrossing3.position.x = 175;

	var zebraCrossing4 = zebraCrossing2.clone();
	zebraCrossing4.rotation.z = 0;
	zebraCrossing4.position.set(80, 0, -100);

	scene.add(zebraCrossing1, zebraCrossing2, zebraCrossing3, zebraCrossing4);
	


///////////////////////////////////////////     road      //////////////////////////////////////////////////
	texture = loader.load('https://i.imgur.com/rOQ1vf5.png');

	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(2, 1);
	texture.minFilter = THREE.LinearMipMapLinearFilter;
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
	texture1.minFilter = THREE.LinearFilter;
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
	texture1.minFilter = THREE.LinearMipMapLinearFilter;

	var texture2 = loader.load('https://i.imgur.com/VPddEdt.png');

	texture2.wrapS = THREE.RepeatWrapping;
	texture2.wrapT = THREE.RepeatWrapping;
	texture2.repeat.set(2, 1);
	texture2.minFilter = THREE.LinearMipMapLinearFilter;
	texture2.needsUpdate = true;
	var road3 = new THREE.Mesh(new THREE.PlaneGeometry(323,80), new THREE.MeshBasicMaterial({
		map: texture,
		alphaTest: 0.5,
		side: THREE.DoubleSide,
		polygonOffset: true,
		polygonOffsetFactor: -2,
		polygonOffsetUnits: -2}));

	road3.position.set(300, 0, -200.5);
	road3.rotation.x = Math.PI/2;
	road3.rotation.z = Math.PI/2;
	var road4 = road3.clone();
	road4.position.set(300, 0, 200.5);



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


	var road7 = new THREE.Mesh(new THREE.PlaneGeometry(322, 80), new THREE.MeshBasicMaterial({
		map: texture,
		alphaTest: 0.5,
		side: THREE.DoubleSide,
		polygonOffset: true,
		polygonOffsetFactor: -2,
		polygonOffsetUnits: -2}));

	road7.position.set(-300, 0, -200);
	road7.rotation.x = Math.PI/2;
	road7.rotation.z = Math.PI/2;
	var road8 = road7.clone();
	road8.position.set(-300, 0, 199.8);


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


	var road11 = new THREE.Mesh(new THREE.PlaneGeometry(142, 80), new THREE.MeshBasicMaterial({
		map: texture,
		alphaTest: 0.5,
		side: THREE.DoubleSide,
		polygonOffset: true,
		polygonOffsetFactor: -3,
		polygonOffsetUnits: -3}));

	road11.position.set(190, 0, 400);
	road11.rotation.x = Math.PI/2;


	var road12 = new THREE.Mesh(new THREE.PlaneGeometry(302.6, 80), new THREE.MeshBasicMaterial({
		map: texture,
		alphaTest: 0.5,
		side: THREE.DoubleSide,
		polygonOffset: true,
		polygonOffsetFactor: -3,
		polygonOffsetUnits: -3}));

	road12.position.set(-110.6, 0, 400);
	road12.rotation.x = Math.PI/2;


	var road13 = new THREE.Mesh(new THREE.PlaneGeometry(141, 80), new THREE.MeshBasicMaterial({
		map: texture,
		alphaTest: 0.5,
		side: THREE.DoubleSide,
		polygonOffset: true,
		polygonOffsetFactor: -3,
		polygonOffsetUnits: -3}));

	road13.position.set(190.5, 0, -400);
	road13.rotation.x = Math.PI/2;

	var road14 = new THREE.Mesh(new THREE.PlaneGeometry(192.5, 80), new THREE.MeshBasicMaterial({
		map: texture,
		alphaTest: 0.5,
		side: THREE.DoubleSide,
		polygonOffset: true,
		polygonOffsetFactor: -3,
		polygonOffsetUnits: -3}));

	road14.position.set(-55, 0, -400);
	road14.rotation.x = Math.PI/2;

	var road15 = new THREE.Mesh(new THREE.PlaneGeometry(71, 80), new THREE.MeshBasicMaterial({
		map: texture,
		alphaTest: 0.5,
		side: THREE.DoubleSide,
		polygonOffset: true,
		polygonOffsetFactor: -3,
		polygonOffsetUnits: -3}));

	road15.position.set(-225, 0, -400);
	road15.rotation.x = Math.PI/2;


	var texture3 = loader.load('https://i.imgur.com/Q8DzNSQ.png');
	texture3.minFilter = THREE.LinearMipMapLinearFilter;	
	texture3.needsUpdate = true;
	var road16 = new THREE.Mesh(new THREE.PlaneGeometry(80, 40), new THREE.MeshBasicMaterial({
		map: texture3,
		alphaTest: 0.5,
		side: THREE.DoubleSide,
		polygonOffset: true,
		polygonOffsetFactor: -1,
		polygonOffsetUnits: -1}));


	road16.position.set(320, 0, 0);
	road16.rotation.x = Math.PI/2;
	road16.rotation.z = -Math.PI/2;

	var road17 = road16.clone();
	road17.position.set(80, 0, -420);
	road17.rotation.x =  -Math.PI/2;
	road17.rotation.z = 0;

	var road18 = road17.clone();
	road17.position.set(80, 0, 420);
	road17.rotation.x =  Math.PI/2;

	var road19 = road16.clone();
	road19.position.set(-320, 0, 0);
	road19.rotation.z =  Math.PI/2;


	var road20 = new THREE.Mesh(new THREE.PlaneGeometry(41.7, 79), new THREE.MeshBasicMaterial({
		map: texture3,
		alphaTest: 0.5,
		side: THREE.DoubleSide,
		polygonOffset: true,
		polygonOffsetFactor: -4,
		polygonOffsetUnits: -4}));
	road20.position.set(-170, 0, -401.5);
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

	var texture4 = loader.load('https://i.imgur.com/LeLVX2W.png');
	texture4.minFilter = THREE.LinearMipMapLinearFilter;	
	texture4.needsUpdate = true;
	var road22 = new THREE.Mesh(new THREE.PlaneGeometry(85, 85), new THREE.MeshBasicMaterial({
		map: texture4,
		alphaTest: 0.5,
		side: THREE.DoubleSide,
		polygonOffset: true,
		polygonOffsetFactor: -1,
		polygonOffsetUnits: -1}));
	road22.position.set(297.5, 0, -397.5);
	road22.rotation.x =  -Math.PI/2;
	road22.rotation.z =  -Math.PI/2;

	var road23 = road22.clone();
	road23.position.set(297.5, 0, 397.5);
	road23.rotation.x =  -Math.PI/2;
	road23.rotation.z =  -Math.PI;

	var road24 = road22.clone();
	road24.position.set(-297.5, 0, 397.5);
	road24.rotation.x =  -Math.PI/2;
	road24.rotation.z =  Math.PI/2;

	var road25 = road22.clone();
	road25.position.set(-297.5, 0, -397.5);
	road25.rotation.x =  -Math.PI/2;
	road25.rotation.z = 0;


	var road26 = new THREE.Mesh(new THREE.PlaneGeometry(290, 130), new THREE.MeshBasicMaterial({
		color:0x000000,
		alphaTest: 0.5,
		side: THREE.DoubleSide,
		polygonOffset: true,
		polygonOffsetFactor: -4,
		polygonOffsetUnits: -4}));
		road26.position.set(-130, 0, 300);
		road26.rotation.x =  -Math.PI/2;

	var road27 = new THREE.Mesh(new THREE.PlaneGeometry(30, 108), new THREE.MeshBasicMaterial({
		color:0x000000,
		alphaTest: 0.5,
		side: THREE.DoubleSide,
		polygonOffset: true,
		polygonOffsetFactor: -3,
		polygonOffsetUnits: -3}));
		road27.position.set(-270, 0, 122);
		road27.rotation.x =  -Math.PI/2;	

	var road28 = new THREE.Mesh(new THREE.PlaneGeometry(90, 30), new THREE.MeshBasicMaterial({
		color:0x000000,
		alphaTest: 0.5,
		side: THREE.DoubleSide,
		polygonOffset: true,
		polygonOffsetFactor: -4,
		polygonOffsetUnits: -4}));
		road28.position.set(-222, 0, -360);
		road28.rotation.x =  -Math.PI/2;	

	var road29 = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), new THREE.MeshBasicMaterial({
		color:0x000000,
		alphaTest: 0.5,
		side: THREE.DoubleSide,
		polygonOffset: true,
		polygonOffsetFactor: -4,
		polygonOffsetUnits: -4}));
		road29.position.set(270, 0, 350);
		road29.rotation.x =  -Math.PI/2;	
	
	var road30 = road29.clone();
	road30.position.set(270, 0, -350);	


	scene.add(road1, road2, road3, road4, road5, road6, road7, road8, road9, road10, road11, road12, road13, road14, road15);
	scene.add(road16, road17, road18, road19, road20, road21, road22, road23, road24, road25, road26, road27, road28, road29, road30);


////////////////////////////////////////////////////////////        red line      ////////////////////////////////////////////////////////////////////

		var length = 113, width = 294;
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
		path.moveTo(length / 36.6, width / 97.3);
		path.lineTo(length / 36.6 * 35.6, width / 97.3);
		path.lineTo(length / 36.6 * 35.6, width / 97.3 * 96.3);
		path.lineTo(length / 36.6, width / 97.3 * 96.3);
		path.lineTo(length / 36.6, width / 97.3);
		shape.holes.push(path);
	
		var extrudeSettings = {
			steps: 1,
			depth: 1.5, // extrude along +Z
			bevelEnabled: false,
		};
		
		var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
		var material = new THREE.MeshLambertMaterial({
			color: 0xff0000, //map: map
		});

		var redLine1 = new THREE.Mesh(geometry, material);
		redLine1.rotation.x = Math.PI / 2;
		redLine1.position.set(149, 1.5, -361.5);
		scene.add(redLine1);	

		var redLine2 = redLine1.clone();
		redLine2.position.set(149, 1.5, 67.5);
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
	path.lineTo(length / 139 * 136, width / 61);
	path.lineTo(length / 139 * 136, width / 61 * 58);
	path.lineTo(length / 139, width / 61 * 58);
	path.lineTo(length / 139, width / 61);
	shape.holes.push(path);

	var extrudeSettings = {
		steps: 1,
		depth: 1.5, // extrude along +Z
		bevelEnabled: false,
	};
	
	geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
	var redLine3 = new THREE.Mesh(geometry, material);
	redLine3.rotation.x = Math.PI / 2;
	redLine3.position.set(-262, 1.4, 238);
	scene.add(redLine3);

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
	path.moveTo(length / 91.6, width / 36.6);
	path.lineTo(length / 91.6 * 90.6, width / 36.6);
	path.lineTo(length / 91.6 * 90.6, width / 36.6 * 35.6);
	path.lineTo(length / 91.6, width / 36.6 * 35.6);
	path.lineTo(length / 91.6, width / 36.6);
	shape.holes.push(path);

	var extrudeSettings = {
		steps: 1,
		depth: 1.5, // extrude along +Z
		bevelEnabled: false,
	};
	
	geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
	var redLine4 = new THREE.Mesh(geometry, material);
	redLine4.rotation.x = Math.PI / 2;
	redLine4.position.set(-260, 1.5, 67);
	scene.add(redLine4);

	var length = 136, width = 295;
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
	path.lineTo(length / 69 * 66, width / 148.5);
	path.lineTo(length / 69 * 66, width / 148.5 * 145.5);
	path.lineTo(length / 3.6, width / 148.5 * 145.5);
	path.lineTo(length / 69, width / 148.5);
	shape.holes.push(path);

	var extrudeSettings = {
		steps: 1,
		depth: 1.5, // extrude along +Z
		bevelEnabled: false,
	};
	
	geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
	var redLine5 = new THREE.Mesh(geometry, material);
	redLine5.rotation.x = Math.PI / 2;
	redLine5.position.set(-125, 1.5, -362);
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
		depth: 1.5, // extrude along +Z
		bevelEnabled: false,
	};
	
	geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
	var redLine6 = new THREE.Mesh(geometry, material);
	redLine6.rotation.x = Math.PI / 2;
	redLine6.position.set(-262, 1.5, -362);
	scene.add(redLine6);

	var graygeometry = new THREE.BoxGeometry( 110, 1.5, 2 );
	var garymaterial = new THREE.MeshLambertMaterial( {
		color: 0x595959,
		polygonOffset: true,
		polygonOffsetFactor: -1,
		polygonOffsetUnits: -1} );
	var grayLine1 = new THREE.Mesh( graygeometry, garymaterial );
	grayLine1.position.set(-165, .75, 68);

	var graygeometry = new THREE.BoxGeometry( 55, 1.5, 2 );
	var grayLine2 = new THREE.Mesh( graygeometry, garymaterial );
	grayLine2.position.set(-214, .75, -67);

	var graygeometry = new THREE.BoxGeometry( 110, 1.5, 2.3 );
	var grayLine3 = new THREE.Mesh( graygeometry, garymaterial );
	grayLine3.position.set(-97, .75, 175.9);

	var graygeometry = new THREE.BoxGeometry( 2.5, 1.5, 110 );
	var grayLine4 = new THREE.Mesh( graygeometry, garymaterial );
	grayLine4.position.set(150.2, .75, 218);

	var graygeometry = new THREE.BoxGeometry( 2.5, 1.5, 163 );
	var grayLine5 = new THREE.Mesh( graygeometry, garymaterial );
	grayLine5.position.set(150.2, .75, -245);

	var graygeometry = new THREE.BoxGeometry( 2, 1.5, 110 );
	var grayLine6 = new THREE.Mesh( graygeometry, garymaterial );
	grayLine6.position.set(10, .75, -202);

	var graygeometry = new THREE.BoxGeometry( 2.1, 1.5, 163 );
	var grayLine7 = new THREE.Mesh( graygeometry, garymaterial );
	grayLine7.rotation.y = 0.085;
	grayLine7.position.set(-109.7, .75, -187);

	scene.add( grayLine1, grayLine2, grayLine3, grayLine4, grayLine5, grayLine6, grayLine7 );

	
	//////////////////////////////////////////////////////   parking space  ////////////////////////////////////////////////////////////////////
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
	
	scene.add(space1, space2, space3, space4, space5, space6, space7, space8, space9, space10, space12, space13, space14);
	scene.add(space15, space16);

	/////////////////////////////////////////////arrow//////////////////////////////////////////////////
	var texture6 = loader.load('https://i.imgur.com/hu3ZIWY.png');

	texture6.minFilter = THREE.LinearMipMapLinearFilter;
	texture6.needsUpdate = true;
	var arrow1 = new THREE.Mesh(new THREE.PlaneGeometry(35, 60), new THREE.MeshBasicMaterial({
		map: texture6,
		alphaTest: 0.5,
		side: THREE.DoubleSide,
		polygonOffset: true,
		polygonOffsetFactor: -4,
		polygonOffsetUnits: -4}));
		arrow1.position.set(-150, 0, -20);
		arrow1.rotation.x = Math.PI/2;
		arrow1.rotation.z = -Math.PI/2;
		arrow1.rotation.y = Math.PI;


		var arrow2 = arrow1.clone();
		arrow2.position.set(60, 0, 230);
		arrow2.rotation.z =Math.PI;


	var texture7 = loader.load('https://i.imgur.com/f5UGMBz.png');

	texture7.minFilter = THREE.LinearMipMapLinearFilter;
	texture7.needsUpdate = true;
	var arrow3 = new THREE.Mesh(new THREE.PlaneGeometry(35, 60), new THREE.MeshBasicMaterial({
		map: texture7,
		alphaTest: 0.5,
		side: THREE.DoubleSide,
		polygonOffset: true,
		polygonOffsetFactor: -4,
		polygonOffsetUnits: -4}));
		arrow3.rotation.x = Math.PI/2;	
	arrow3.position.set(-170, 0, -330);
	arrow3.rotation.z = -Math.PI + 0.12;
	arrow3.rotation.y = Math.PI;

	var arrow4 = arrow3.clone();
	arrow4.position.set(-240, 0, 220);
	arrow4.rotation.y = 0;
	arrow4.rotation.x = -Math.PI/2;
	arrow4.rotation.z = Math.PI/2;
	scene.add(arrow1, arrow2, arrow3, arrow4);
	//scene.add(arrow11);
	
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

export {buildScenes, bushes, bushes1, bushes2, bushes3};