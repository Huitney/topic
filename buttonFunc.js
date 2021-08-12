function onPointerDown (event) {
	//console.log ('in mouse down')
	event.preventDefault();  // may not be necessary
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

	// find intersections
	raycaster.setFromCamera(mouse, camera);
	var intersects = raycaster.intersectObjects(pickables, true);
	if (intersects.length > 0) {
		if(intersects[0].object.name == 'parkBT'){
			parkBTDown();
		}
		
		if(intersects[0].object.name == 'topViewBT'){
			topViewBTDown();
		}
		
		if(intersects[0].object.name == 'CCWBT'){
			CCWBTDown();
		}
		
		if(intersects[0].object.name == 'zoomInBT'){
			zoomInBTDown();
		}
		
		if(intersects[0].object.name == 'zoomOutBT'){
			zoomOutBTDown();
		}
		
		if(intersects[0].object.name == 'autoBT'){
			if(car.dashboard.autoBT.visible == true)
				autoBTDown();
			else if(car.dashboard.manuBT.visible == true)
				manuBTDown();
		}
		
		if(intersects[0].object.name == 'mode1BT'){
			if(car.dashboard.mode1BT.visible == true)
				mode1BTDown();
			else if(car.dashboard.mode2BT.visible == true)
				mode2BTDown();
		}
		
		if(intersects[0].object.name == 'radarOn'){
			if(car.dashboard.radarOn.visible == true)
				radarOnDown();
			else if(car.dashboard.radarOff.visible == true)
				radarOffDown();
		}
		
		if(intersects[0].object.name == 'accelerator'){
			acceleratorDown();
		}
		
		if(intersects[0].object.name == 'brakes'){
			brakesDown();
		}
		
		if(intersects[0].object.name == 'gear'){
			gearDown();
		}
				
	}
}	

function parkBTDown(){
	parkingMode = 1;
	parkingAngle = car.angle;
	car.dashboard.autoBT.visible = true;
	car.dashboard.manuBT.visible = false;
}

function topViewBTDown(){
	topView = !topView;
	if(topView){
		car.dashboard.CCWBT.visible = true;
		car.dashboard.zoomInBT.visible = true;
		car.dashboard.zoomOutBT.visible = true;
	}else{
		car.dashboard.CCWBT.visible = false;
		car.dashboard.zoomInBT.visible = false;
		car.dashboard.zoomOutBT.visible = false;
	}
}

function CCWBTDown(){
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

function zoomInBTDown(){
	topCamera.left += window.innerWidth/60;
	topCamera.right -= window.innerWidth/60;
	topCamera.top -= window.innerHeight/60;
	topCamera.bottom += window.innerHeight/60;
	topCamera.updateProjectionMatrix();
}

function zoomOutBTDown(){
	topCamera.left -= window.innerWidth/60;
	topCamera.right += window.innerWidth/60;
	topCamera.top += window.innerHeight/60;
	topCamera.bottom -= window.innerHeight/60;
	topCamera.updateProjectionMatrix();
}

function autoBTDown(){
	parkingMode = 0;
	car.dashboard.autoBT.visible = false;
	car.dashboard.manuBT.visible = true;
}

function manuBTDown(){
	parkingMode = 2;
	car.dashboard.autoBT.visible = true;
	car.dashboard.manuBT.visible = false;
}

function mode1BTDown(){
	parkingModeButton = true;
	car.move(new THREE.Vector3(-112.5, 13, 13.5));
	car.rotate(0);
	car.dashboard.mode1BT.visible = false;
	car.dashboard.mode2BT.visible = true;
}

function mode2BTDown(){
	parkingModeButton = false;
	car.move(new THREE.Vector3(-116, 13, 23.5));
	car.rotate(0);
	car.dashboard.mode1BT.visible = true;
	car.dashboard.mode2BT.visible = false;
}

function radarOnDown(){
	soundBT = true;
	radarSound.volume = 0;
	car.dashboard.radarOn.visible = false;
	car.dashboard.radarOff.visible = true;
}

function radarOffDown(){
	soundBT = false;
	radarSound.volume = 1;
	car.dashboard.radarOn.visible = true;
	car.dashboard.radarOff.visible = false;
}

function acceleratorDown(){
	car.dashboard.accelerator.position.x = 0.2;
	car.dashboard.accelerator.position.y = -0.1;
	if(car.dashboard.R.visible){
		car.speed -= 1;
	}else if(car.dashboard.D.visible){
		car.speed += 1;
	}
}

function brakesDown(){
	car.dashboard.brakes.position.x = 0.2;
	car.dashboard.brakes.position.y = -0.1;
}

function gearDown(){
	
}

function onPointerUp (event) {
	event.preventDefault();  // may not be necessary
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

	// find intersections
	raycaster.setFromCamera(mouse, camera);
	var intersects = raycaster.intersectObjects(pickables, true);
	if (intersects.length > 0) {
		if(intersects[0].object.name == 'accelerator'){
			acceleratorUp();
		}else if(intersects[0].object.name == 'brakes'){
			brakesUp();
		}
	}
}

function acceleratorUp(){
	car.dashboard.accelerator.position.x = 0;
	car.dashboard.accelerator.position.y = 0;
}

function brakesUp(){
	car.dashboard.brakes.position.x = 0;
	car.dashboard.brakes.position.y = 0;
	console.log(car.dashboard.brakes.position);
}