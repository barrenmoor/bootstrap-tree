self.addEventListener('message', function(e) {
	var obj = JSON.parse(e.data);
	var children = obj.json;
	var chunkSize = obj.chunkSize;

	var html = "";
	for(var i in children) {
		html += "<font face=\"verdana\" size=\"3\" color=\"#ff0000\">" + ((obj.index * chunkSize) + parseInt(i) + 1) + ". " + children[i].name + "</font><br>";
	}

	var message = JSON.stringify({
  		index: obj.index,
  		html: html
  	});

  	self.postMessage(message);
}, false);