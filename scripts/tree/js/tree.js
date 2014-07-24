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

			if($(treeSelector + " #node_span_" + node.id).isOnScreen() == false) {
				$('html, body').animate({
					scrollTop: $(treeSelector + " #node_span_" + node.id).offset().top
				}, 'fast');
			}

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
		if(node.container == false) {
			return;
		}

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

	var attachKBHandlers = function() {
		$(treeSelector).on("click", function() {
			$(treeSelector).focus();
		});

		var rightArrowPressed = function() {
			if(selectedNode.container == false || selectedNode.status == 'opened') {
				return;
			} else {
				expand(selectedNode);
			}
		};

		var leftArrowPressed = function() {
			if(selectedNode.container == false || selectedNode.status == 'closed') {
				var parent = getParent(selectedNode);
				if(parent != null && parent.id != root.id) {
					selectNode(parent);
				}
			} else if(selectedNode.status == 'opened') {
				collapse(selectedNode);
			}
		};

		var downArrowPressed = function() {
			if(selectedNode.container == false || 
						selectedNode.status == 'closed' || 
						(selectedNode.status == 'opened' && selectedNode.children.length == 0)) {
				var next = getNextSibling(selectedNode);
				var current = selectedNode;

				while(next == null) {
					var parent = getParent(current);
					current = parent;
					if(parent.id != root.id) {
						next = getNextSibling(parent);
					} else {
						break;
					}
				}

				if(next != null) {
					selectNode(next);
				}
			} else if(selectedNode.status == 'opened' && selectedNode.children.length > 0) {
				selectNode(selectedNode.children[0]);
			}
		};

		var upArrowPressed = function() {
			var prev = getPrevSibling(selectedNode);
			if(prev != null) {
				while(prev.container == true && prev.status == 'opened') {
					var lastChild = getLastChild(prev);
					if(null != lastChild) {
						prev = lastChild;
					} else {
						break;
					}
				}
			} else if(prev == null) {
				prev = getParent(selectedNode);
				if(prev.id == root.id) {
					prev = null;
				}
			}

			if(prev != null) {
				selectNode(prev);
			}
		};

		$(treeSelector).on("keydown", function(event) {
			if(selectedNode == null || $.inArray(event.which, [37, 38, 39, 40]) < 0) {
				return;
			}

			event.preventDefault();
			switch(event.which) {
				case 39:
					rightArrowPressed();
					break;
				case 37:
					leftArrowPressed();
					break;
				case 40:
					downArrowPressed();
					break;
				case 38:
					upArrowPressed();
					break;
				default:
					break;
			}
		});
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

	var getParent = function(node) {
		if(node.id == root.id) {
			return node;
		}

		var parent = null;
		var walk = function(current) {
			if(!current.container) {
				return;
			}
			for(var i in current.children) {
				if(current.children[i].id == node.id) {
					parent = current;
					break;
				} else {
					walk(current.children[i]);
				}
			}
		};

		walk(root);
		return parent;
	};

	var getChildIndex = function(parent, child) {
		for(var i in parent.children) {
			if(parent.children[i].id == child.id) {
				return parseInt(i);
			}
		}

		return -1;
	};

	var getNextSibling = function(node) {
		var parent = getParent(node);
		var myIndex = getChildIndex(parent, node);
		var nextSiblingIndex = myIndex + 1;

		if(parent.children.length == nextSiblingIndex) {
			return null;
		} else {
			return parent.children[nextSiblingIndex];
		}
	};

	var getPrevSibling = function(node) {
		var parent = getParent(node);
		var myIndex = getChildIndex(parent, node);
		var prevSiblingIndex = myIndex - 1;

		if(prevSiblingIndex < 0) {
			return null;
		} else {
			return parent.children[prevSiblingIndex];
		}
	}

	var getLastChild = function(node) {
		var size = node.children.length;
		if(size == 0) {
			return null;
		} else {
			return node.children[size - 1];
		}
	}

	var removeFromParent = function(node) {
		var parent = getParent(node);
		var index = getChildIndex(parent, node);

		if(parent != null && index != -1) {
			parent.children.splice(index, 1);
		}
	}

	var registerIsOnScreen = function() {
		$.fn.isOnScreen = function(){
		    var win = $(window);
		    var viewport = {
		        top : win.scrollTop(),
		        left : win.scrollLeft()
		    };

		    viewport.right = viewport.left + win.width();
		    viewport.bottom = viewport.top + win.height();
		    
		    var bounds = this.offset();
		    bounds.right = bounds.left + this.outerWidth();
		    bounds.bottom = bounds.top + this.outerHeight();
		    
		    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));		    
		};
	};

	return {
		show : function() {
			registerIsOnScreen();
			attachKBHandlers();
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
			//TODO: placement of the node may change after renaming. (because of sorting)
			//TODO: this needs to be taken care of.
			$(treeSelector + " #node_name_span_" + node.id).text(newName);
			node.name = newName;
		},
		delete: function(node) {
			$(treeSelector + " #node_" + node.id).remove();
			removeFromParent(node);
		}
	};
};
