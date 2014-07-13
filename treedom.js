var domParser = (function(){
	return {
		getHtml: function(node, level) {
			var id = node.id;
			var name = node.name;

			var html = "<div id='node_" + id + "' class='node-div'>";
			html += "<span id='node_span_" + id + "' style='padding-left:" + (5 + (level * 20)) + "px; white-space: nowrap;' class='node-text'>"

			var padding = node.container ? "5" : "16";
			var icon = node.container ? "images/folder.png" : "images/item.png";

			if(node.container) {
				//add open/close arrow mark for folders
				html += "<img id='img_" + node.id + "' src='images/closed-node.png'>";
			}

			//add icon - either folder or file. If file, padding includes the width of pointer.
			html += "<img style='padding-left: " + padding + "px;' src='" + icon + "'>";
			//add title of the node
			html += "<span id='node_name_span_" + id + "' style='padding-left: 5px;'>" + name + "</span>";

			//add menu toggle
			html += "<span id='menu_span_" + node.id + "' style='padding-left: 5px; display: none;'>";
			html += "<div id='menu_div_" + node.id + "' class='dropdown' style='display: inline-block;'>"
			html += "<div class='menu-caret-div' data-toggle='dropdown'><span class='caret'></span></div>";
			html += "<ul id='menu_ul_" + node.id + "' class='dropdown-menu' role='menu'></ul>"
			html += "</div></span>";

			html += "</span></div>"

			return html;
		}
	};
})();