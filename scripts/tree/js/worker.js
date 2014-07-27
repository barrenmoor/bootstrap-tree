self.addEventListener('message', function(e) {
	var obj = JSON.parse(e.data);
	var children = obj.json;
	var chunkSize = obj.chunkSize;

	importScripts("treedom.js");

	var html = "";
	for(var i in children) {
		html += domParser.getHtml(children[i]);
	}

	var message = JSON.stringify({
  		index: obj.index,
  		html: html
  	});

  	self.postMessage(message);
}, false);