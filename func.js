function parking(theta){
	//parkingMode 0 manual 1 auto parking 2 stop parking      PPart 0 turn right 1 change direction 2 turn left
    if(parkingMode == 1){            //auto parking
		if(PPart == 0){             //turn right
			car.speed -= 1;
			car.speed = Math.clamp (car.speed, -50, 50);
			theta -= 0.02;
			theta = Math.clamp (theta, -Math.PI/7, Math.PI/7);
			if(car.angle >= Math.PI /4 + parkingAngle){
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
			if(car.angle <= 0 + parkingAngle){
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
}

function cameraUpdate(theta){
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
		car.dashboard.visible = true;
		car.dashboard.position.copy(tmp);
		car.dashboard.position.y -= 2;
		car.dashboard.rotation.y = car.angle;
		car.dashboard.children[0].rotation.z = theta * -10;
    }
    else {
		camera.position.set(-200, 100, 0); // fixed camera, no orbitControl!
		camera.lookAt(new THREE.Vector3(0, 0, 0));
    }
}