function parking(theta){
	//parkingMode 0 manual 1 auto parking 2 stop parking      
	//PPart 0 turn right 1 change direction 2 turn left
    if(parkingMode == 1 && parkingModeButton == false){            //auto parking Mode 1
		if(PPart == 0){             //turn right
			car.speed -= 1;
			car.speed = Math.clamp (car.speed, -50, 50);
			theta -= 0.02;
			theta = Math.clamp (theta, -Math.PI/7, Math.PI/7);
			if(car.angle >= Math.PI /4 + parkingLocate[0]){
				PPart = 1;
			}
		}
		if(PPart == 1){             //change direction
			car.speed = 0;
			theta += 0.02;
			theta = Math.clamp (theta, -Math.PI/7, Math.PI/7);
			if(this.theta == Math.PI/7){
				PPart = 2;
			}
		}
		if(PPart == 2){             //turn left
			car.speed -= 1;
			car.speed = Math.clamp (car.speed, -50, 50);
			theta += 0.02;
			theta = Math.clamp (theta, -Math.PI/7, Math.PI/7);
			if(car.angle <= 0 + parkingLocate[0]){
				car.speed = 0;
			}
		}
    }else if(parkingMode == 1 && parkingModeButton == true){            //auto parking Mode 2
		if(PPart == 0){             //turn right
			car.speed -= 1;
			car.speed = Math.clamp (car.speed, -50, 50);
			theta -= 0.02;
			console.log(car.mesh.position, 0);////////////////////
			theta = Math.clamp (theta, -Math.PI/7, Math.PI/7);
			if(car.angle >= Math.PI /4 + parkingLocate[0]){
				PPart = 1;
			}
		}
		if(PPart == 1){             //change direction
			car.speed = 0;
			theta += 0.02;
			theta = Math.clamp (theta, -Math.PI/7, Math.PI/7);
			if(theta >= 0){
				PPart = 2;
			}
		}
		if(PPart == 2){             //go straight backward
			car.speed  -= 1;
			car.speed = Math.clamp (car.speed, -50, 50);
			if(car.mesh.position.z >= 45){
				console.log(car.mesh.position, 1);////////////////////
				car.speed = 0;
				PPart = 3;
			}
		}
		if(PPart == 3){             //change direction
			car.speed = 0;
			theta += 0.02;
			theta = Math.clamp (theta, -Math.PI/7, Math.PI/7);
			if(theta == Math.PI/7){
				PPart = 4;
			}
		}
		if(PPart == 4){             //turn left
			car.speed -= 1;
			car.speed = Math.clamp (car.speed, -50, 50);
			theta += 0.02;
			theta = Math.clamp (theta, -Math.PI/7, Math.PI/7);
			if(car.angle <= 0 + parkingLocate[0]){
				car.speed = 0;
				PPart = 5;
			}
		}
		if(PPart == 5){             //change direction
			car.speed = 0;
			theta -= 0.02;
			theta = Math.clamp (theta, -Math.PI/7, Math.PI/7);
			if(theta <= 0){
				PPart = 6;
			}
		}
		if(PPart == 6){             //go straight forward
			car.speed  += 1;
			car.speed = Math.clamp (car.speed, -50, 50);
			if(car.mesh.position.x >= 0){
				car.speed = 0;
			}
		}
    }else if(parkingMode === 2){     //stop parking
		car.speed = 0;
	}else {                          //manual
		PPart = 0;
	}
	
	return theta;
}

function moveCar(RC, omega, deltaT){
	
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
}

function cameraUpdate(theta, fSlowDown, bSlowDown){
	car.dashboard.visible = false;
    if (thirdPV) {
		let carEnd = car.mesh.localToWorld (new THREE.Vector3(-10,0,0));
		camera.lookAt (carEnd);
		camera.position.copy (car.mesh.localToWorld (new THREE.Vector3 (-50,30,0)));
    } 
    else if(firstPV){
		var tmp = car.mesh.localToWorld(new THREE.Vector3(1, 10, 0));
		camera.position.copy(tmp);
		tmp = car.mesh.localToWorld(new THREE.Vector3(6, 10, 0));
		camera.lookAt(tmp);
		
		//rear mirror
		let carEnd = car.mesh.localToWorld (new THREE.Vector3(-10, 0, 0));
		rearMirror.lookAt(carEnd);
		rearMirror.position.copy (car.mesh.localToWorld (new THREE.Vector3 (6,10,3)));
		if(this.speed < 0){
			let carEnd = car.mesh.localToWorld (new THREE.Vector3(-30, 0, 0));
			reversingCamera.lookAt(carEnd);
			reversingCamera.position.copy (car.mesh.localToWorld (new THREE.Vector3 (-10,0,0)));
			console.log(reversingCamera.position);
		}
		
		//dashboard
		car.dashboard.visible = true;
		car.dashboard.position.copy(tmp);
		car.dashboard.position.y -= 2;
		car.dashboard.rotation.y = car.angle;
		car.dashboard.children[0].rotation.z = theta * -10;
		
		if (keyboard.pressed('down') | keyboard.pressed('up')){
			car.dashboard.children[2].rotation.z = Math.PI/12;
			car.dashboard.children[2].position.y = -0.1;
		}
		if (keyboard.up("down") | keyboard.up("up")){
			car.dashboard.children[2].rotation.z = 0;
			car.dashboard.children[2].position.y = 0;
		}
		if(bSlowDown == 1 | fSlowDown == 1){
			car.dashboard.children[3].rotation.z = Math.PI/12;
			car.dashboard.children[3].position.y = -0.1;
		}
		else{
			car.dashboard.children[3].rotation.z = 0;
			car.dashboard.children[3].position.y = 0;
		}
    }
    else {
		camera.position.set(-200, 100, 0); // fixed camera, no orbitControl!
		camera.lookAt(new THREE.Vector3(0, 0, 0));
    }
}

function radarPlay(){
	
	radarSound.play();
	let min;
	for(let i = 0;i < obstacles.length;i++){
		let tmp = car.calculateCloseDistance(obstacles[i]);
		if(i == 0) min = tmp;
		else if(min > tmp) min = tmp;
	}
	//console.log(min);
	setTimeout(radarPlay, min * 500);
}
