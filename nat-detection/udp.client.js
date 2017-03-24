const os = require('os');
const dgram = require('dgram');
const message = Buffer.from('ping');
const client = dgram.createSocket('udp4');

var nw = os.networkInterfaces(), nts = [];
for(var i in nw){
	for(var k in nw[i]){
		var ad = nw[i][k].address;
		if(ad) nts.push(ad);
	}
}

// 需要配置服务器端
var hosts = ['a.test.com', 'a.test.com'], port = 8088;
var trys = 5, count = 0, nats = {};
var natType = [0,0,0,0];

client.on('message', (msg, rinfo) => {
	var str = msg.toString('ascii');
	nats[str] = str;
	for(var i in nts){
		if(str.search(" " + nts[i] + ":") >= 0){
			console.log(`U net is !!!! NOT NAT !!!`);
			natType = [];
			break;
		}
	}
	if(natType && natType.length == 0){
		return;
	}
	if(str.search("pong") >= 0){
		//console.log(`U net is !!Restricted Cone NAT!!`);
		natType[1] = 1;
	}
	if(str == "ME"){
		natType[0] = 1;
		//console.log(`U net is !!Port Restricted Cone NAT!!`);
	}
	if(str.search("U ") == 0){
		var hp = str.substring(2).split(":");
		client.send("ME", hp[1], hp[0], (e) => {
			if(e){ console.log(`server error:\n${e.stack}`); }
		});
	}
	if(hosts.length > 1){
		if(count <= trys){
			var j = 0;
			for(var i in nats){
				j++;
			}
			if(j == 1){
				natType[2] = 1;
			}else{
				natType[3] = 1;
			}
		}
	}
	console.log(`F ${rinfo.address}:${rinfo.port} : [${msg}]`);
});

var sender = function() {
	if(count <= trys){
		setTimeout(sender, 2000);
	}else{
		if(natType.length == 4){
			if(natType[0]){
				console.log(`U net is !!Full Cone NAT          !! A___`);
			}else if(natType[1]) {
				console.log(`U net is !!Restricted Cone NAT    !! AA__`);
			}else if(natType[2]) {
				console.log(`U net is !!Port Restricted Cone NA!! AAA`);
			}else if(natType[3]) {
				console.log(`U net is !!Symmetric NAT          !! AAAA`);
			}else{
				console.log(`U net is Symmetric NAT or Port Restricted Cone NA !! AAA?`);
			}
		}
		client.close();
		return;
	}
	count++;
	for(var i in hosts){
		client.send(message, 8088, hosts[i], (e) => {
			if(e){ console.log(`server error:\n${e.stack}`); }
		});
	}
	console.log(`Send ping @` + new Date().getTime());
};
sender();

