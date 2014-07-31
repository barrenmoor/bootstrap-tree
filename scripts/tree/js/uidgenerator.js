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
