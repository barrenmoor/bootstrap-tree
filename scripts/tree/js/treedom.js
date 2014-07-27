var domParser = (function(){
	return {
		getHtml: function(node) {
			var id = node.id;
			var name = node.name;

			html = "<li id='node_" + id + "' class='node-li'>" +
				"<div id='node_div_" + id + "' class='node-div'>" +
					"<span id='node_span_" + id + "' class='node-hover'>" +
						"<span id='img_" + id + "' class='node-icon " + (node.container ? "node-closed" : "node-non-expandable") + "'>&nbsp;</span>" +
						"<span class='node-icon " + (node.container ? "node-folder" : "node-item") + "'></span>" +
						"<span id='node_name_span_" + id + "' class='node-name'>" + name + "</span>" +
						//attach context menu
						"<span id='menu_span_" + id + "' style='display:none;'>" +
							"<div id='menu_div_" + id + "' class='dropdown' style='display:inline-block;'>" +
								"<div id='menu_caret_div_" + id + "' data-toggle='dropdown' class='menu-caret-div'><span class='caret'></span></div>" +
								"<ul id='menu_ul_" + id + "' class='dropdown-menu' role='menu'></ul>" +
							"</div>" + //menu_div
						"</span>" + //menu_span
				"</span>" + //node_span
				"</div>" + //node_div
			"</li>"; //node_

			return html;
		}
	};
})();