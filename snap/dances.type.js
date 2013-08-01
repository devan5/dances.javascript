/**
 * @name dances.type
 */
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
        if(regElement.test(toString(El).slice(8, -1).toLowerCase())){
            return true;
        }
        return (isNode(El, bStrict)) ? 1 === El.nodeType : false;
    };

    isElements = function(Els, bStrict){
        if("object" !== typeof Els || !Els){
            return false;
        }

        switch(toString(Els).slice(8, -1).toLowerCase()){
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
        switch(toString.call(text).slice(8, -1).toLowerCase()){
            case "object":
                return ("object" === typeof text && isNode(text, bStrict)) ? 3 === text.nodeType : false;

            case "text":
                return true;

            default :
                return false;
        }
    };

    isArray = function(data){
        return toString(data) === "[object Array]";
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

                type = toString(data).slice(8, -1).toLowerCase();
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
