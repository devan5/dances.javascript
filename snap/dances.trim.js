// TODO unit-Test
(function(exports){
	exports.trim = function(str){
		if(!str || "string" !== typeof str){
			return str;
		}

		return arguments[1] ?
			str.replace(/\s+/g, "")
			: str.replace(/^\s+|\s+$/g, "")
		;
	};

	exports.trimLeft = function(str){
		if(!str || "string" !== typeof str){
			return str;
		}

		return str.replace(/^\s+/, "");
	};

	exports.trimRight = function(str){
		if(!str || "string" !== typeof str){
			return str;
		}

		return str.replace(/\s+$/, "");
	};
})(dances);
