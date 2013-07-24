// TODO review
// TODO unit-Test
(function(exports){
	var
		json,

		router,
		isLegalJSON,
		A2J,
		O2J,

		isArr
		;

	isLegalJSON = function(data){
		return /^[\],:{}\s]*$/.test(data.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""));
	};

	A2J = function(data, bLost){
		var arr = [],
			i = 0,
			num = data.length,
			item
			;

		for(; i < num; i++){
			arr.push(router(data[i], bLost));
		}

		// null/undefined 转换为"null"
		for(i = 0; i < num; i++){
			item = arr[i];
			if(null === item || undefined === item){
				arr[i] = "null";
			}
		}

		// gc
		item = null;
		arr = "[" + arr.join(",") + "]";
		return arr;
	};

	O2J = function(data, bLost){
		var arr = [],
			prop,
			item
			;
		for(prop in data){
			if(data.hasOwnProperty(prop) || bLost){

				// 值为 undefined 则 continue
				item = data[prop];
				if(undefined === item){
					continue;
				}
				arr.push('"' + prop + '"' + ':' + router(data[prop], bLost));
			}
		}

		arr = "{" + arr.join(",") + "}";
		return arr;
	};

	router = function(data, bLost){
		var result;
		switch(typeof data){

			// 只针对 数组有用.
			case "undefined":
				result = null;
				break;

			case "string":
				result = '"' + data + '"';
				break;

			case "object":
				result = data ?
					isArr(data) ?
						A2J(data, bLost)
						: O2J(data, bLost)
					: null
				;
				break;

			case "function":
				result = O2J(data, bLost);
				break;

			default:
				result = data;
		}
		return result;
	};

	json = function(data, bLost){
		if(!data){
			return data;
		}
		var type = typeof data ,
			result
			;

		isArr = isArr || exports.type.isArrLike;

		type = ("string" === type) ?
			1 :
			("object" === type || "function" === type) ?
				2 :
				0
		;

		// 0: 阻止
		// 1: 子串data
		// 2: 对象data
		switch(type){
			case 0:
				result = data;
				break;

			// parseJSON || JSON.parse()
			case 1:
				if(!isLegalJSON(data)){
					throw "非法 JSON";
				}
				try{
					result = JSON.parse(data);
				}catch(e){
					try{
						result = eval((new Function("", "return" + "  " + data))());
					}catch(e){
						result = data;
						throw "解析 JSON对象 失败";
					}
				}
				break;

			// revertJSON || JSON.stringify()
			case 2:
				try{
					result = JSON.stringify(data);
				}catch(e){
					try{
						result = isArr(data) ? A2J(data, bLost) : O2J(data, bLost);
					}catch(e){
						throw "字符串化 JSON对象 失败";
					}
				}
				break;
		}

		return result;
	};

	exports.json = json;

})(dances);
