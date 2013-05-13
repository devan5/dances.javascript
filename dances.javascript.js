/*~~~~~~~~
with dances

	called: dom

	version: 2.0

	firstDate: 2013.05.06

	lastDate: 2013.05.13

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

(function(dances){
	"use strict";

	// dances.extend_merge_stab
	// TODO 单元测试
	dances && (function(exports){

		var
			fEat,
			fEatBridge,

			fMerge,
			fStab,
			fExtend,

			uc = function(fn){
				return function(){
					return Function.prototype.call.apply(fn, arguments);
				}
			},

			slice = uc(Array.prototype.slice),

			fToString = Object.prototype.toString
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

					oMerge || (oMerge = "[object Array]" === fToString.call(item) ? [] : {});

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
				dances[arguments[0]] = arguments[1];

			}else{
				args = slice(arguments, 0);
				args.push(fExtend);
			}

			return args ? fEatBridge.apply(exports, args) : exports;
		};

	})(dances);

	// dances.type
	// TODO 单元测试
	dances && (function(exports){
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

	})(dances);

	// dances.trim
	// TODO 单元测试
	dances && (function(exports){
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

	dances && window.define && define.amd && define.amd.dancesJs && define(function(){
		return dances;
	});

})(window.dances);