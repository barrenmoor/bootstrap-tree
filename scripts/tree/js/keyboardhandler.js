define('KeyboardHandler', [], function() {
	return function(nodeManager, domManager, mouseHandler, treeSelector) {
		return {
			rightArrowPressed: function() {
				if(domManager.getSelected().container === false || domManager.getSelected().status === 'opened') {
					return;
				} else {
					domManager.expand(domManager.getSelected());
					mouseHandler.attachEventHandlers(domManager.getSelected().children);
				}
			},

			leftArrowPressed: function() {
				if(domManager.getSelected().container === false || domManager.getSelected().status === 'closed') {
					var parent = nodeManager.parent(domManager.getSelected());
					if(parent !== null && parent.id !== nodeManager.getRoot().id) {
						domManager.toggleSelection(parent);
					}
				} else if(domManager.getSelected().status === 'opened') {
					domManager.collapse(domManager.getSelected());
				}
			},

			downArrowPressed: function() {
				if(domManager.getSelected().container === false || 
							domManager.getSelected().status === 'closed' || 
							(domManager.getSelected().status === 'opened' && domManager.getSelected().children.length === 0)) {
					var next = nodeManager.nextSibling(domManager.getSelected());
					var current = domManager.getSelected();

					while(next == null) {
						var parent = nodeManager.parent(current);
						current = parent;
						if(parent.id !== nodeManager.getRoot().id) {
							next = nodeManager.nextSibling(parent);
						} else {
							break;
						}
					}

					if(next != null) {
						domManager.toggleSelection(next);
					}
				} else if(domManager.getSelected().status === 'opened' && domManager.getSelected().children.length > 0) {
					domManager.toggleSelection(domManager.getSelected().children[0]);
				}
			},

			upArrowPressed: function() {
				var prev = nodeManager.prevSibling(domManager.getSelected());
				if(prev != null) {
					while(prev.container === true && prev.status === 'opened') {
						var lastChild = nodeManager.lastChild(prev);
						if(null != lastChild) {
							prev = lastChild;
						} else {
							break;
						}
					}
				} else {
					prev = nodeManager.parent(domManager.getSelected());
					if(prev.id === nodeManager.getRoot().id) {
						prev = null;
					}
				}

				if(prev != null) {
					domManager.toggleSelection(prev);
				}
			},

			attachKBHandlers: function() {
				var me = this;
				$(treeSelector).on("click", function() {
					$(treeSelector).focus();
				});

				$(treeSelector).on("keydown", function(event) {
					if(domManager.getSelected() == null || [37, 38, 39, 40].indexOf(event.which) < 0) {
						return;
					}

					event.preventDefault();
					switch(event.which) {
						case 39:
							me.rightArrowPressed();
							break;
						case 37:
							me.leftArrowPressed();
							break;
						case 40:
							me.downArrowPressed();
							break;
						case 38:
							me.upArrowPressed();
							break;
					}
				});
			}
		};
	};
});