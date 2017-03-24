const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const pong = dgram.createSocket('udp4');

server.on('error', (err) => {
	console.log(`server error:\n${err.stack}`);
	server.close();
});

server.on('message', (msg, rinfo) => {
	;//console.log(`F:${rinfo.address}:${rinfo.port} : [${msg}]`);
	server.send(`U ${rinfo.address}:${rinfo.port}`,
		rinfo.port,
		rinfo.address,
		(e) => {
			if(e){
				console.log(`server error:\n${err.stack}`);
			}
		});
	pong.send(`pong`, rinfo.port, rinfo.address,
		(e) => {
			if(e){ console.log(`server error:\n${err.stack}`); }
		});
});

server.on('listening', () => {
	var address = server.address();
	console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(8088);
