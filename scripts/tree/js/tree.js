var Tree = function(treeId, options, data) {
	var treeSelector = "#" + treeId;
	var root = data;
	var selectedNode = null;

	root.level = -1;
	root.renderedchildren = false;

	var makeId = function() {
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for(var i = 0; i < 5; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}

		return text;
	};

	var compareNodes = function(a, b) {
		if((a.container && b.container) || (!a.container && !b.container)) {
			return a.name.toUpperCase() > b.name.toUpperCase();
		} else if(a.container) {
			return -1;
		} else if(b.container) {
			return 1;
		} else {
			return 0;
		}
	}

	var selectNode = function(node) {
		if(node == selectedNode) {
			selectedNode = null;

			$(treeSelector + " #node_span_" + node.id).removeClass("selected-node");
			$(treeSelector + " #node_name_span_" + node.id).removeClass("selected-node-text");
			$(treeSelector + " #menu_caret_div_" + node.id).removeClass("selected-node-text");
			$(treeSelector + " #node_span_" + node.id).addClass("node-text");
		} else {
			if(selectedNode != null) {
				$(treeSelector + " #node_span_" + selectedNode.id).removeClass("selected-node");
				$(treeSelector + " #node_name_span_" + selectedNode.id).removeClass("selected-node-text");
				$(treeSelector + " #menu_caret_div_" + selectedNode.id).removeClass("selected-node-text");
				$(treeSelector + " #node_span_" + selectedNode.id).removeClass("node-text");
				$(treeSelector + " #menu_span_" + selectedNode.id).hide();
			}

			selectedNode = node;

			$(treeSelector + " #node_span_" + node.id).removeClass("node-text");
			$(treeSelector + " #node_span_" + node.id).addClass("selected-node");
			$(treeSelector + " #node_name_span_" + node.id).addClass("selected-node-text");
			$(treeSelector + " #menu_caret_div_" + node.id).addClass("selected-node-text");
			$(treeSelector + " #menu_span_" + node.id).show();
		}
	};

	var attachHandlers = function(nodes, level) {
		$.each(nodes, function(index, child) {
			child.level = level;
			child.status = 'closed';
			child.renderedchildren = false;
			child.menuattached = false;

			if(child.container) {
				$(treeSelector + " #img_" + child.id).on("click", function() {
					if(child.status == 'closed') {
						expand(child);
					} else {
						collapse(child);
					}
				});
			}

			var menuHidden = function() {
				if($(treeSelector + " #menu_ul_" + child.id).is(":visible")) {
					return;
				}

				if(selectedNode != child) {
					$(treeSelector + " #menu_span_" + child.id).hide();
					$(treeSelector + " #node_span_" + child.id).removeClass("node-text");
				}
			};

			$(treeSelector + " #node_span_" + child.id).on("mouseenter", function() {
				$(treeSelector + " #menu_span_" + child.id).show();
				$(treeSelector + " #node_span_" + child.id).addClass("node-text");

				if(!child.menuattached) {
					child.menuattached = true;

					$(treeSelector + " #node_name_span_" + child.id).on("click", function() {
						selectNode(child);
					});

					$(treeSelector + " #menu_div_" + child.id).on("hidden.bs.dropdown", menuHidden);

					$(treeSelector + " #menu_div_" + child.id + " .menu-caret-div").on("click", function() {
						if(child.menucreated) {
							return;
						}

						child.menucreated = true;
						var menu = child.container ? options.foldermenu : options.itemmenu;

						$.each(menu, function(index, value) {
							var menuId = makeId();
							var disabled = false;

							$(treeSelector + " #menu_ul_" + child.id).append("<li id='" + menuId + "' role='presentation'><a class='menuitem menu-item'>" + menu[index].title + "</a></li>");

							if(menu[index].when) {
								var when = menu[index].when;
								if($.inArray(child[when.attrib], when.values) < 0) {
									$(treeSelector + " #" + menuId).addClass("disabled");
									disabled = true;
								}
							}

							if(!disabled) {
								$(treeSelector + " #" + menuId).on("click", function() {
									menu[index].callback(child);
								});
							}
						});
					});
				}
			});

			$(treeSelector + " #node_span_" + child.id).on("mouseleave", menuHidden);
		});
	};

	var append = function(parent, children, callback) {
		getHtml(children, parent.level + 1, function(html) {
			callback(html);
			attachHandlers(children, parent.level + 1);
		});
	};

	var expand = function(node) {
		var renderedchildren = node.renderedchildren;
		node.renderedchildren = true;
		node.status = 'opened';

		if(renderedchildren) {
			$(treeSelector + " #img_" + node.id).attr("src", "scripts/tree/images/opened-node.png");
			for(var i in node.children) {
				$(treeSelector + " #node_" + node.children[i].id).show();
			}
		} else {
			node.children.sort(compareNodes);
			append(node, node.children, function(html) {
				$(node.level == -1 ? treeSelector : treeSelector + " #node_" + node.id).append(html);
				if(node.level > -1) {
					$(treeSelector + " #img_" + node.id).attr("src", "scripts/tree/images/opened-node.png");
				}
			});
		}
	};

	var collapse = function(node) {
		node.status = 'closed';
		$(treeSelector + " #img_" + node.id).attr("src", "scripts/tree/images/closed-node.png");

		for(var i in node.children) {
			$(treeSelector + " #node_" + node.children[i].id).hide();
		}
	};

	var getHtml = function(nodes, level, callback) {
		var getNumWorkers = function(size) {
			var maxWorkers = 10;
			if(size <= 100) {
				return 1;
			} else if(size <= 500) {
				return 5;
			} else {
				return 10;
			}
		};

		var numWorkers = getNumWorkers(nodes.length);
		var workerSize = parseInt(Math.ceil(nodes.length / numWorkers));
		var workers = [];
		var responses = [];
		var messages = [];
		var countDownLatch = numWorkers;

		for(var i = 0; i < numWorkers; i++) {
			messages.push({
				index: i,
				level: level,
				chunkSize: workerSize,
				json: []
			});

			for(var j = 0; j < workerSize; j++) {
				var index = j + (i * workerSize);
				if(index == nodes.length) {
					break;
				}
				messages[i].json.push(nodes[index]);
			}
		}

		for(var i = 0; i < numWorkers; i++) {
			workers.push(new Worker("scripts/tree/js/worker.js"));
			responses.push({});

			workers[i].addEventListener("message", function(e) {
				var obj = JSON.parse(e.data);
				responses[obj.index] = obj.html;

				if(--countDownLatch == 0) {
					var html = "";
					for(var j in responses) {
						html += responses[j];
					}
					callback(html);
				}
			}, false);

			workers[i].postMessage(JSON.stringify(messages[i]));
		}
	};

	var removeFromParent = function(node) {
		var parent = null;
		var index = -1;

		var walk = function(current) {
			if(!current.container) {
				return;
			}
			for(var i in current.children) {
				if(current.children[i].id == node.id) {
					parent = current;
					index = i;
					return;
				}
				walk(current.children[i]);
			}
		};

		walk(root);

		if(parent != null && index != -1) {
			parent.children.splice(index, 1);
		}
	}

	return {
		show : function() {
			expand(root);
		},
		add : function(node, parent) {
			parent.children.push(node);
			parent.children.sort(compareNodes);

			var index = parent.children.indexOf(node);
			var size = parent.children.length;

			if(parent.renderedchildren) {
				append(parent, [node], function(html) {
					if(size == 1 || size == (index - 1)) {
						$(treeSelector + " #node_" + parent.id).append(html);
					} else if(index == 0) {
						$(treeSelector + " #node_" + parent.children[index + 1].id).before(html);
					} else {
						$(treeSelector + " #node_" + parent.children[index - 1].id).after(html);
					}

					if(parent.status == 'closed') {
						$(treeSelector + " #node_" + node.id).hide();
					}
				});
			}
		},
		rename : function(newName, node) {
			$(treeSelector + " #node_name_span_" + node.id).text(newName);
			node.name = newName;
		},
		delete: function(node) {
			$(treeSelector + " #node_" + node.id).remove();
			removeFromParent(node);
		}
	};
};
