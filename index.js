var express = require('express');
var app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 8000;

/*
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
  console.log ('send index.html');
});
*/

app.use (express.static ('public'));
//app.use(express.static(__dirname + '/public'));

app.get('/ctrl', (req, res) => {
	res.sendFile(__dirname + '/controller0.html');
	console.log ('send controller0.html');
});

app.get('/scene', (req, res) => {
	res.sendFile(__dirname + '/main.html');
	console.log ('send main.html');
});

io.on('connection', (socket) => {
	socket.on('angle from ctrl', msg => {
		console.log ('from ctrl angle: ' + msg);
		socket.broadcast.emit ('angle sent', msg);  // to all others    
	});
	
	socket.on('value from ctrl', msg => {
		console.log ('from ctrl value: ' + msg);
		socket.broadcast.emit ('value sent', msg);  // to all others    
	});
	
	//from scece
	socket.on('angle from scece', msg => {
		console.log ('from scece angle: ' + msg);
		socket.broadcast.emit ('angle from scece', msg);  // to all others    
	});
});

http.listen(port, () => {
	console.log(`Socket.IO server running at http://localhost:${port}/`);
});
