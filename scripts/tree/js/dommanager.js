define ('DomManager', function() {
	return function(nodeManager, htmlGenerator, options, treeSelector){
		var selected = null;

		return {
			toggleSelection: function(node) {
				var select = function(n) {
					$(treeSelector + " #node_span_" + n.id).removeClass("node-text");
					$(treeSelector + " #node_span_" + n.id).addClass("selected-node");
					$(treeSelector + " #node_name_span_" + n.id).addClass("selected-node-text");
					$(treeSelector + " #menu_caret_div_" + n.id).addClass("selected-node-text");
					$(treeSelector + " #menu_span_" + n.id).show();

					selected = n;
				};
				var deselect = function(n) {
					if(n == null) {
						return;
					}

					$(treeSelector + " #node_span_" + n.id).removeClass("selected-node");
					$(treeSelector + " #node_name_span_" + n.id).removeClass("selected-node-text");
					$(treeSelector + " #menu_caret_div_" + n.id).removeClass("selected-node-text");
					$(treeSelector + " #node_span_" + n.id).removeClass("node-text");
					$(treeSelector + " #menu_span_" + n.id).hide();

					selected = null;
				};

				if(node === selected) {
					deselect(selected);
					
					$(treeSelector + " #node_span_" + node.id).addClass("node-text");
					$(treeSelector + " #menu_span_" + node.id).show();
				} else {
					deselect(selected);
					select(node);

					if($(treeSelector + " #node_span_" + node.id).isOnScreen() === false) {
						$('html, body').animate({
							scrollTop: $(treeSelector + " #node_span_" + node.id).offset().top
						}, 'fast');
					}					
				}
			},

			getSelected: function() {
				return selected;
			},

			getTreeSelector: function() {
				return treeSelector;
			},

			expand: function(node) {
				if(node.container === false) {
					return;
				}

				var renderedchildren = node.renderedchildren;
				node.renderedchildren = true;
				node.status = 'opened';

				if(renderedchildren) {
					$(treeSelector + " #img_" + node.id).removeClass("node-closed");
					$(treeSelector + " #img_" + node.id).addClass("node-opened");

					$(treeSelector + " #children_of_" + node.id).show();
				} else {
					node.children.sort(nodeManager.compare);

					var html = "";
					for(var i in node.children) {
						html += htmlGenerator.html(node.children[i]);
					}

					$(node.id === nodeManager.getRoot().id ? treeSelector : treeSelector + " #node_" + node.id).append("<ul id='children_of_" + node.id + "' class='node-ul'>" + html + "</ul>");
					if(node.id !== nodeManager.getRoot().id) {
						$(treeSelector + " #img_" + node.id).removeClass("node-closed");
						$(treeSelector + " #img_" + node.id).addClass("node-opened");
					}
				}
			},

			collapse: function(node) {
				node.status = 'closed';

				$(treeSelector + " #img_" + node.id).removeClass("node-opened");
				$(treeSelector + " #img_" + node.id).addClass("node-closed");

				$(treeSelector + " #children_of_" + node.id).hide();
			}
		};
	};
});
