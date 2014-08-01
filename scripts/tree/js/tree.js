define('UIDGenerator', [], function() {
	return (function() {
		return {
			nextId: function(len) {
				var maxLen = len || 10;
				var text = "";
				var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

				for(var i = 0; i < maxLen; i++) {
					text += possible.charAt(Math.floor(Math.random() * possible.length));
				}
				return text;
			}
		};
	})();
});

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

define('DomManager', function() {
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

define('HtmlGenerator', function() {
	return function(options) {
		return {
			html: function(node) {
				var id = node.id;
				var name = node.name;
				var menu = node.container ? options.foldermenu : options.itemmenu;

				html = "<li id='node_" + id + "' class='node-li'>" +
					"<div id='node_div_" + id + "' class='node-div'>" +
						"<span id='node_span_" + id + "' class='node-hover'>" +
							"<span id='img_" + id + "' class='node-icon " + (node.container ? "node-closed" : "node-non-expandable") + "'>&nbsp;</span>" +
							"<span class='node-icon " + (node.container ? "node-folder" : "node-item") + "'></span>" +
							"<span id='node_name_span_" + id + "' class='node-name'>" + name + "</span>";
							//attach context menu
							if(menu) {
								html += "<span id='menu_span_" + id + "' style='display:none;'>" +
											"<div id='menu_div_" + id + "' class='dropdown' style='display:inline-block;'>" +
												"<div id='menu_caret_div_" + id + "' data-toggle='dropdown' class='menu-caret-div'><span class='caret'></span></div>" +
												"<ul id='menu_ul_" + id + "' class='dropdown-menu' role='menu'></ul>" +
											"</div>" + //menu_div
										"</span>"; //menu_span
							}

					html += "</span>" + //node_span
					"</div>" + //node_div
				"</li>"; //node_

				return html;
			}			
		};
	};
});

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