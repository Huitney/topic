function onMouseDown (event) {
	//console.log ('in mouse down')
	event.preventDefault();  // may not be necessary
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

	// find intersections
	raycaster.setFromCamera(mouse, camera);
	var intersects = raycaster.intersectObjects(pickables, true);
	if (intersects.length > 0) {
		if(intersects[0].object.name == 'parkBT'){
			parkBTClicked();
		}else if(intersects[0].object.name == 'CCWBT'){
			CCWBTClicked();
		}else if(intersects[0].object.name == 'zoomInBT'){
			zoomInBTClicked();
		}else if(intersects[0].object.name == 'zoomOutBT'){
			zoomOutBTClicked();
		}else if(intersects[0].object.name == 'autoBT'){
			if(car.dashboard.autoBT.visible == true)
				autoBTClicked();
			else if(car.dashboard.manuBT.visible == true)
				manuBTClicked();
		}else if(intersects[0].object.name == 'mode1BT'){
			if(car.dashboard.mode1BT.visible == true)
				mode1BTClicked();
			else if(car.dashboard.mode2BT.visible == true)
				mode2BTClicked();
		}else if(intersects[0].object.name == 'radarOn'){
			if(car.dashboard.radarOn.visible == true)
				radarOnClicked();
			else if(car.dashboard.radarOff.visible == true)
				radarOffClicked();
		}
	}
}	

function parkBTClicked(){
	parkingMode = 1;
	parkingAngle = car.angle;
	car.dashboard.autoBT.visible = true;
	car.dashboard.manuBT.visible = false;
}

function CCWBTClicked(){
	CCW++;
	if(CCW % 4 == 1){
		topCamera.up.set(0, 0, -1);
		topCamera.lookAt(car.center);
	}
	else if(CCW % 4 == 2){
		topCamera.up.set(-1, 0, 0);
		topCamera.lookAt(car.center);
	}
	else if(CCW % 4 == 3){
		topCamera.up.set(0, 0, 1);
		topCamera.lookAt(car.center);
	}
	else if(CCW % 4 == 0){
		topCamera.up.set(1, 0, 0);
		topCamera.lookAt(car.center);
	}
}

function zoomInBTClicked(){
	topCamera.left += window.innerWidth/60;
	topCamera.right -= window.innerWidth/60;
	topCamera.top -= window.innerHeight/60;
	topCamera.bottom += window.innerHeight/60;
	topCamera.updateProjectionMatrix();
}

function zoomOutBTClicked(){
	topCamera.left -= window.innerWidth/60;
	topCamera.right += window.innerWidth/60;
	topCamera.top += window.innerHeight/60;
	topCamera.bottom -= window.innerHeight/60;
	topCamera.updateProjectionMatrix();
}

function autoBTClicked(){
	parkingMode = 0;
	car.dashboard.autoBT.visible = false;
	car.dashboard.manuBT.visible = true;
}

function manuBTClicked(){
	parkingMode = 2;
	car.dashboard.autoBT.visible = true;
	car.dashboard.manuBT.visible = false;
}

function mode1BTClicked(){
	parkingModeButton = true;
	car.move(new THREE.Vector3(70, 13, 30));
	car.rotate(0);
	car.dashboard.mode1BT.visible = false;
	car.dashboard.mode2BT.visible = true;
}

function mode2BTClicked(){
	parkingModeButton = false;
	car.move(new THREE.Vector3(66.5, 13, 40));
	car.rotate(0);
	car.dashboard.mode1BT.visible = true;
	car.dashboard.mode2BT.visible = false;
}

function radarOnClicked(){
	soundBT = true;
	radarSound.volume = 0;
	car.dashboard.radarOn.visible = false;
	car.dashboard.radarOff.visible = true;
}

function radarOffClicked(){
	soundBT = false;
	radarSound.volume = 1;
	car.dashboard.radarOn.visible = true;
	car.dashboard.radarOff.visible = false;
}