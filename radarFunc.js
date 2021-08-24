setInterval (poll, 200);

function poll(){
	
	let min = [];
	for(let i = 0;i < obstacles.length;i++){
		let tmp = car.calculateCloseDistance(obstacles[i]);
		if(i == 0){
			min = tmp;
		} 
		else{
			min[0] = min[0].dis < tmp[0].dis ? min[0] : tmp[0];
			min[1] = min[1].dis < tmp[1].dis ? min[1] : tmp[1];
			min[2] = min[2].dis < tmp[2].dis ? min[2] : tmp[2];
			min[3] = min[3].dis < tmp[3].dis ? min[3] : tmp[3];
			min[4] = min[4].dis < tmp[4].dis ? min[4] : tmp[4];
		} 
	}
	
	min = min.sort(function (a, b) {
		return a.dis > b.dis ? 1 : -1;
	});
	
	car.minDis = min[0].dis;
	
	//dirAlert
	radarAlert(min);
	
	if(min[0].dis < 25){
		beeper = true;
		if (radarOn === false) 
			setTimeout(radarPlay,0);
	}
	else {
		beeper = false;
	}
	
}

function radarPlay(){
	
	radarSound.play();
	if (beeper) {
		setTimeout (radarPlay, car.minDis * 50);
		radarOn = true;
	} else {
		radarOn = false
	}
}

function radarAlert(min){
	car.dashboard.backAlert.visible = car.dashboard.backAlert2.visible = false;
	car.dashboard.backLeftAlert.visible = car.dashboard.backLeftAlert2.visible = false;
	car.dashboard.backRightAlert.visible = car.dashboard.backRightAlert2.visible = false;
	car.dashboard.frontRightAlert.visible = car.dashboard.frontRightAlert2.visible = false;
	car.dashboard.frontLeftAlert.visible = car.dashboard.frontLeftAlert2.visible = false;
	if(min[0].dis < 25){
		switch(min[0].dir){
			case 'xz':
				car.dashboard.frontRightAlert.visible = true;
				if(min[0].dis < 10){
					car.dashboard.frontRightAlert2.visible = true;
				}
				break;
			case 'x-z':
				car.dashboard.frontLeftAlert.visible = true;
				if(min[0].dis < 10){
					car.dashboard.frontLeftAlert2.visible = true;
				}
				break;
			case '-x-z':
				car.dashboard.backLeftAlert.visible = true;
				if(min[0].dis < 10){
					car.dashboard.backLeftAlert2.visible = true;
				}
				break;
			case '-xz':
				car.dashboard.backRightAlert.visible = true;
				if(min[0].dis < 10){
					car.dashboard.backRightAlert2.visible = true;
				}
				break;
			case 'back':
				car.dashboard.backAlert.visible = true;
				if(min[0].dis < 10){
					car.dashboard.backAlert2.visible = true;
				}
				break;
		}
	}
	if(min[1].dis < 25){
		switch(min[1].dir){
			case 'xz':
				car.dashboard.frontRightAlert.visible = true;
				if(min[1].dis < 10){
					car.dashboard.frontRightAlert2.visible = true;
				}
				break;
			case 'x-z':
				car.dashboard.frontLeftAlert.visible = true;
				if(min[1].dis < 10){
					car.dashboard.frontLeftAlert2.visible = true;
				}
				break;
			case '-x-z':
				car.dashboard.backLeftAlert.visible = true;
				if(min[1].dis < 10){
					car.dashboard.backLeftAlert2.visible = true;
				}
				break;
			case '-xz':
				car.dashboard.backRightAlert.visible = true;
				if(min[1].dis < 10){
					car.dashboard.backRightAlert2.visible = true;
				}
				break;
			case 'back':
				car.dashboard.backAlert.visible = true;
				if(min[1].dis < 10){
					car.dashboard.backAlert2.visible = true;
				}
				break;
		}
	}
	if(min[2].dis < 25){
		switch(min[2].dir){
			case 'xz':
				car.dashboard.frontRightAlert.visible = true;
				if(min[2].dis < 10){
					car.dashboard.frontRightAlert2.visible = true;
				}
				break;
			case 'x-z':
				car.dashboard.frontLeftAlert.visible = true;
				if(min[2].dis < 10){
					car.dashboard.frontLeftAlert2.visible = true;
				}
				break;
			case '-x-z':
				car.dashboard.backLeftAlert.visible = true;
				if(min[2].dis < 10){
					car.dashboard.backLeftAlert2.visible = true;
				}
				break;
			case '-xz':
				car.dashboard.backRightAlert.visible = true;
				if(min[2].dis < 10){
					car.dashboard.backRightAlert2.visible = true;
				}
				break;
			case 'back':
				car.dashboard.backAlert.visible = true;
				if(min[2].dis < 10){
					car.dashboard.backAlert2.visible = true;
				}
				break;
		}
	}
	if(min[3].dis < 25){
		switch(min[3].dir){
			case 'xz':
				car.dashboard.frontRightAlert.visible = true;
				if(min[3].dis < 10){
					car.dashboard.frontRightAlert2.visible = true;
				}
				break;
			case 'x-z':
				car.dashboard.frontLeftAlert.visible = true;
				if(min[3].dis < 10){
					car.dashboard.frontLeftAlert2.visible = true;
				}
				break;
			case '-x-z':
				car.dashboard.backLeftAlert.visible = true;
				if(min[3].dis < 10){
					car.dashboard.backLeftAlert2.visible = true;
				}
				break;
			case '-xz':
				car.dashboard.backRightAlert.visible = true;
				if(min[3].dis < 10){
					car.dashboard.backRightAlert2.visible = true;
				}
				break;
			case 'back':
				car.dashboard.backAlert.visible = true;
				if(min[3].dis < 10){
					car.dashboard.backAlert2.visible = true;
				}
				break;
		}
	}
	if(min[4].dis < 25){
		switch(min[4].dir){
			case 'xz':
				car.dashboard.frontRightAlert.visible = true;
				if(min[4].dis < 10){
					car.dashboard.frontRightAlert2.visible = true;
				}
				break;
			case 'x-z':
				car.dashboard.frontLeftAlert.visible = true;
				if(min[4].dis < 10){
					car.dashboard.frontLeftAlert2.visible = true;
				}
				break;
			case '-x-z':
				car.dashboard.backLeftAlert.visible = true;
				if(min[4].dis < 10){
					car.dashboard.backLeftAlert2.visible = true;
				}
				break;
			case '-xz':
				car.dashboard.backRightAlert.visible = true;
				if(min[4].dis < 10){
					car.dashboard.backRightAlert2.visible = true;
				}
				break;
			case 'back':
				car.dashboard.backAlert.visible = true;
				if(min[4].dis < 10){
					car.dashboard.backAlert2.visible = true;
				}
				break;
		}
	}
}