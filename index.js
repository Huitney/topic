var express = require('express');
var app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 8800;


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

/*
app.get('https://github.com/Huitney/topic/tree/master/models/', function (req, res) {
	res.set('Access-Control-Allow-Origin', 'http://localhost:${port}');
	res.end('hello world');
});
*/

io.on('connection', (socket) => {
	socket.on('angle from ctrl', msg => {
		console.log ('from ctrl angle: ' + msg);
		socket.broadcast.emit ('angle sent', msg);  // to all others    
	});
	
	socket.on('value from ctrl', msg => {
		console.log ('from ctrl value: ' + msg);
		socket.broadcast.emit ('value sent', msg);  // to all others    
	});
	
	socket.on('gear from ctrl', msg => {
		console.log ('from ctrl angle: ' + msg);
		socket.broadcast.emit ('gear sent', msg);  // to all others    
	});
	
	socket.on('picked wheel from ctrl', msg => {
		console.log ('picked: ' + msg);
		socket.broadcast.emit ('picked wheel sent', msg);  // to all others    
	});
	
	socket.on('picked gas from ctrl', msg => {
		console.log ('picked: ' + msg);
		socket.broadcast.emit ('picked gas sent', msg);  // to all others    
	});
	
	socket.on('picked brake from ctrl', msg => {
		console.log ('picked: ' + msg);
		socket.broadcast.emit ('picked brake sent', msg);  // to all others    
	});
});

http.listen(port, () => {
	console.log(`Socket.IO server running at http://localhost:${port}/`);
});