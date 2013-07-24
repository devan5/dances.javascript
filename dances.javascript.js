/*~~~~~~~~
with dances

	called: dom

	version: 2.0

	firstDate: 2013.05.06

	lastDate: 2013.07.03

	require: [
		dances.amd
	],

	log: {
		"v2.0": [
			+ 实现五大 dances.core 之一 dances.javascript
			+ TODO 完善文档
		]
	}

~~~~~~~~*/

(function(exports, undefined){
	"use strict";

	var uc = function(fn){
		return function(){
			return Function.prototype.call.apply(fn, arguments);
		}
	};

	exports || (exports = (function(){
		function Foo(){ }
		Foo.prototype.root = "dances.javascript";
		window.dances = new Foo();
		return window.dances;
	})());

	// dances.extend dances.merge dances.stab
	// TODO review
	(function(exports){

		var
			fEat,
			fEatBridge,

			fMerge,
			fStab,
			fExtend,

			slice = uc(Array.prototype.slice),

			toString = uc(Object.prototype.toString)
		;

		fEat = function(oTarget, oOrigin, bDeep, bProto, bProtect){
			var
				prop,
				sType,
				item
				;

			for(prop in oOrigin){
				if(oOrigin.hasOwnProperty(prop) || bProto){
					if(bProtect && oTarget.hasOwnProperty(prop)){
						continue;
					}

					item = oOrigin[prop];

					sType = typeof item;

					if(bDeep &&
					   item &&
					   ("object" === sType || "function" === sType)

						){

						sType = typeof oTarget[prop];
						if(!oTarget[prop] || ("object" !== sType && "function" !== sType)){
							oTarget[prop] = {};
						}

						fEat(oTarget[prop], item, bDeep, bProto, bProtect);

						continue;
					}

					undefined !== item && (oTarget[prop] = item);
				}
			}

			oTarget = oOrigin = null;

			return oTarget;
		};

		fEatBridge = function(){
			var
				args = Array.prototype.slice.call(arguments, 0),
				command = args.pop(),

				bDeep = "boolean" === typeof args[0] ? args.shift() : false,
				bProto = "boolean" === typeof args[0] ? args.shift() : false,
				bProtect = "boolean" === typeof args[0] ? args.shift() : false
				;

			if(!args.length){
				return {};
			}

			return command(bDeep, bProto, bProtect, args);

		};

		fMerge = function(bDeep, bProto, bProtect, data){

			var
				oMerge,
				i,
				len,
				item,
				sType
				;

			for(i = 0, len = data.length; i < len; i++){
				item = data[i];
				sType = typeof item;

				if(item && ("object" === sType || "function" === sType)){

					oMerge || (oMerge = "[object Array]" === toString(item) ? [] : {});

					fEat(oMerge, item, bDeep, bProto, bProtect);
				}
			}

			return oMerge || {};

		};

		fStab = function(bDeep, bProto, bProtect, data){

			var
				oMan,
				i,
				len,
				item,
				type
				;

			for(i = 0, len = data.length; i < len; i++){
				item = data[i];
				type = typeof item;

				if(item && ("object" === type || "function" === type)){
					if(oMan){
						fEat(item, oMan, bDeep, bProto, bProtect);
						oMan = item;

					}else{

						if(i === len - 1){
							oMan = item;
							break;
						}

						oMan = {};
						i--;
					}
				}
			}

			return oMan || {};
		};

		fExtend = function(bDeep, bProto, bProtect, data){
			var
				oExtend,
				i,
				len,
				item,
				type
			;

			// dances.extend
			if("string" === typeof data[0] && "function" === typeof data[1]){
				exports[arguments[0]] = arguments[1];
				return exports;
			}

			for(i = 0, len = data.length; i < len; i++){
				item = data[i];
				type = typeof item;

				if(item && ("object" === type || "function" === type)){

					if(oExtend){
						fEat(oExtend, item, bDeep, bProto, bProtect);

					}else{

						if(i === len - 1){
							oExtend = item;
							break;
						}

						oExtend = item;
					}
				}

			}

			return oExtend || {};
		};

		exports.merge = function(){
			var
				args = slice(arguments, 0)
			;

			args.push(fMerge);
			return fEatBridge.apply(exports, args);
		};

		exports.stab = function(){
			var
				args = slice(arguments, 0)
			;

			args.push(fStab);
			return fEatBridge.apply(exports, args);
		};

		exports.extend = function(){
			var
				args
			;

			if("string" === typeof arguments[0] && "function" === typeof arguments[1]){
				exports[arguments[0]] = arguments[1];

			}else{
				args = slice(arguments, 0);
				args.push(fExtend);
			}

			return args ? fEatBridge.apply(exports, args) : exports;
		};

	})(exports);

	// dances.type
	// TODO unit-Test
	(function(exports){
		var
			type,

			isNode,
			isElement,
			regElement = /^html\w*element$/,
			isElements,
			isText,

			isArray,
			isArrLike
		;

		isNode = function(node, bStrict){
			var ownDOC;
			if("object" !== typeof node || node === null){
				return false;
			}

			if(!bStrict){
				// It's enough for Loose.
				return "number" === typeof node.nodeType && "string" === typeof node.nodeName;
			}
			try{
				ownDOC = node.ownerDocument || node;

				// gc
				return ownDOC.createElement("div").ownerDocument === ownDOC ? (ownDOC = null || true) : false;
			}catch(e){
				return  false;
			}
		};

		isElement = function(El, bStrict){
			if(regElement.test(Object.prototype.toString.call(El).slice(8, -1).toLowerCase())){
				return true;
			}
			return (isNode(El, bStrict)) ? 1 === El.nodeType : false;
		};

		isElements = function(Els, bStrict){
			if("object" !== typeof Els || !Els){
				return false;
			}

			switch(Object.prototype.toString.call(Els).slice(8, -1).toLowerCase()){
				case "object":
				case "nodelist":
					try{
						return "item" in Els && !Els.tagName && "length" in Els && isElement(Els[Math.floor(Math.random() * Els.length)], bStrict) ? true : false;
					}catch(e){
						return false;
					}
					break;

				case "htmlcollection":
					return true;

				default :
					return false;
			}
		};

		isText = function(text, bStrict){
			switch(Object.prototype.toString.call(text).slice(8, -1).toLowerCase()){
				case "object":
					return ("object" === typeof text && isNode(text, bStrict)) ? 3 === text.nodeType : false;

				case "text":
					return true;

				default :
					return false;
			}
		};

		isArray = function(data){
			return Object.prototype.toString.call(data) === "[object Array]";
		};

		isArrLike = function(arr){
			var l;
			return (arr && "object" === typeof  arr && isFinite(l = arr.length) && l >= 0 && l === Math.floor(l) && l < 4294967296 ) ? true : false;
		};

		type = function(data){
			var type,
				answer
				;

			type = typeof data;

			// 基本数据类型
			switch(type){
				case "string":
					answer = type;
					break;

				case "number":
					answer = type;
					break;

				case "boolean":
					answer = type;
					break;

				case "undefined":
					answer = type;
					break;

				case "function":
					answer = type;
					break;
			}

			if(!answer){

				if(!data){
					answer = "null";

				}else if(data !== data){
					answer = "nan";

				}else{

					type = Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
					answer = type;

					if(regElement.test(type)){
						answer = "element";

					}else{
						switch(type){
							case "array":
								break;

							case "regexp":
								break;

							case "math":
								break;

							case "date":
								break;

							// for moz ie9 chrome
							case "text":
								break;
							case "window":
								break;

							case "global":
								answer = "window";
								break;

							case "htmlcollection":
								answer = "elements";
								break;

							case "htmldocument":
								answer = "document";
								break;

							case "document":
								answer = "document";
								break;

							case "documentfragment":
								answer = "fragment";
								break;

							case "attr":
								answer = "attribute";
								break;

							default :
								// 检测 window
								if(data.top === top){
									answer = "window";

									// 可能的情况 DOM集合
								}else if(isElements(data, true)){
									answer = "elements";

								}else{

									// 可能的情况 元素节点 文本节点
									switch(data.nodeType){
										case 1:
											isElement(data, 1) && (answer = "element");
											break;

										case 2:
											isNode(data, 1) && ( answer = "attribute" );
											break;

										case 3:
											isText(data, 1) && (answer = "text");
											break;

										case 9:
											isNode(data, 1) && (answer = "document");
											break;

										case 11:
											isNode(data, 1) && (answer = "fragment");
											break;
									}
								}
						}
					}
				}
			}

			return answer;
		};

		type.isNode = isNode;
		type.isElement = isElement;
		type.isElements = isElements;
		type.isText = isText;
		type.isArray = isArray;
		type.isArrLike = isArrLike;

		exports.type = type;

	})(exports);

	// dances.trim
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
	})(exports);

	// dances.bind dances.bindBefore dances.bindAfter
	// TODO review
	// TODO unit-Test
	(function(exports){
		var
			bind,
			_before,
			_after,

			revertArr
		;

		revertArr = function(arr, n){
			n = ("number" === typeof n && n > -1) ? n : 0;
			return Array.prototype.slice.call(arr, n);
		};

		_before = function(scope){
			var boundAgs = revertArr(arguments),
				f
				;

			if("function" === typeof scope){
				f = boundAgs.shift();
				scope = null;

			}else{
				scope = boundAgs.shift();
				f = boundAgs.shift();
				if("function" !== typeof f){
					throw "bindLeft expect a function as call function";
				}

			}

			return function(){
				return f.apply(scope || this, boundAgs.concat(revertArr(arguments)));
			};
		};

		_after = function(scope){
			var boundAgs = revertArr(arguments),
				f
				;

			if("function" === typeof scope){
				f = boundAgs.shift();
				scope = null;

			}else{
				scope = boundAgs.shift();
				f = boundAgs.shift();
				if("function" !== typeof f){
					throw "bindRight expect a function as call function";
				}

			}

			return function(){
				return f.apply(scope || this, revertArr(arguments).concat(boundAgs));
			};
		};

		bind = function(scope){
			var boundAgs = revertArr(arguments),
				f
				;

			if("function" === typeof scope){
				f = boundAgs.shift();
				scope = null;

			}else{
				scope = boundAgs.shift();
				f = boundAgs.shift();
				if("function" !== typeof f){
					throw "bind expect a function as call function"
				}

			}

			return function(){
				var _boundAgs = boundAgs,

					ags = revertArr(arguments),
					num = _boundAgs.length,

					i = 0
					;

				for(; i < num; i++){
					undefined === _boundAgs[i] && (_boundAgs[i] = ags.shift());
				}

				ags.length > 0 && (_boundAgs = _boundAgs.concat(ags));

				return f.apply(scope || this, _boundAgs);
			};
		};

		exports.bind = bind;
		exports.bindBefore = _before;
		exports.bindAfter = _after;

	})(exports);

	// dances.json
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

	})(exports);

	window.define && define.amd && define.amd.dancesJs && define(function(){
		return exports;
	});

})(window.dances);