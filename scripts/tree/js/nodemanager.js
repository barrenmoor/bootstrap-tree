define('NodeManager', [], function() {
	return function(root) {
		return {
			parent: function(node) {
				if(node.id === root.id) {
					return node;
				}

				var parent = null;
				var traverse = function(current) {
					if(!current.container) {
						return;
					}
					for(var i in current.children) {
						if(current.children[i].id === node.id) {
							parent = current;
							break;
						} else {
							traverse(current.children[i]);
						}
					}
				};

				traverse(root);
				return parent;
			},
			index: function(child) {
				var parent = this.parent(child);
				if(parent == null) {
					return -1;
				} else {
					return parent.children.indexOf(child);
				}
			},
			nextSibling: function(node) {
				var parent = this.parent(node);
				var myIndex = this.index(node);
				var nextSiblingIndex = myIndex + 1;

				if(parent.children.length === nextSiblingIndex) {
					return null;
				} else {
					return parent.children[nextSiblingIndex];
				}
			},
			prevSibling: function(node) {
				var parent = this.parent(node);
				var myIndex = this.index(node);
				var prevSiblingIndex = myIndex - 1;

				if(prevSiblingIndex < 0) {
					return null;
				} else {
					return parent.children[prevSiblingIndex];
				}				
			},
			lastChild: function(node) {
				var size = node.children.length;
				if(size === 0) {
					return null;
				} else {
					return node.children[size - 1];
				}
			},
			remove: function(node) {
				var parent = this.parent(node);
				if(parent == null) {
					return;
				}
				var index = this.index(node);
				parent.children.splice(index, 1);
			},
			compare: function(node1, node2) {
				if((node1.container && node2.container) || (!node1.container && !node2.container)) {
					return (node1.name.toUpperCase() > node2.name.toUpperCase()) ? 1 : -1;
				} else if(node1.container) {
					return -1;
				} else {
					return 1;
				}
			},
			getRoot: function() {
				return root;
			}
		};
	};
});
