define('MouseHandler', ['UIDGenerator'], function(UIDGenerator) {
	return function(domManager, options, treeSelector) {
		return {
			showHighlighting: function(node) {
				$(treeSelector + " #menu_span_" + node.id).show();
				if(domManager.getSelected() === null || domManager.getSelected().id !== node.id) {
					$(treeSelector + " #node_span_" + node.id).addClass("node-text");
				}
			},

			removeHighlighting: function(node) {
				var menuHidden = function() {
					if($(treeSelector + " #menu_ul_" + node.id).is(":visible")) {
						return;
					}

					if(domManager.getSelected() !== node) {
						$(treeSelector + " #menu_span_" + node.id).hide();
						$(treeSelector + " #node_span_" + node.id).removeClass("node-text");
					}
				};

				$(treeSelector + " #menu_div_" + node.id).on("hidden.bs.dropdown", menuHidden);
				$(treeSelector + " #node_span_" + node.id).on("mouseleave", menuHidden);
			},

			clickToToggleSelection: function(node) {
				$(treeSelector + " #node_name_span_" + node.id).on("click", function() {
					domManager.toggleSelection(node);
				});
			},

			createMenu: function(node) {
				if(node.menucreated) {
					return;
				}

				node.menucreated = true;
				var menu = node.container ? options.foldermenu : options.itemmenu;

				$.each(menu, function(index, value) {
					var menuId = UIDGenerator.nextId();
					var disabled = false;

					$(treeSelector + " #menu_ul_" + node.id).append(
						"<li id='" + menuId + "' role='presentation'>" +
							"<a class='menuitem menu-item'>" + menu[index].title + "</a>" +
						"</li>"
					);

					if(menu[index].when) {
						var when = menu[index].when;
						if($.inArray(node[when.attrib], when.values) < 0) {
							$(treeSelector + " #" + menuId).addClass("disabled");
							disabled = true;
						}
					}

					if(!disabled) {
						$(treeSelector + " #" + menuId).on("click", function() {
							menu[index].callback(node);
						});
					}
				});
			},

			attachEventHandlers: function(nodes) {
				var me = this;
				$.each(nodes, function(index, child) {
					if(child.eventHandlersAttached) {
						return;
					}

					child.status = 'closed';
					child.renderedchildren = false;
					child.eventHandlersAttached = true;

					if(child.container) {
						$(treeSelector + " #img_" + child.id).on("click", function() {
							(child.status === 'closed' ? domManager.expand : domManager.collapse)(child);
							me.attachEventHandlers(child.children);
						});
					}


					$(treeSelector + " #node_span_" + child.id).on("mouseenter", function() {
						me.showHighlighting(child);

						if(!child.menuattached) {
							child.menuattached = true;

							me.clickToToggleSelection(child);
							me.removeHighlighting(child);

							$(treeSelector + " #menu_div_" + child.id + " .menu-caret-div").on("click", function() {
								me.createMenu(child);
							});
						}
					});
				});
			}
		};
	};
});