define('Tree', 
	['UIDGenerator', 'NodeManager', 'DomManager', 'MouseHandler', 'HtmlGenerator', 'KeyboardHandler'], 
	function(UIDGenerator, NodeManager, DomManager, MouseHandler, HtmlGenerator, KeyboardHandler) {
	return function(treeId, options, data) {
		var treeSelector = "#" + treeId;
		data.renderedchildren = false;

		var nodeManager = new NodeManager(data);
		var htmlGenerator = new HtmlGenerator(options);
		var domManager = new DomManager(nodeManager, htmlGenerator, options, treeSelector);
		var mouseHandler = new MouseHandler(domManager, options, treeSelector);
		var keyboardHandler = new KeyboardHandler(nodeManager, domManager, mouseHandler, treeSelector);

		return {
			show : function() {
				$(treeSelector).addClass("tree-container");

				keyboardHandler.attachKBHandlers();
				domManager.expand(nodeManager.getRoot());
				mouseHandler.attachEventHandlers(nodeManager.getRoot().children);
			},
			add : function(node, parent) {
				parent.children.push(node);
				parent.children.sort(nodeManager.compare);

				var index = parent.children.indexOf(node);
				var size = parent.children.length;

				if(parent.renderedchildren) {
					var html = htmlGenerator.html(node);

					if(size === 1 || size === (index - 1)) {
						$(treeSelector + " #children_of_" + parent.id).append(html);
					} else if(index === 0) {
						$(treeSelector + " #node_" + parent.children[index + 1].id).before(html);
					} else {
						$(treeSelector + " #node_" + parent.children[index - 1].id).after(html);
					}

					mouseHandler.attachEventHandlers([node]);
				}
			},
			delete: function(node) {
				$(treeSelector + " #node_" + node.id).remove();
				nodeManager.remove(node);

				//TODO: should check if selected node was a descendant or node itself. if so, selected Node should be made null;
			}
		};
	};
});